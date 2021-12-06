const puppeteer = require('puppeteer');
const fs = require("fs");
let browser;
let page;

function wait(ms) {
    return new Promise(resolve =>setTimeout(() =>resolve(), ms));
};

async function setRootCredentials(){
    await page.goto('http://localhost/auth/signup')



    //await page.setViewport({ width: 1920, height: 1080 })
    const bodyHandle = await page.$('body');
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    console.log(html)

    await page.waitForSelector('body > main > div > form > input[type=text]:nth-child(3)')
    await page.type('body > main > div > form > input[type=text]:nth-child(3)', 'root')

    await page.waitForSelector('body > main > div > form > input[type=email]:nth-child(5)')
    await page.type('body > main > div > form > input[type=email]:nth-child(5)', "root@example.org")

    await page.waitForSelector('body > main > div > form > input[type=password]:nth-child(7)')
    await page.type("body > main > div > form > input[type=password]:nth-child(7)", "cV65QZD7xvW@UsW")

    await page.waitForSelector('body > main > div > form > div.agree.margin-top-large.margin-bottom-large > div > input[type=checkbox]')
    await page.click('body > main > div > form > div.agree.margin-top-large.margin-bottom-large > div > input[type=checkbox]')

    await page.waitForSelector('.theme-light > main > .zone > form > button')
    await page.click('.theme-light > main > .zone > form > button')

    await wait(1000);
}

async function createProject(){
   await wait(1000);

    await page.waitForSelector('body > main > section > div.margin-bottom-xl.load-service-start.load-service-end > button')
    await page.click('body > main > section > div.margin-bottom-xl.load-service-start.load-service-end > button')

    await wait(1000);

    await page.waitForSelector('body > div.modal.box.sticky-footer.open > form > input')
    await page.type('body > div.modal.box.sticky-footer.open > form > input', 'test')

    await wait(1000);

    await page.waitForSelector('body > div.modal.box.sticky-footer.open > form > footer > button:nth-child(1)')
    await page.click('body > div.modal.box.sticky-footer.open > form > footer > button:nth-child(1)')

    await wait(1000);
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

async function createApiKey(){
    await wait(1000);

    await Promise.all([
        page.$eval('body > header > nav > div > ul:nth-child(5) > li:nth-child(3) > a', el => el.click()),
        page.waitForNavigation()
    ]).catch(e => console.log(e));

    await wait(1000);

    await page.waitForSelector('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > button')
    await page.click('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > button')

    await page.waitForSelector('#name')
    await page.type('#name', 'test')

    await page.waitForSelector('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > div > form > button:nth-child(4)')
    await page.click('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > div > form > button:nth-child(4)')

    await page.waitForSelector('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > div > form > button:nth-child(8)')
    await page.click('body > main > div > div.zone.xl.load-service-start.load-service-end > div.clear > div > form > button:nth-child(8)')

    await page.waitForSelector('body > main > div > div.zone.xl.load-service-start.load-service-end > div:nth-child(2) > ul > li > div.clear > button:nth-child(1)')
    await page.click('body > main > div > div.zone.xl.load-service-start.load-service-end > div:nth-child(2) > ul > li > div.clear > button:nth-child(1)')

    await page.waitForSelector('body > main > div > div.zone.xl.load-service-start.load-service-end > div:nth-child(2) > ul > li > div.clear > div > form > div.input-copy > textarea')
    let element = await page.$('body > main > div > div.zone.xl.load-service-start.load-service-end > div:nth-child(2) > ul > li > div.clear > div > form > div.input-copy > textarea')
    let apiKey = await page.evaluate(x => x.value, element)
    let projectId = page.url().slice(38)
    fs.writeFile('project-id.txt', Buffer.from(projectId), err => {
        if (err) {
            console.error(err)
            return
        }
    })
    fs.writeFile('api-key.txt', Buffer.from(apiKey), err => {
        if (err) {
            console.error(err)
            return
        }
    })
}


(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();

    await wait(10000)
    await setRootCredentials()
    //await login()
    await createProject()
    await createApiKey()
    await browser.close();
})();




