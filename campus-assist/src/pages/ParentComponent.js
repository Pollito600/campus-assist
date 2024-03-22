// ParentComponent.js
import React, { useState } from "react";
import Posts from "./Posts";
import Request from "./Request";

const ParentComponent = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <Posts posts={posts} />
      <Request addPost={addPost} /> {/* Pass addPost function as a prop */}
    </div>
  );
};

export default ParentComponent;
