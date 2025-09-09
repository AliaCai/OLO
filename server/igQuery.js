const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("https://www.instagram.com/graphql/query")) {
      console.log("lana day ray", JSON.stringify(await res.json()));
    }
  });

  await page.goto("https://www.instagram.com/");

  //   await browser.close();
})();
