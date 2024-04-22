import React, { useState, useEffect } from "react";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import "../styles/Posts.css"; // Import CSS file for post styling

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
 //const [progress, setProgress] = useState(0); // Progress bar state

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
          postProgress: 0, // Initial progress for each post
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

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterPosts(value);
  };

  const filterPosts = (query) => {
    const filtered = posts.filter(
      (post) =>
        post.Service.toLowerCase().includes(query.toLowerCase()) ||
        post.Date.toLowerCase().includes(query.toLowerCase()) ||
        post.Payment.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleAccept = (postId) => {
    console.log("Accept button clicked for post:", postId);
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, postProgress: 33 } : post
    );
    setPosts(updatedPosts);
  };
  
  const handleOnTrack = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, postProgress: 67 } : post
    );
    setPosts(updatedPosts);
  };
  
  const handleCompleted = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, postProgress: 100 } : post
    );
    setPosts(updatedPosts);
  };
  
  const handleCancel = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, postProgress: 0 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Posts by Service, Date, or Amount"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div className="post" key={post.id}>
            <div className="image-container">
              {post.Picture && <img src={post.Picture} alt="Post" className="post-image" />}
            </div>
            <h2 className="service-title">{post.Service}</h2>
            <p className="details">{post.Details}</p>
            <div className="username-netid">
              <p className="username"><strong>Name: </strong>{post.UserName}</p>
              <p className="netid"><strong>Teams/NetID: </strong> <a href="https://teams.microsoft.com/" target="blank">{post.NetId}</a> </p>
            </div>
            <div className="payment-date-container">
              <p className="payment"><strong>$ </strong>{post.Payment}</p>
              <p className="date"><strong>Date/Time: </strong>{post.Date}</p>
            </div>
            {/* Selection circle */}
            <div className="selection-circle"></div>
            {/* Progress bar */}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${post.postProgress}%` }}></div>
            </div>
            {/* Action buttons */}
            <div className="button-container">
              <button onClick={() => handleAccept(post.id)} disabled={post.postProgress > 0}>
                Accept
              </button>
              <button onClick={() => handleOnTrack(post.id)} disabled={post.postProgress < 33 || post.postProgress >= 67}>
                On-Track
              </button>
              <button onClick={() => handleCompleted(post.id)} disabled={post.postProgress !== 67}>
                Completed
              </button>
              <button onClick={() => handleCancel(post.id)} disabled={post.postProgress === 0}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
