
const InvoiceTemplate  = (data)=>{
     return{
        content:[
            { text: `Invoice #${data.invoiceNumber}`, style:'header' },
            `Date: ${data.date}`,
            `Customer: ${data.customerName}`,
            {
                table:{
                    body:[
                        ['Item', 'Quantity', 'Price'],
                        ...data.items.map(item => [item.name, item.quantity, `$${item.price}`]),
                    ],
                },
                margin:[0,10,0,10],
            },
            { text: `Total: $${data.total}`, style: 'total' },
        ],
        styles:{
            header:{fontSize:18, bold:true},
            total:{fontSize:14, bold:true, alignment:'right' }
        },
        defaultStyle:{
            font: 'Roboto',
        },
     };
};

module.exports = InvoiceTemplate;