const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a beautiful official donation receipt as a PDF.
 * @param {Object} donation - The donation record.
 * @param {string} filePath - Absolute path to write the PDF file to.
 * @returns {Promise<string>} Filepath of generated PDF on completion.
 */
function generateReceiptPdf(donation, filePath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      
      // Ensure the destination folder exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Golden saffron header accent
      doc.rect(0, 0, 595.28, 15).fill('#FF9933');

      doc.moveDown(2);
      
      // Header branding
      doc.fillColor('#1A1A1A');
      doc.fontSize(24).font('Helvetica-Bold').text('HARE KRISHNA DHARMA TRUST', { align: 'center' });
      doc.fontSize(10).font('Helvetica').text('Cow Protection (Gau Seva), Annadana & Spiritual Welfare Programs', { align: 'center' });
      doc.text('Sector 5, Sri Radha Krishna Dham, Mathura, Uttar Pradesh, India', { align: 'center' });
      doc.moveDown(1.5);

      // Divider line
      doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#E2E8F0').stroke();
      doc.moveDown(1.5);

      // Document Title
      doc.fillColor('#E65100');
      doc.fontSize(16).font('Helvetica-Bold').text('DONATION RECEIPT & CERTIFICATE', { align: 'center' });
      doc.moveDown(1.5);

      // Metadata Block
      doc.fillColor('#2D3748');
      doc.fontSize(11).font('Helvetica');

      const dateStr = donation.createdAt ? new Date(donation.createdAt._seconds ? donation.createdAt._seconds * 1000 : donation.createdAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');
      const startY = doc.y;
      
      doc.font('Helvetica-Bold').text('Receipt No:', 50, startY);
      doc.font('Helvetica').text(`HKD-${donation.id.substring(0, 10).toUpperCase()}`, 120, startY);

      doc.font('Helvetica-Bold').text('Date:', 380, startY);
      doc.font('Helvetica').text(dateStr, 420, startY);

      doc.moveDown(1);
      const donorY = doc.y;
      doc.font('Helvetica-Bold').text('Donor Name:', 50, donorY);
      doc.font('Helvetica').text(donation.donorName, 120, donorY);

      doc.font('Helvetica-Bold').text('Email:', 380, donorY);
      doc.font('Helvetica').text(donation.email, 420, donorY);

      doc.moveDown(1);
      const contactY = doc.y;
      doc.font('Helvetica-Bold').text('Contact No:', 50, contactY);
      doc.font('Helvetica').text(donation.phone, 120, contactY);

      if (donation.panNumber) {
        doc.font('Helvetica-Bold').text('PAN No:', 380, contactY);
        doc.font('Helvetica').text(donation.panNumber.toUpperCase(), 420, contactY);
      }

      doc.moveDown(2);
      
      // Transaction details panel
      const boxY = doc.y;
      doc.rect(50, boxY, 495, 75).fillAndStroke('#FFFBF2', '#FF9933');
      
      // Reset fill for text
      doc.fillColor('#2D3748');
      doc.font('Helvetica-Bold').fontSize(11).text('Seva Category / Purpose', 70, boxY + 18);
      doc.font('Helvetica').fontSize(11).text(donation.sevaCategory, 70, boxY + 38);

      doc.font('Helvetica-Bold').fontSize(11).text('Contribution Amount', 380, boxY + 18);
      doc.font('Helvetica-Bold').fontSize(14).fillColor('#E65100').text(`INR ₹${donation.amount.toLocaleString('en-IN')}.00`, 380, boxY + 38);

      doc.fillColor('#2D3748');
      doc.moveDown(5.5);

      // Trust context block
      doc.fontSize(9.5).font('Helvetica-Oblique').text(
        'Thank you for your generous seva. Your contribution has been directly allocated towards providing clean feed, medical care to abandoned cows, and nourishing hot khichdi prasadam to pilgrims and children.',
        { align: 'justify', width: 495 }
      );
      doc.moveDown(2);

      // Signatures
      const sigY = doc.y;
      doc.fontSize(9).font('Helvetica-Bold').text('Transaction Verified', 50, sigY + 25);
      doc.font('Helvetica').text('Razorpay Settlement API', 50, sigY + 37);

      doc.fontSize(10).font('Helvetica-Bold').text('Authorized Signatory', 380, sigY + 25);
      doc.fontSize(9).font('Helvetica').text('Hare Krishna Dharma Trust', 380, sigY + 37);

      // Finish document
      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  generateReceiptPdf
};
