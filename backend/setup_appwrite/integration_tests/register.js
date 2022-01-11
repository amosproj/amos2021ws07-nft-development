const puppeteer = require('puppeteer');
const fs = require("fs");
let browser;
let page;

function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};


async function register(){

    await page.goto('http://localhost:8181/signup')

    await page.waitForSelector('#username')
    await page.type('#username', "robot")

    await page.waitForSelector('#email')
    await page.type('#email', "sr2odfdfvfghfgffffdfgfffdffbfot@example.org")

    await page.waitForSelector('#password')
    await page.type('#password',  "cV65QZD7xvW@UsW")

    await page.waitForSelector("#root > div > div > div > div > main > div > form > div:nth-child(2) > button")
    await page.click("#root > div > div > div > div > main > div > form > div:nth-child(2) > button")

    await wait(2000)
    //await page.waitForNavigation()

    const bodyHandle = await page.$('body');
    return await page.evaluate(body => body.innerHTML, bodyHandle);
}


(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 500 })
    page.setDefaultNavigationTimeout(3000)

    let res = await register()

    //console.log(res)


    if(res.toString().includes("We sent you a confirmation email")){
        console.log("Account creation successful!")
        await browser.close();
        process.exit(0);
    }else{
        console.log("Account creation NOT successful!")
        await browser.close();
        process.exit(1);
    }
    await page.waitForNavigation()
})();




