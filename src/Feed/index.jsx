import React, { useEffect, useState } from "react";
import "./index.css";
import CreateIcon from "@mui/icons-material/Create";
import { InputOption } from "../InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import { Post } from "../Post";
import { db } from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: user?.displayName,
      description: user?.email,
      message: input,
      photoUrl: user?.photoUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form action="">
            <input
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption title={"Photo"} Icon={ImageIcon} color={"#70b5f9"} />
          <InputOption
            title={"Video"}
            Icon={SubscriptionsIcon}
            color={"#e7a33e"}
          />
          <InputOption title={"Event"} Icon={EventNoteIcon} color={"#c0cbcd"} />
          <InputOption
            title={"Write Article"}
            Icon={CalendarViewDayIcon}
            color={"#7fc15e"}
          />
        </div>
      </div>

      {/**Posts */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message } }, index) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export { Feed };
