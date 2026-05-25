const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Sends a pre-approved WhatsApp message template using Meta's Cloud API
 * @param {string} to - Recipient phone number (with country code, e.g., '919876543210')
 * @param {string} templateName - Approved template name in Meta Business suite
 * @param {Array} components - Values to populate dynamic parameters ({{1}}, {{2}}, etc.)
 * @returns {Promise<Object>} API Response
 */
async function sendWhatsAppTemplate(to, templateName, components = []) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // Clean phone number: remove non-digits
  const cleanTo = to.replace(/\D/g, '');

  if (!token || !phoneNumberId) {
    console.log(`\n--- [WhatsApp API Dev Simulation] ---`);
    console.log(`To: +${cleanTo}`);
    console.log(`Template: ${templateName}`);
    console.log(`Parameters:`, JSON.stringify(components, null, 2));
    console.log(`--------------------------------------\n`);
    return { mockSuccess: true, message: 'Simulated dispatch successful' };
  }

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
  
  const payload = {
    messaging_product: 'whatsapp',
    to: cleanTo,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: process.env.WHATSAPP_TEMPLATE_LANG || 'en_US'
      },
      components: components
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`[WhatsApp API] Message sent successfully to +${cleanTo}, ID: ${response.data.messages?.[0]?.id}`);
    return response.data;
  } catch (error) {
    console.error('[WhatsApp API Error]:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to dispatch WhatsApp template');
  }
}

/**
 * Direct utility to send a donation receipt notification
 */
async function sendDonationConfirmation(to, name, amount, seva, receiptUrl) {
  const components = [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: name },
        { type: 'text', text: `₹${amount}` },
        { type: 'text', text: seva }
      ]
    }
  ];

  if (receiptUrl) {
    // If template supports a PDF media link in header or button
    components.push({
      type: 'button',
      sub_type: 'url',
      index: '0',
      parameters: [
        { type: 'text', text: receiptUrl.replace(/^https?:\/\/[^\/]+/, '') } // dynamic slug part
      ]
    });
  }

  return sendWhatsAppTemplate(to, 'seva_receipt_confirmation', components);
}

module.exports = {
  sendWhatsAppTemplate,
  sendDonationConfirmation
};
