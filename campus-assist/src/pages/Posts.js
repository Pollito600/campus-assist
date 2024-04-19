import React, { useState, useEffect } from "react";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/Posts.css"; // Import CSS file for post styling

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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
        setFilteredPosts(postList); // Initialize filtered posts with all posts
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    });

    // Cleanup function to remove the listener
    return () => {
      // Detach listener here
    };
  }, []);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterPosts(value);
  };

  // Function to filter posts based on search query
  const filterPosts = (query) => {
    const filtered = posts.filter(
      (post) =>
        post.Service.toLowerCase().includes(query.toLowerCase()) ||
        post.Date.toLowerCase().includes(query.toLowerCase()) ||
        post.Payment.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* Search bar */}
      <input
        type="text"
        className="search-bar" // Apply search-bar class
        placeholder="Search Posts by Service, Date, or Amount"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.Service}</h3>
            <p>{post.Details}</p>
            <p>{post.Payment}</p>
            <p>{post.Date}</p>
            <div className="image-container">
              {post.Picture && <img src={post.Picture} alt="Post" className="post-image" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
