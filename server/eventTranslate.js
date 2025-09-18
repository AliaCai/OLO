const postModel = require("./models/postModel");
const tesseract = require("node-tesseract-ocr");
// const chrono = require("chrono-node");
// const nlp = require("compromise/two");
// const DateTime = require("luxon");
const { default: ollama } = require("ollama/browser");
const db = require("./db/pool");
const { search_value } = require("./db/db_actions");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

async function imgToText(img) {
  console.log("imgToText -");
  try {
    const text = await tesseract.recognize(img, config);
    return text;
  } catch (err) {
    return -1;
  }
}

// async function translatePosts(posts) {
//   for (poster of posts) {
//     poster.imgText = await imgToText(poster.img);
//     console.log(
//       "imgDate is",

//       chrono.parse(poster.imgText)[0] && chrono.parse(poster.imgText)[0].start
//         ? chrono.parse(poster.imgText)[0].start.date()
//         : null,
//       chrono.parse(poster.imgText)[0] && chrono.parse(poster.imgText)[0].end
//         ? chrono.parse(poster.imgText)[0].end.date()
//         : null
//     );
//     console.log(
//       "desDate is",
//       chrono.parse(poster.desc)[0] && chrono.parse(poster.desc)[0].start
//         ? chrono.parse(poster.desc)[0].start.date()
//         : null,
//       chrono.parse(poster.desc)[0] && chrono.parse(poster.desc)[0].end
//         ? chrono.parse(poster.desc)[0].end.date()
//         : null
//     );
//   }
// }

// async function translatePosts(posts) {
//   for (poster of posts) {
//     poster.imgText = await imgToText(poster.img);
//     let imgDate = nlp(poster.imgText).match("#Date").text();
//     let descDate = nlp(poster.desc).match("#Date").text();
//     console.log("hey what is date", [imgDate, descDate], "hey what is date", [
//       chrono.parse(poster.imgText)[0] && chrono.parse(poster.imgText)[0].text,
//       chrono.parse(poster.imgText)[0] && chrono.parse(poster.imgText)[0].text,
//     ]);

//     let imgPlace = nlp(poster.imgText).match("#Place").text(); //  doc.match('(DC|E7|MC) #Value').tag('Place', 'building-room')

//     let descPlace = nlp(poster.desc).match("#Place").text();
//     console.log("hey what is location", imgPlace, descPlace);
//   }
// }

async function translatePosts() {
  console.log("translate Posts");
  const posts = await search_value("olo_post", "is_translate", 0);
  if (posts.length >= 1) {
    for (post of posts) {
      // console.log("??", posts);
      post.img_text = await imgToText(post.img_url);

      console.log("hey", post.img_text.replace("\n", ""));

      const ans = await ollama.chat({
        model: "llama3.1",
        messages: [
          {
            role: "user",
            content: `Extract the event name, startDateTime (YYYY-MM-DD HH:mm, 24h), endDateTime (YYYY-MM-DD HH:mm, 24h), and location from ${post.img_text} and ${post.event_desc}. Return the result only as an array with four string elements in this exact order: [event name, startDateTime, endDateTime, location].
                    If the year is missing, assume 2025.
                    All dates/times must be converted to YYYY-MM-DD HH:mm (24-hour). Do not use any other formats even with more detials and no dot include any not asked word.

                    If times are unclear, use ${post.post_create_time} as a reference.

                    If any field is not found, use "TBD".

                    Convert all dates/times into the required format.

                    Do not add comments, explanations, or extra text — only return the array.`,
          },
        ],
      });

      const detail = ans.message.content.slice(2, -2).split('", "');
      console.log(
        "cra yet",
        ans.message.content,
        detail,
        detail[0] + detail[1]
      );

      //add to db

      const update_post =
        "UPDATE olo_post SET event_title=$1, img_text=$2, location=$3, event_start_time=$4, event_end_time=$5, is_translate=$6, update_time=$7 WHERE poster_ig_id=$8";
      db.query(
        update_post,
        [
          detail[0] != "TBD" ? detail[0] : post.account_name,
          post.img_text,
          detail[3] != "null" ? detail[3] : null,
          detail[1] != "TBD" ? detail[1] : null,
          detail[2] != "TBD" ? detail[2] : null,
          1,
          new Date().toISOString().replace("T", " ").replace("Z", " "),
          post.poster_ig_id,
        ],
        (err, res) => {
          // console.log(
          //   "date is",
          //   Date.now(),
          //   new Date(),
          //   new Date().toISOString().replace("T", " ").replace("Z", " ")
          // );
          if (!err) {
            console.log("add successfullt", res);
          } else {
            console.log("err happens between", err);
          }
        }
      );

      // post.event_title = detail[0];
      // post.evnt_start_time = detail[1];
      // post.event_end_time = detail[2];
      // post.location = detail[3];
      // if (post.startEventTime) {
      //   post.is_translate = 1;
      // }
    }
  }
  return true;
}

// translatePosts().then((hey) => {
//   console.log("updated");
// });

module.exports = { imgToText, translatePosts };
