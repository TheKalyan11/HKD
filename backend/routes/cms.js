const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { db } = require('../services/firebase');
const { sendInquiryConfirmation } = require('../services/email');
const cache = require('../services/cache');
const { authLimiter } = require('../middleware/security');

const JWT_SECRET = process.env.JWT_SECRET || 'hkd_premium_jwt_secret_108';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + JWT_SECRET).digest('hex');
}

function authenticateCms(roles = ['admin', 'staff']) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Insufficient permissions for this operation.' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired administration token.' });
    }
  };
}

/**
 * POST /api/cms/auth/login
 */
router.post('/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@hkd.org';
  const defaultAdminPass = process.env.ADMIN_PASSWORD || 'Krishna108';
  const defaultStaffEmail = process.env.STAFF_EMAIL || 'staff@hkd.org';
  const defaultStaffPass = process.env.STAFF_PASSWORD || 'Staff108';

  let role = null;
  let name = '';

  if (email === defaultAdminEmail && password === defaultAdminPass) {
    role = 'admin';
    name = 'Acharya Admin';
  } else if (email === defaultStaffEmail && password === defaultStaffPass) {
    role = 'staff';
    name = 'Sevadar Staff';
  }

  if (!role) {
    return res.status(401).json({ error: 'Invalid email address or password.' });
  }

  const token = jwt.sign(
    { email, role, name, uid: `${role}_${crypto.randomBytes(8).toString('hex')}` },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: { email, role, name },
  });
});

/**
 * GET /api/cms/pages/:pageId
 */
router.get('/pages/:pageId', async (req, res) => {
  const targetId = req.params.pageId;

  if (!/^[a-zA-Z0-9_-]+$/.test(targetId)) {
    return res.status(400).json({ error: 'Invalid page identifier.' });
  }

  try {
    const cacheKey = `page:${targetId}`;
    const cached = await cache.get(cacheKey);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const docRef = db.collection('pages_content').doc(targetId);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      await cache.set(cacheKey, data, 300);
      res.setHeader('X-Cache', 'MISS');
      return res.json(data);
    }

    let defaultContent = {};

    if (targetId === 'home') {
      defaultContent = {
        hero: {
          title: 'Preserve Vedic Culture, Protect Holy Cows',
          subtitle: 'Join us in offering Gau Seva and Annadana Prasadam in the sacred land of Sri Radha Krishna Dham.',
          bannerUrl: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=1600',
          ctaText: 'Offer Seva Now',
        },
        about: {
          title: 'Our Mission of Compassion',
          content: 'We are dedicated to establishing high standards of cow care (Gau Seva), organizing daily food distribution (Annadana Seva), and promoting classical spiritual education across the region.',
        },
        bannerText: 'Upcoming Auspicious Ekadashi and Child Annadana Seva Festivals. Participate Online!',
      };
    } else {
      defaultContent = {
        title: `Visual Content Section for ${targetId}`,
        subtitle: 'Edit this page content in-browser using our built-in CMS.',
        updatedAt: new Date(),
      };
    }

    await docRef.set(defaultContent);
    await cache.set(cacheKey, defaultContent, 300);
    res.json(defaultContent);
  } catch (error) {
    console.error('Error fetching CMS page content:', error);
    res.status(500).json({ error: 'Failed to retrieve page sections.' });
  }
});

/**
 * PUT /api/cms/pages/:pageId
 */
router.put('/pages/:pageId', authenticateCms(['admin', 'staff']), async (req, res) => {
  const { pageId } = req.params;

  if (!/^[a-zA-Z0-9_-]+$/.test(pageId)) {
    return res.status(400).json({ error: 'Invalid page identifier.' });
  }

  const newContent = req.body;

  try {
    const docRef = db.collection('pages_content').doc(pageId);
    await docRef.set({
      ...newContent,
      updatedAt: new Date(),
      updatedBy: req.user.email,
    }, { merge: true });

    await cache.del(`page:${pageId}`);

    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('CMS update error:', error);
    res.status(500).json({ error: 'Failed to save layout changes.' });
  }
});

/**
 * POST /api/cms/leads
 */
router.post('/leads', async (req, res) => {
  const { name, email, phone, interestType, targetId, message, selectedPackage } = req.body;

  if (!name || !email || !phone || !interestType) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and lead type.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }

  const phoneClean = phone.replace(/[^\d+]/g, '');
  if (phoneClean.length < 10 || phoneClean.length > 15) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  try {
    const leadData = {
      name: name.substring(0, 100),
      email: email.substring(0, 100),
      phone: phoneClean,
      interestType: interestType.substring(0, 50),
      targetId: (targetId || 'general').substring(0, 50),
      message: (message || '').substring(0, 1000),
      selectedPackage: (selectedPackage || '').substring(0, 100),
      status: 'new',
      createdAt: new Date(),
    };

    const result = await db.collection('leads').add(leadData);

    const programName = targetId === 'general' ? 'General Inquiry' : targetId;
    sendInquiryConfirmation(leadData, programName).catch(err =>
      console.error('[SMTP Lead Email Error]:', err.message)
    );

    res.json({ success: true, leadId: result.id });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to process inquiry request.' });
  }
});

/**
 * POST /api/cms/blogs
 */
router.post('/blogs', authenticateCms(['admin', 'staff']), async (req, res) => {
  const { title, excerpt, content, coverImage, authorName, seoTitle, seoDescription } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Blog title and article content are required.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 200);

  try {
    const blogData = {
      title: title.substring(0, 300),
      slug,
      excerpt: (excerpt || '').substring(0, 500),
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
      authorName: (authorName || 'Ashram Editor').substring(0, 100),
      seoTitle: (seoTitle || title).substring(0, 200),
      seoDescription: (seoDescription || excerpt || '').substring(0, 300),
      createdAt: new Date(),
      published: true,
    };

    await db.collection('blogs').doc(slug).set(blogData);
    await cache.del('blogs:list');

    res.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating blog article:', error);
    res.status(500).json({ error: 'Failed to write blog post.' });
  }
});

/**
 * GET /api/cms/blogs
 */
router.get('/blogs', async (req, res) => {
  try {
    const cached = await cache.get('blogs:list');
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const snapshot = await db.collection('blogs').get();

    if (snapshot.empty) {
      const mockBlogs = [
        {
          title: 'The Spiritual Significance of Cow Feeding (Gau Seva)',
          slug: 'spiritual-significance-of-cow-feeding-gau-seva',
          excerpt: 'Uncover the deep Vedic scripts highlighting cow protection and the direct spiritual merits of nourishing them.',
          coverImage: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=600',
          authorName: 'Swami Gopalananda',
          createdAt: new Date(),
          published: true,
        },
        {
          title: 'Daily Annadana: Feeding Pilgrims in Sacred Vrindavan Dham',
          slug: 'daily-annadana-feeding-pilgrims-vrindavan',
          excerpt: 'Learn how offering hot khichdi prasadam to sadhus, children, and travelers brings immense purity to our lives.',
          coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600',
          authorName: 'Sri Radha Dasa',
          createdAt: new Date(),
          published: true,
        },
      ];
      return res.json(mockBlogs);
    }

    const blogs = snapshot.docs.map(doc => doc.data());
    await cache.set('blogs:list', blogs, 600);
    res.setHeader('X-Cache', 'MISS');
    res.json(blogs);
  } catch (error) {
    console.error('Error listing blog posts:', error);
    res.status(500).json({ error: 'Failed to retrieve blog listings.' });
  }
});

module.exports = router;
