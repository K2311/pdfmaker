const PdfPrinter = require('pdfmake');
const fs = require('fs');
const fonts = require('./fonts');


const generatePDF = (docDefinition,outputPath)=>{
    const printer = new PdfPrinter(fonts);
    return new Promise((resolve,reject)=>{
        
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const writeStream = fs.createWriteStream(outputPath);

        pdfDoc.pipe(writeStream);
        pdfDoc.end();

        writeStream.on('finish',resolve);
        writeStream.on('error',reject);
    });
}

module.exports = generatePDF;