const { createClient } = require('redis');

let client = null;
let isConnected = false;

async function initRedis() {
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

  try {
    client = createClient({ 
      url: redisUrl,
      socket: {
        connectTimeout: 2000,
        reconnectStrategy: false
      }
    });
    client.on('error', (err) => {
      if (isConnected) {
        console.warn('[Redis] Connection lost:', err.message);
        isConnected = false;
      }
    });
    client.on('connect', () => {
      isConnected = true;
      console.log('[Redis] Connected successfully.');
    });
    await client.connect();
  } catch (err) {
    console.warn(`[Redis] Not available, using passthrough mode: ${err.message}`);
    client = null;
    isConnected = false;
  }
}

async function get(key) {
  if (!client || !isConnected) return null;
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

async function set(key, value, ttlSeconds = 300) {
  if (!client || !isConnected) return;
  try {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch {
    // silent fail — cache is optional
  }
}

async function del(key) {
  if (!client || !isConnected) return;
  try {
    await client.del(key);
  } catch {
    // silent fail
  }
}

async function flush(pattern) {
  if (!client || !isConnected) return;
  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) await client.del(keys);
  } catch {
    // silent fail
  }
}

module.exports = { initRedis, get, set, del, flush };
