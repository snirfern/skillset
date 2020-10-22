import React from "react";
import "./Message.css";
const md5 = require("md5");
export default function Message({ post }) {
  const hash = md5(post.email);
  let msg = "";
  if (post.message) {
    if (post.message.length < 10) msg = post.message;
    else msg = post.message.toString().substring(0, 10) + " ...";
  }

  return (
    <div className="message_container" key={post.id}>
      <div className="gravatar_image">
        <img
          alt="gravatar"
          className="gravatar_img"
          src={"http://www.gravatar.com/avatar/" + hash}
        />
      </div>
      <div className="message_content">
        <div className="message_title">{post.email ? post.email : ""}</div>
        <div className="message_text">{msg ? msg : ""}</div>
      </div>{" "}
    </div>
  );
}
