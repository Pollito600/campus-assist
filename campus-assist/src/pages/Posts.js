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
          progress: 0, // Add progress to each post
          accepted: false, // Add accepted flag to each post
          onTrack: false // Add onTrack flag to each post
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
    setFilteredPosts(filterPosts(value, posts));
  };

  const filterPosts = (query, postsArray = []) => {
    return postsArray.filter(
      (post) =>
        (post.Service?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (post.Date?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (post.Payment?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (post.NetId?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        (post.UserName?.toLowerCase().includes(query.toLowerCase()) ?? false)
    );
  };

  const handleAccept = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, progress: 33, accepted: true };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(filterPosts(searchQuery, updatedPosts));
  };

  const handleOnTrack = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.accepted) {
        return { ...post, progress: 66, onTrack: true };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(filterPosts(searchQuery, updatedPosts));
  };

  const handleCompleted = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.onTrack) {
        return { ...post, progress: 100, onTrack: false };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(filterPosts(searchQuery, updatedPosts));
  };

  const handleCancel = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, progress: 0, accepted: false };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(filterPosts(searchQuery, updatedPosts));
  };

  function getColor(progress) {
    if (progress < 40) {
      return "#2ecc71";
    } else if (progress < 70) {
      return "#2ecc71";
    } else {
      return "#2ecc71";
    }
  }

  return (
    <div>
      <h1 className="post-title">Posts</h1>
      <input
        type="text"
        className="post-search-bar"
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
            {/* Progress bar */}
            <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${post.progress}%`, backgroundColor: getColor(post.progress) }}></div>
              </div>
              <div className="progress-bar-label">{post.progress}%</div>
              {/* Action buttons 
              <div className="button-container">*/}
              <button onClick={() => handleAccept(post.id)} disabled={post.accepted || post.onTrack}>Accept</button>
              <button onClick={() => handleOnTrack(post.id)} disabled={!post.accepted || post.progress === 100}>On-Track</button>
              <button onClick={() => handleCompleted(post.id)} disabled={!post.onTrack}>Completed</button>
              <button onClick={() => handleCancel(post.id)}>Cancel</button>
              {/*</div>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
