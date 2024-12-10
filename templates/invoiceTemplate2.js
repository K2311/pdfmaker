const fs = require('fs');
const path = require('path');


const getImageBase64 = (filePath) => {
    return fs.readFileSync(filePath, { encoding: 'base64' });
};

const InvoiceTemplate = (data) => {
    const logoBase64 = getImageBase64(path.resolve(__dirname, '../assets/logo.jpg')); 
    return {
        content: [
            {
                image: `data:image/png;base64,${logoBase64}`, 
                width: 100,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            { text: `Invoice #${data.invoiceNumber}`, style: 'header' },
            `Date: ${data.date}`,
            `Customer: ${data.customerName}`,
            {
                table: {
                    body: [
                        ['Item', 'Quantity', 'Price'],
                        ...data.items.map((item) => [item.name, item.quantity, `$${item.price}`]),
                    ],
                },
                margin: [0, 10, 0, 10],
            },
            { text: `Total: $${data.total}`, style: 'total' },
        ],
        styles: {
            header: { fontSize: 18, bold: true },
            total: { fontSize: 14, bold: true, alignment: 'right' },
        },
        defaultStyle: {
            font: 'Roboto',
        },
    };
};

module.exports = InvoiceTemplate;
