export class PostModel {
  constructor(post) {
    this.postIgID = post.postIgID;
    this.title = post.title;
    this.desc = post.desc;
    this.img = post.img;
    this.imgText = post.imgText;
    this.location = post.location;
    this.startEventTime = post.startEventTime;
    this.endEventTime = post.endEventTime;
    this.igLink = post.igLink;
    this.accountName = post.accountName;
    this.createTime = post.createTime;
    this.translated = post.translated;
  }
}
