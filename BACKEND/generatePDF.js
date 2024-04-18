const fs = require('fs');
const path = require('path');
const Puppeteer = require("puppeteer");

module.exports = async function generatePDF({
    url
}) {
    const browser = await Puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 750,
            height: 500,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: false,
            isLandscape: false
        }
    })

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle0'
    });

    // Ocultar el título de la página y la URL antes de generar el PDF
    await page.evaluate(() => {
        document.querySelector('title').style.display = 'none'; // Ocultar el título
        const metaUrl = document.querySelector('meta[name="url"]');
        if (metaUrl) {
            metaUrl.parentNode.removeChild(metaUrl); // Eliminar el nodo de la URL
        }
    });

    const pdf = await page.pdf({
        format: 'a4',
        printBackground: true,
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm',
        },
    });

    await browser.close();

    // Guardar el archivo PDF en el sistema de archivos del servidor
    const nombreArchivo = 'factura.pdf';
    const rutaArchivo = path.join(__dirname, nombreArchivo);
    fs.writeFileSync(rutaArchivo, pdf);

    // Devolver la ruta del archivo PDF para descargar
    return rutaArchivo;
}
