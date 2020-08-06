const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.amazon.com', {waitUntil: 'networkidle2'});
    await page.type('#twotabsearchtextbox', 'cat');
    await page.click('input.nav-input');

    await page.waitForSelector('#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(2) > div > span > div > div > div > div > span > a > div > img');
    await page.screenshot({path: 'cat.png'});
    const response = await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.setDefaultNavigationTimeout(0),
        page.click('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > span > a > div > img'), // Clicking the link will indirectly cause a navigation
    ]);
    await page.waitForSelector('#productTitle');
    await page.emulateMedia('screen');
    await page.pdf({path: 'cat.pdf', format: 'A4', pageRanges: '1',printBackground:true});
    const title = await page.evaluate(() => document.querySelector('head > title').innerHTML);
    console.log(title);


    // await browser.close();

};

scrape().then((value) => {
    console.log(value); // Success!
});
