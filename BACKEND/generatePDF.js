const puppeteer = require("puppeteer");


module.exports = async function generatePDF({
    url
}) {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 750,
            height: 1000,
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
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
        format: '4',
        printBackground: true,
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm',
        },
    });

    await browser.close();

    return pdf;
}
