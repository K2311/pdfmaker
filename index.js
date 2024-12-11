const PDFService = require('./pdfService');
const path = require('path');
const fs = require('fs');
const generateInvoiceTemplate = require('./templates/invoiceTemplate');

(async()=>{
    const invoices = [
      {
        invoiceNumber: 12345,
        date: '2024-12-10',
        customerName: 'Rahul Makwana',
        items: [
          { name: 'Item A', quantity: 2, price: 10 },
          { name: 'Item B', quantity: 1, price: 20 },
        ],
        total: 40,
      },
      {
        invoiceNumber: 12346,
        date: '2024-12-11',
        customerName: 'Anjali Patel',
        items: [
          { name: 'Item X', quantity: 1, price: 50 },
          { name: 'Item Y', quantity: 3, price: 15 },
        ],
        total: 95,
      },
      {
        invoiceNumber: 12346,
        date: '2024-12-09',
        customerName: 'Hemant Gamit',
        items: [
          { name: 'Item P', quantity: 2, price: 55 },
          { name: 'Item Q', quantity: 1, price: 101 },
        ],
        total: 156,
      },
    ];

    const outputDir = path.join(__dirname, 'invoices');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir); 
    }

    for (const invoiceData of invoices) {
      try{
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const docDefinition = generateInvoiceTemplate(invoiceData);
        const outputPath = path.join(outputDir, `invoice_${invoiceData.invoiceNumber}_${timestamp}.pdf`);
        await PDFService(docDefinition, outputPath);
        console.log(`PDF generated at: ${outputPath}`);

      }catch (error) {
        console.error(`Failed to generate PDF for invoice #${invoiceData.invoiceNumber}:`, error);
      }
    }

})();