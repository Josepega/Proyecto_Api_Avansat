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
    await page.emulateMediaType('screen');

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

    return pdf;
}