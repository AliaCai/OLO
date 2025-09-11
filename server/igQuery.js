require("dotenv").config();

const puppeteer = require("puppeteer");
const postModel = require("./models/postModel");

async function igLogin(page, accountName) {
  await page.goto("https://www.instagram.com");
  await page.type('input[name="username"]', process.env.ig_username);
  await page.type("input[name='password']", process.env.ig_password);
  await page.click("button[type='submit']");
  await page.waitForNavigation();
}

async function getPosts(accountName) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var count = 0;
  const posters = [];
  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes("https://www.instagram.com/graphql/query")) {
      const item = JSON.parse(await res.text());
      if (
        item["data"] &&
        "xdt_api__v1__feed__user_timeline_graphql_connection" in item["data"]
      ) {
        const posts = await item["data"][
          "xdt_api__v1__feed__user_timeline_graphql_connection"
        ]["edges"];
        posts.forEach((post) => {
          post = post["node"];
          posters.push(
            new postModel({
              postIgID: post["code"],
              desc: post["caption"]["text"],
              img: post["image_versions2"]["candidates"][0]["url"],
              igLink:
                "https://www.instagram.com/" +
                accountName +
                "/p/" +
                post["code"],
              accountName: accountName,
              creatTime: Date.now(),
              translated: 0,
            })
          );

          //   console.log(
          //     "\n\n\nfind",
          //     count,
          //     post["code"],
          //     post["caption"]["text"],
          //     post["image_versions2"]["candidates"][0]["url"]
          //   );
          count += 1;
        });
        console.log("hey", posters);
      }
    }
  });

  await igLogin(page, accountName);

  page.goto("https://www.instagram.com/" + accountName);
  console.log("in");
}

//login first -> acc page -> get wanted info
getPosts("uwcsclub");
