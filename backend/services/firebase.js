const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let db;
let auth;
let isMock = false;

// Mock database wrapper for development when Firebase credentials are not supplied
class MockFirestore {
  constructor() {
    this.storage = new Map();
  }

  collection(name) {
    if (!this.storage.has(name)) {
      this.storage.set(name, new Map());
    }
    const colStore = this.storage.get(name);

    return {
      doc: (id) => {
        const docId = id || Math.random().toString(36).substring(7);
        return {
          get: async () => {
            const data = colStore.get(docId);
            return {
              exists: !!data,
              data: () => data,
              id: docId
            };
          },
          set: async (data, options) => {
            let finalData = data;
            if (options && options.merge && colStore.has(docId)) {
              finalData = { ...colStore.get(docId), ...data };
            }
            colStore.set(docId, finalData);
            return { writeTime: new Date() };
          },
          update: async (data) => {
            if (!colStore.has(docId)) throw new Error('Document not found');
            colStore.set(docId, { ...colStore.get(docId), ...data });
            return { writeTime: new Date() };
          },
          delete: async () => {
            colStore.delete(docId);
            return { writeTime: new Date() };
          }
        };
      },
      add: async (data) => {
        const docId = Math.random().toString(36).substring(7);
        colStore.set(docId, data);
        return {
          id: docId,
          get: async () => ({
            exists: true,
            data: () => data,
            id: docId
          })
        };
      },
      where: function(field, op, val) {
        return this; // Basic chainable mock for testing
      },
      limit: function() {
        return this;
      },
      orderBy: function() {
        return this;
      },
      get: async () => {
        const docs = [];
        colStore.forEach((data, id) => {
          docs.push({
            id,
            exists: true,
            data: () => data
          });
        });
        return {
          empty: docs.length === 0,
          docs
        };
      }
    };
  }
}

class MockAuth {
  async verifyIdToken(token) {
    if (token === 'mock-admin-token') {
      return { uid: 'mock-admin-uid', email: 'admin@hkd.org', role: 'admin' };
    }
    if (token === 'mock-staff-token') {
      return { uid: 'mock-staff-uid', email: 'staff@hkd.org', role: 'staff' };
    }
    throw new Error('Invalid mock token');
  }
}

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('[Firebase Service] Successfully connected to live Firebase Firestore.');
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    db = admin.firestore();
    auth = admin.auth();
    console.log('[Firebase Service] Connected to live Firebase using Application Default Credentials.');
  } else {
    throw new Error('No Firebase configuration variables found.');
  }
} catch (error) {
  console.warn(`[Firebase Service Warning] Initializing Local Mock Memory-Store. Reason: ${error.message}`);
  db = new MockFirestore();
  auth = new MockAuth();
  isMock = true;
}

module.exports = {
  db,
  auth,
  isMock,
  admin // Export raw admin for FieldValues if needed
};
