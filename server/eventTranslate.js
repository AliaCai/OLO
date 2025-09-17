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

// const uwcsc = [
//   {
//     postIgID: "DObYeZMDWdG",
//     title: undefined,
//     desc:
//       "🗳 The CS Club will be holding elections for the Fall 2025 term on Thursday, September 11th from 5:30 - 7:00 PM in DC 1302.\n" +
//       "\n" +
//       "👉 Come to learn more about CSC, sign up for membership, and vote on our new execs! The President, Vice-President, Assistant Vice-President, and Treasurer will be elected, and the Systems Administrator will be appointed.\n" +
//       "\n" +
//       "✋ If you’d like to run for any of these positions or nominate someone, you can send an email to cro@csclub.uwaterloo.ca; present your nomination in-person to the CRO, Ohm Patel; or write your name on the whiteboard in the CSC office (MC 3036/3037). Nominees will be reached out to for their platforms.\n" +
//       "\n" +
//       "❓ If you have any questions about elections, please email cro@csclub.uwaterloo.ca.",
//     img: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/544878279_18056262965451410_3209650312552123614_n.jpg?stp=dst-jpg_e35_p720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwOTF4MTEwMi5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QH--vMwc-tIVyA_8KdW9Yo45WjHXzbP92M7bd-nMmUZdBr5e9uZb02bRdqNbi3MbzA&_nc_ohc=wwe7eTKEl6gQ7kNvwHO-HOz&_nc_gid=lUklVnDjdrBsZWQ1_EqTBA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzcxODY3MzU1OTA3MDc5NTU5MA%3D%3D.3-ccb7-5&oh=00_AfZH7yXAbtga-JHOFLXXrEsoWURZYQFGcKtEpx4wfFJC6w&oe=68C79AD8&_nc_sid=7a9f4b",
//     imgText: undefined,
//     location: undefined,
//     startEventTime: undefined,
//     endEventTime: undefined,
//     igLink: "https://www.instagram.com/uwcsclub/p/DObYeZMDWdG",
//     accountName: "uwcsclub",
//     creatTime: 1757533242099,
//     translated: 0,
//   },
//   {
//     postIgID: "DMPAODytIq0",
//     title: undefined,
//     desc: "🚀 Interested in a career in the software industry?Join us and Engsoc for an exclusive on-campus event packed with tips on acing interviews, mastering data structures and algorithms, and thriving in your early software career!📅 Saturday, July 19🕔 5:00 - 7:00 PM 📍 E7 4053 (UPDATED ROOM)Whether you’re prepping for co-op or eyeing your dream role in tech, this event is for you! 🧑‍💻🔗 Register in the link: https://bit.ly/uwdsa2025",
//     img: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/521319619_18051120230451410_1410477958313669120_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QH--vMwc-tIVyA_8KdW9Yo45WjHXzbP92M7bd-nMmUZdBr5e9uZb02bRdqNbi3MbzA&_nc_ohc=w5p573W42cMQ7kNvwEgwdJS&_nc_gid=lUklVnDjdrBsZWQ1_EqTBA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY3OTE2MDM4NjcyOTU3NzE0MA%3D%3D.3-ccb7-5&oh=00_Afaatc4rWHn_lZaoIAdVXeM0_BeTuGU2toljSxBoR42glQ&oe=68C78B0E&_nc_sid=7a9f4b",
//     imgText: undefined,
//     location: undefined,
//     startEventTime: undefined,
//     endEventTime: undefined,
//     igLink: "https://www.instagram.com/uwcsclub/p/DMPAODytIq0",
//     accountName: "uwcsclub",
//     creatTime: 1757533242100,
//     translated: 0,
//   },
//   {
//     postIgID: "DMBGOBXuUiA",
//     title: undefined,
//     desc:
//       "Come join us for a cozy bonfire at CSC’s End of Term event in collaboration with WiCS, DSC, and Tech+🌙✨\n" +
//       "\n" +
//       "Featuring FREE s’mores, burgers, and fun games, it’s the perfect chance to relax before exams and celebrate the end of the term. Grab your friends and let’s light up the night~!\n" +
//       "\n" +
//       "\n" +
//       "📍 Location: Columbia Lake Fire Pit 1",
//     img: undefined,
//     imgText: undefined,
//     location: undefined,
//     startEventTime: undefined,
//     endEventTime: undefined,
//     igLink: "https://www.instagram.com/uwcsclub/p/DMBGOBXuUiA",
//     accountName: "uwcsclub",
//     creatTime: 1757533242100,
//     translated: 0,
//   },
// ];

async function imgToText(img) {
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
  const posts = await search_value("olo_post", "is_translate", 1);
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
          console.log(
            "date is",
            Date.now(),
            new Date(),
            new Date().toISOString().replace("T", " ").replace("Z", " ")
          );
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
}

translatePosts().then((hey) => {
  console.log("updated");
});
