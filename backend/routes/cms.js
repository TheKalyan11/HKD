const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { db } = require('../services/firebase');
const { sendInquiryConfirmation } = require('../services/email');

const JWT_SECRET = process.env.JWT_SECRET || 'hkd_premium_jwt_secret_108';

/**
 * Authentication Middleware: Validates secure JWTs for Admin or Staff
 */
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
 * Route: Admin/Staff Authentication Sign-In
 * POST /api/cms/auth/login
 */
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

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

  // Issue dynamic security token
  const token = jwt.sign(
    { email, role, name, uid: `${role}_temp_uid` },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: { email, role, name }
  });
});

/**
 * Route: Fetch Visual CMS layout content for a specific page
 * GET /api/cms/pages/:pageId
 */
router.get('/pages/:pageId', async (req, res) => {
  const { pageId } = req.get; // Express param key
  const targetId = req.params.pageId;

  try {
    const docRef = db.collection('pages_content').doc(targetId);
    const doc = await docRef.get();

    if (doc.exists) {
      return res.json(doc.data());
    }

    // Dynamic Database Bootstrapping: populate beautiful default content if missing
    let defaultContent = {};

    if (targetId === 'home') {
      defaultContent = {
        hero: {
          title: 'Preserve Vedic Culture, Protect Holy Cows',
          subtitle: 'Join us in offering Gau Seva and Annadana Prasadam in the sacred land of Sri Radha Krishna Dham.',
          bannerUrl: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=1600',
          ctaText: 'Offer Seva Now'
        },
        about: {
          title: 'Our Mission of Compassion',
          content: 'We are dedicated to establishing high standards of cow care (Gau Seva), organizing daily food distribution (Annadana Seva), and promoting classical spiritual education across the region. Every seva you offer directly sustains healthy pastures, medical sanctuaries, and hot organic meals.'
        },
        bannerText: 'Upcoming Auspicious Ekadashi and Child Annadana Seva Festivals. Participate Online!'
      };
    } else {
      defaultContent = {
        title: `Visual Content Section for ${targetId}`,
        subtitle: 'Edit this page content in-browser using our built-in CMS.',
        updatedAt: new Date()
      };
    }

    await docRef.set(defaultContent);
    res.json(defaultContent);

  } catch (error) {
    console.error('Error fetching visual CMS page content:', error);
    res.status(500).json({ error: 'Failed to retrieve page sections.' });
  }
});

/**
 * Route: Update Visual CMS layouts securely
 * PUT /api/cms/pages/:pageId
 */
router.put('/pages/:pageId', authenticateCms(['admin', 'staff']), async (req, res) => {
  const { pageId } = req.params;
  const newContent = req.body;

  try {
    const docRef = db.collection('pages_content').doc(pageId);
    await docRef.set({
      ...newContent,
      updatedAt: new Date(),
      updatedBy: req.user.email
    }, { merge: true });

    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('CMS update error:', error);
    res.status(500).json({ error: 'Failed to save layout changes.' });
  }
});

/**
 * Route: Capture Inquiries and Event registration Leads
 * POST /api/cms/leads
 */
router.post('/leads', async (req, res) => {
  const { name, email, phone, interestType, targetId, message, selectedPackage } = req.body;

  if (!name || !email || !phone || !interestType) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and lead type.' });
  }

  try {
    const leadData = {
      name,
      email,
      phone,
      interestType,
      targetId: targetId || 'general',
      message: message || '',
      selectedPackage: selectedPackage || '',
      status: 'new',
      createdAt: new Date()
    };

    // Save lead
    const result = await db.collection('leads').add(leadData);

    // Send instant SMTP confirmation
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
 * Route: Create a new blog post
 * POST /api/cms/blogs
 */
router.post('/blogs', authenticateCms(['admin', 'staff']), async (req, res) => {
  const { title, excerpt, content, coverImage, authorName, seoTitle, seoDescription } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Blog title and article content are required.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  try {
    const blogData = {
      title,
      slug,
      excerpt: excerpt || '',
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
      authorName: authorName || 'Ashram Editor',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || '',
      createdAt: new Date(),
      published: true
    };

    await db.collection('blogs').doc(slug).set(blogData);
    res.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating blog article:', error);
    res.status(500).json({ error: 'Failed to write blog post.' });
  }
});

/**
 * Route: List blog posts
 * GET /api/cms/blogs
 */
router.get('/blogs', async (req, res) => {
  try {
    const docRef = db.collection('blogs');
    const snapshot = await docRef.get();
    
    // Fallback Mock data if database is empty
    if (snapshot.empty) {
      const mockBlogs = [
        {
          title: 'The Spiritual Significance of Cow Feeding (Gau Seva)',
          slug: 'spiritual-significance-of-cow-feeding-gau-seva',
          excerpt: 'Uncover the deep Vedic scripts highlighting cow protection and the direct spiritual merits of nourishing them.',
          coverImage: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=600',
          authorName: 'Swami Gopalananda',
          createdAt: new Date(),
          published: true
        },
        {
          title: 'Daily Annadana: Feeding Pilgrims in Sacred Vrindavan Dham',
          slug: 'daily-annadana-feeding-pilgrims-vrindavan',
          excerpt: 'Learn how offering hot khichdi prasadam to sadhus, children, and travelers brings immense purity to our lives.',
          coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600',
          authorName: 'Sri Radha Dasa',
          createdAt: new Date(),
          published: true
        }
      ];
      
      return res.json(mockBlogs);
    }

    const blogs = [];
    snapshot.docs.forEach(doc => {
      blogs.push(doc.data());
    });

    res.json(blogs);

  } catch (error) {
    console.error('Error listing blog posts:', error);
    res.status(500).json({ error: 'Failed to retrieve blog listings.' });
  }
});

module.exports = router;
