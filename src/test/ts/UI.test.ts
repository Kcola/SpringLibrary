import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {it2_values} from "./testcases";
import {NewUser} from "../../main/resources/src/ts/interfaces";

async function initialize() {
    let headlessSetting = {
        headless: true,
        defaultViewport: null as null
    };
    let headfullSettings = {
        headless: false,
        slowMo: 20,
        args: [
            '--start-maximized' // you can also use '--start-fullscreen'
        ],
        defaultViewport: null as null
    };
    let browser = await puppeteer.launch(headfullSettings);
    await (await browser.pages())[0].close();
    return browser;
}

let GlobalBrowser = initialize();

async function TestLogin(browser: Browser) {
    let page = await browser.newPage();
    await page.setViewport({width: 1160, height: 702});
    await page.goto("http://localhost:8080/dashboard.html");
    await page.waitForSelector("#email")
    await page.click('#email');
    await page.type("#email", "bot");
    await page.click('#password');
    await page.type("#password", "test123");
    await page.click("#loginForm > div.row > div > button");
    await page.waitForNavigation();
    return page;
}

test("Login button test", async () => { //UNIT TEST 5
    let browser = await GlobalBrowser;
    let page = await browser.newPage();
    await page.setViewport({width: 1160, height: 702});
    await page.goto("http://localhost:8080/", {waitUntil: 'networkidle2'});
    await page.waitForSelector("#nav-login");
    await page.click("#nav-login");
    let url = page.url();
    expect(url.includes("dashboard.html")).toBeTruthy();
    await page.close();
}, 10000);

test("Empty registration form test", async () => { //INTEGRATION TEST 1
    let browser = await GlobalBrowser;
    let page = await browser.newPage();
    await page.setViewport({width: 1160, height: 702});
    await page.goto("http://localhost:8080/dashboard.html#login", {waitUntil: 'networkidle2'});
    await page.waitForSelector("#registerEmail");
    let dialogText = "";
    page.on('dialog', async dialog => {
        dialogText = dialog.message();
        await dialog.accept();
    });
    await page.click("#registerForm > button");
    expect(dialogText).toBe("Username can only contain letters and/or numbers")
    await page.close();
}, 10000);

test.each(it2_values)("Registration alerts test", async (user: NewUser, alert: string) => { //INTEGRATION TEST 2
    let browser = await GlobalBrowser;
    let page = await browser.newPage();
    await page.setViewport({width: 1160, height: 702});
    await page.goto("http://localhost:8080/dashboard.html#login", {waitUntil: 'networkidle2'});
    await page.reload();
    await page.waitForSelector("#registerEmail");
    await page.click("#registerEmail");
    await page.type("#registerEmail", user.email);
    await page.click("#registerUsername");
    await page.type("#registerUsername", user.username);
    await page.click("#registerPassword");
    await page.type("#registerPassword", user.password);
    await page.click("#registerConfirmPassword");
    await page.type("#registerConfirmPassword", user.password);
    await page.click("#registerFirstname");
    await page.type("#registerFirstname", user.firstname);
    await page.click("#registerLastname");
    await page.type("#registerLastname", user.lastname);
    await page.click("#registerStreetAddress");
    await page.type("#registerStreetAddress", user.address.split(", ")[0]);
    await page.click("#registerCity");
    await page.type("#registerCity", user.address.split(", ")[1]);
    await page.click("#registerState");
    await page.select("#registerState", user.address.split(", ")[2].substring(0, 2));
    await page.click("#registerZipcode");
    await page.type("#registerZipcode", user.address.split(", ")[2].substring(2, user.address.split(", ")[2].length));
    page.on('dialog', async dialog => {
        let dialogText = dialog.message();
        await dialog.accept();
        expect(dialogText).toBe(alert);
    });
    await page.click("#registerForm > button");
    await page.close();
}, 30000);
test("Login UI test", async () => { //INTEGRATION TEST 3
    let browser = await GlobalBrowser;
    let page = await TestLogin(browser)
    let url = page.url();
    expect(url.includes("#profile")).toBeTruthy();
    await page.close();
}, 10000);

test("Dashboard nav test", async () => { //SYSTEM TEST 1
    let browser = await GlobalBrowser;
    let page = await TestLogin(browser)
    await page.waitFor(2000);
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(2)");
    let url = page.url();
    expect(url.includes("#borrow")).toBeTruthy();
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(1)");
    url = page.url();
    expect(url.includes("#profile")).toBeTruthy();
    await page.close();
}, 20000);

test("Borrow a book test", async () => { //SYSTEM TEST 2
    let browser = await GlobalBrowser;
    let page = await TestLogin(browser)
    await page.waitFor(2000);
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(2)");
    await page.waitFor(2000);
    let randomBook = `#all-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${Math.floor(Math.random() * 10) + 1})`;
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
    await page.waitFor(1000);
    expect(dialogText).toBe("Transaction completed");
    await page.close();
}, 20000);
test("Return a book test", async () => { //SYSTEM TEST 3
    let browser = await GlobalBrowser;
    let page = await TestLogin(browser)
    await page.waitFor(1000);
    await page.click("#sidebar-wrapper > div.list-group.list-group-flush > a:nth-child(1)");
    await page.waitFor(1000);
    let soonestBook = `#borrowed-books-grid > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(1)`;
    await page.click(soonestBook);
    let dialogText = "";
    page.on('dialog', async dialog => {
        dialogText = dialog.message();
        await dialog.accept();
    });
    await page.click("#return");
    await page.waitFor(1000);
    expect(dialogText).toBe("Book Returned");
    await page.close();
}, 20000);
