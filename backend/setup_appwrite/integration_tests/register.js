const puppeteer = require('puppeteer');
const fs = require("fs");
let browser;
let page;

function wait(ms) {
    return new Promise(resolve =>setTimeout(() =>resolve(), ms));
};

const read = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}


async function login(){
    await page.goto('http://localhost/auth/signin')

    await page.waitForSelector('body > main > div > div > form > input:nth-child(1)')
    await page.type('body > main > div > div > form > input:nth-child(1)', "root@example.org")

    await page.waitForSelector('body > main > div > div > form > input:nth-child(2)')
    await page.type('body > main > div > div > form > input:nth-child(2)', "cV65QZD7xvW@UsW")

    await page.waitForSelector('body > main > div > div > form > button')
    await page.click('body > main > div > div > form > button')

    await wait(1000);
}


(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();


    await login()


    //await browser.close();
})();




