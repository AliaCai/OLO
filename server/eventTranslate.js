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

module.exports = {
  imgToText: async function (img) {
    try {
      const text = await tesseract.recognize(img, config);
      return text;
    } catch (err) {
      return -1;
    }
  },

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

  translatePosts: async function () {
    const posts = await search_value("olo_post", "is_translate", 0);
    if (posts.length >= 1) {
      for (post of posts) {
        // console.log("??", posts);
        post.img_text = await imgToText(post.img_url);

        // console.log(
        //   "hey",

        //   post.img_text,
        //   post.img_text.replace("\n", "")
        // );

        const ans = await ollama.chat({
          model: "llama3.1",
          messages: [
            {
              role: "user",
              content: ` find event name, startdateTime(YYYY-MM-DD HH:mm)(24h), endDateTime(YYYY-MM-DD HH:mm)(24h) and location from ${post.img_text} and ${post.event_desc}. return an array where it contains event name, startDateTime, endDateTime and location. StartDateTime and endDateTime can take reference from the time ${post.post_create_time} when it is necessary and if the year is not specified, choose 2025. If you cannot find information in the provided text, return TBD. Do not invent event name, startDateTime, endDateTime or locations.” JUST give me THE ONLY ARRAY BRACKET IN [] with 4 string elements in the required format (if given startdateTime and endDateTime is not in the (YYYY-MM-DD HH:mm)(24h) format, do the conversion, and not include any things not included in the format), no comments, no any additional stuff.`,
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
  },
};

// translatePosts().then((hey) => {
//   console.log("updated");
// });
