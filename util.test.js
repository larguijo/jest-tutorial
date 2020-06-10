const pupeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Luis", 27);
  expect(text).toBe("Luis (27 years old)");
});

test("should output right data if no params passed", () => {
  const text = generateText();
  expect(text).toBe("undefined (undefined years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Luis", 31);
  expect(text).toBe("Luis (31 years old)");
});

test("should click around", async () => {
  const browser = await pupeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--windows-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("file:///C:/Code/myProjects/unit-testing/index.html");
  await page.click("input#name");
  await page.type("input#name", "Belen");
  await page.click("input#age");
  await page.type("input#age", "1");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (elem) => elem.textContent);
  expect(finalText).toBe("Belen (1 years old)");
});
