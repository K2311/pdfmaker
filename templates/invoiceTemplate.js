const fs = require('fs');
const path = require('path');


const getImageBase64 = (filePath) => {
    try {
        return fs.readFileSync(filePath, { encoding: 'base64' });
    } catch (error) {
        console.error(`Error reading image at ${filePath}:`, error);
        return null;
    }
    
};

const InvoiceTemplate = (data) => {
    const logoBase64 = getImageBase64(path.resolve(__dirname, '../assets/logo.jpg')); 
    return {
        content: [
            logoBase64 ?
            {
                image: `data:image/png;base64,${logoBase64}`, 
                width: 100,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            }
            :{  text: '', margin: [0, 0, 0, 10] },
            { text: `Invoice #${data.invoiceNumber}`, style: 'header' },
            { text: `Date: ${data.date}`,margin: [0, 5, 0, 5] },
            { text: `Customer: ${data.customerName}`, margin: [0, 5, 0, 10] },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 'auto'],
                    body: [
                        ['Item', 'Quantity', 'Price'],
                        ...data.items.map((item) => [item.name, item.quantity, `$${item.price}`]),
                    ],
                },
                layout: 'lightHorizontalLines',
                margin: [0, 10, 0, 10],
            },
            { text: `Total: $${data.total}`, style: 'total' },
        ],
        styles: {
            header: { fontSize: 18, bold: true },
            total: { fontSize: 14, bold: true, alignment: 'right' },
        },
        footer: (currentPage, pageCount) => ({
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: 'center',
            margin: [0, 10, 0, 0],
        }),
        defaultStyle: {
            font: 'Roboto',
        },
    };
};

module.exports = InvoiceTemplate;
