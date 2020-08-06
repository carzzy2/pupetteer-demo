const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.lottovip.com/login', {waitUntil: 'networkidle2'});
    await page.type('#login > div > div:nth-child(1) > div > input', 'carzzy2');
    await page.type('#login > div > div:nth-child(2) > div > input', 'virus1001');
    await page.click('#login > div > div:nth-child(5) > button');
    const n = Date.now();
    await setTimeout(function(){
        page.screenshot({path: 'img/'+ n +'.png'});
    }, 3000);

    // await browser.close();
})();
