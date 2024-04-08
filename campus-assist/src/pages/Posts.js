// Posts.js
import React, { useState, useEffect } from "react";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/Posts.css"; // Import CSS file for post styling

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const postsRef = ref(db, "Requests/Posts");

    // Listen for changes in the posts
    onValue(postsRef, (snapshot) => {
      const postData = snapshot.val();
      if (postData) {
        const postList = Object.keys(postData).map((key) => ({
          id: key,
          ...postData[key],
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });

    // Cleanup function to remove the listener
    return () => {
      // Detach listener here
    };
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.Service}</h3>
            <p>{post.Details}</p>
            <p>{post.Payment}</p>
            <p>{post.Date}</p>
            {post.Picture && <img src={post.Picture} alt="Post" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
