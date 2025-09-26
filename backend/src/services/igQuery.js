import cron from "node-cron";
import moment from "moment-timezone";
import puppeteer from "puppeteer";
import { PostModel } from "../models/postModel.js";
import { db } from "../db/pool.js";
import { search_value } from "../db/db_actions.js";
import { imgToText, translatePosts } from "./eventTranslate.js";

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
    console.log(res.request().method());
    if (
      res.request().method() === "POST" &&
      res.url().includes("https://www.instagram.com/graphql/query")
    ) {
      console.log("in", res.request().method());
      try {
        const item = JSON.parse(await res.text());
        if (
          item["data"] &&
          "xdt_api__v1__feed__user_timeline_graphql_connection" in item["data"]
        ) {
          const posts = await item["data"][
            "xdt_api__v1__feed__user_timeline_graphql_connection"
          ]["edges"];
          for (let post of posts) {
            console.log(
              "find post",
              post,
              post["node"]["user"],
              post["node"]["user"]["username"]
            );
            post = post["node"];
            const username = post["user"]["username"];
            posters.push(
              new PostModel({
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
              console.log("new post", post["caption"]["text"]);
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
          console.log("hey", posters);
        }
      } catch (err) {
        console.log("find err", err);
        return false;
      }
    }
  });

  await igLogin(page).then(() => {});
  for (let accountName of accountNames) {
    console.log("get into", accountName, accountNames);
    await page.goto("https://www.instagram.com/" + accountName, {
      waitUntil: "networkidle2", //wait until the website is almost idle to interact with it
    });
    console.log("to new link");
  }

  await browser.close();
  console.log("out");
  return true;
}

// getPosts(["uwcsclub", "uwaterloowics", "uwaterloodsc", "waterloomath"]);

cron.schedule("43 15 26 * *", async () => {
  //04 3 26 * *
  console.log("start");
  if (
    await getPosts([
      "uwcsclub",
      "uwaterloowics",
      "uwaterloodsc",
      "waterloomath",
      "wits.uwo",
      "socratica.info",
    ])
  ) {
    console.log("querried successfully");
    await translatePosts();
    console.log("after translation");
  }
});
