import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";

async function TestLogin(browser: Browser) {
    let page = (await browser.pages())[0];
    await page.goto("http://localhost:8080/dashboard.html");
    await page.click('#email');
    await page.type("#email", "bot");
    await page.click('#password');
    await page.type("#password", "test123");
    await page.click("#loginForm > div.row > div > button");
    await page.waitForNavigation();
    return page;
}

test("Login button test", async (done) => { //UNIT TEST 5
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
    });
    let page = (await browser.pages())[0];
    await page.setViewport({width: 1920, height: 1080})
    await page.goto("http://localhost:8080/", {waitUntil: 'networkidle2'});
    await page.waitForSelector("#nav-login");
    await page.click("#nav-login");
    let url = page.url();
    expect(url.includes("dashboard.html")).toBeTruthy();
    await browser.close();
    done();
}, 10000);
test("Login UI test", async () => { //INTEGRATION TEST 1
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        defaultViewport: null
    });
    let page = await TestLogin(browser)
    let url = page.url();
    expect(url.includes("#profile")).toBeTruthy();
    await browser.close();
}, 10000);

test("Dashboard nav test", async () => { //SYSTEM TEST 1
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        defaultViewport: null
    });
    let page = await TestLogin(browser)
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(2)");
    let url = page.url();
    expect(url.includes("#borrow")).toBeTruthy();
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(1)");
    url = page.url();
    expect(url.includes("#profile")).toBeTruthy();
    await browser.close();
}, 20000);
test("Borrow a book test", async () => { //SYSTEM TEST 2
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        defaultViewport: null
    });
    let page = await TestLogin(browser)
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(2)");
    await page.waitFor(2000);
    let randomBook = `#all-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${Math.floor(Math.random() * 20) + 1})`;
    await page.click(randomBook);
    await page.waitForSelector("#borrow-confirm")
    await page.click("#borrow-confirm");
    await page.type("#borrow-confirm", "bot");
    let dialogText = "";
    page.on('dialog', async dialog => {
        dialogText = dialog.message();
        await dialog.accept();
    });
    await page.click("#borrow");
    await page.waitFor(3000);
    expect(dialogText).toBe("Transaction completed");
    await browser.close();
}, 20000);