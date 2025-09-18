require("dotenv").config();
const cron = require("node-cron");
const moment = require("moment-timezone");
const puppeteer = require("puppeteer");
const postModel = require("./models/postModel");
const db = require("./db/pool");
const { search_value } = require("./db/db_actions");
const { imgToText, translatePosts } = require("./eventTranslate");

async function igLogin(page) {
  console.log("login");
  await page.goto("https://www.instagram.com");
  await page.type('input[name="username"]', process.env.ig_username);
  await page.type("input[name='password']", process.env.ig_password);
  await page.click("button[type='submit']");
  await page.waitForNavigation();
}

async function getPosts(accountNames) {
  console.log("getPosts");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const posters = [];
  page.on("response", async (res) => {
    if (
      res.request().method() === "POST" &&
      res.url().includes("https://www.instagram.com/graphql/query")
    ) {
      try {
        const item = JSON.parse(await res.text());
        if (
          item["data"] &&
          "xdt_api__v1__feed__user_timeline_graphql_connection" in item["data"]
        ) {
          const posts = await item["data"][
            "xdt_api__v1__feed__user_timeline_graphql_connection"
          ]["edges"];
          for (post of posts) {
            post = post["node"];
            username = post["user"]["username"];
            posters.push(
              new postModel({
                postIgID: post["code"],
                desc: post["caption"]["text"],
                img: post["image_versions2"]["candidates"][0]["url"],
                igLink:
                  "https://www.instagram.com/" +
                  username +
                  "/p/" +
                  post["code"],
                accountName: username,
                creatTime: Date.now(),
                translated: 0,
              })
            );

            //add to db
            const find_post = await search_value(
              "olo_post",
              "poster_ig_id",
              post["code"]
            );

            if (find_post == 0) {
              const add_poster =
                "INSERT INTO olo_post(poster_ig_id, event_desc, img_url, ig_link, account_name,post_create_time) VALUES ($1,$2,$3,$4,$5,$6)";
              db.query(
                add_poster,
                [
                  post["code"],
                  post["caption"]["text"],
                  post["image_versions2"]["candidates"][0]["url"],

                  "https://www.instagram.com/" +
                    username +
                    "/p/" +
                    post["code"],

                  username,
                  moment
                    .tz(post["taken_at"] * 1000, "America/Toronto")
                    .format(),
                ],
                (err, res) => {
                  if (!err) {
                    console.log("add successfullt", res);
                  } else {
                    console.log("err happens between", err);
                    return false;
                  }
                }
              );
            } else {
              console.log("post with id", post["code"], "is in db already");
            }

            // console.log("finish");
          }
          // console.log("hey", posters);
        }
      } catch (err) {
        console.log("find err", err);
        return false;
      }
    }
  });

  await igLogin(page).then(() => {});
  for (accountName of accountNames) {
    await page.goto("https://www.instagram.com/" + accountName);
    console.log("logged in");
  }

  await browser.close();
  console.log("out");
  return true;
}

// getPosts(["uwcsclub", "uwaterloowics", "uwaterloodsc", "waterloomath"]);

cron.schedule("16 13 18 * *", async () => {
  console.log("start");
  if (
    await getPosts([
      "uwcsclub",
      "uwaterloowics",
      "uwaterloodsc",
      "waterloomath",
      "wits.uwo",
    ])
  ) {
    console.log("querried successfully");
    await translatePosts();
    console.log("after translation");
  }
});
