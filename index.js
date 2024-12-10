const PDFService = require('./pdfService');
const generateInvoiceTemplate = require('./templates/invoiceTemplate');
const generateInvoiceTemplate2 = require('./templates/invoiceTemplate2');

(async()=>{
    const invoiceData = {
        invoiceNumber : 12345,
        date: '2024-12-10',
        customerName: 'Rahul makwana',
        items: [
            { name: 'Item A', quantity: 2, price: 10 },
            { name: 'Item B', quantity: 1, price: 20 },
          ],
          total: 40,
    };

    //simple invoce
    const docDefinition = generateInvoiceTemplate(invoiceData);
    const outputPath = 'invoice.pdf';

    //invoice with image
    const docDefinition2 = generateInvoiceTemplate2(invoiceData);
    const outputPath2 = 'invoice2.pdf';

    try {
        await PDFService(docDefinition, outputPath);
        console.log(`PDF generated at: ${outputPath}`);

        await PDFService(docDefinition2, outputPath2);
        console.log(`PDF generated with imgage at: ${outputPath2}`);
      } catch (error) {
        console.error('Failed to generate PDF:', error);
      }
})();