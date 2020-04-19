import {
    calculateFine,
    inputConfirmed,
    validateRegistrationObject,
    validUserName
} from "../../main/resources/src/ts/functions";
import {Reader} from "../../main/resources/src/ts/interfaces";
import * as moment from "moment";
import * as puppeteer from "puppeteer"
import {Browser} from "puppeteer"

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

test('Check if username only contains letters and/or numbers', () => { //UNIT TEST 1
    expect(validUserName('testUser')).toBe(true);
});

test('Recursively check reader object for empty values', () => { //UNIT TEST 2
    let testReader = {
        firstname: "John",
        lastname: "Doe",
        address: "",
        email: "johnDoe@example.com",
        readerid: 1,
        rtype: "admin",
        zipcode: "12345"
    } as Reader;
    expect(validateRegistrationObject(testReader)).toBe(false);
});

test('Test fine calculator', () => { //UNIT TEST 3
    let borrowDate = moment().subtract(10, 'days').toDate() as Date;
    let fine = 0;
    fine = calculateFine(borrowDate);
    expect(fine).toBe(2);
});

const values = [["yes", "yes", true], ["no", "no", true], ["no", "yes", false], ["dog", "dog", true], ["dog", "cat", false], ["man", "kind", false]]
test.each(values)('Test matching inputs', (input1: string, input2: string, bool: boolean) => { //UNIT TEST 4
    expect(inputConfirmed(input1, input2)).toBe(bool);
});
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
test("Login UI Test", async () => { //INTEGRATION TEST 1
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

test("Login Nav", async () => { //SYSTEM TEST 1
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