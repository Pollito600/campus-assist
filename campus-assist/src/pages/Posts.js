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
          
            <div className="image-container">
              {post.Picture && <img src={post.Picture} alt="Post" className="post-image" />}
            </div>
            <h3 className="service-title">{post.Service}</h3>
            <p className="details">{post.Details}</p>
            <div className="payment-date-container">
              <p className="payment">${post.Payment}</p>
              < p className="date">{post.Date}</p>
            </div>
            <p className="netid">Contact me in Teams/NetID:
             <a href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fentity%2Fd3d1be68-066c-4967-a74b-9edcf902dcfb%2FteamsDashboard%3Fcontext%3D%257B%2522subEntityId%2522%3A%2522SourceData-%2Credirected-from%3D%253EAD_Google_PROSPECTS_All-Other-Countries__Brand-Microsoft_RSA%2522%257D%26src%3Dadwords%26utm_campaign%3DBrand_Microsoft_AllCountries%26utm_medium%3Dppc%26utm_source%3Dadwords%26utm_term%3Dmicrosoft%2520t%25C3%25A9ams%26hsa_net%3Dadwords%26hsa_ad%3D692255743195%26hsa_kw%3Dmicrosoft%2520t%25C3%25A9ams%26hsa_mt%3Db%26hsa_src%3Dg%26hsa_cam%3D15060775870%26hsa_ver%3D3%26hsa_acc%3D4570815156%26hsa_tgt%3Dkwd-1205343431894%26hsa_grp%3D146854353822%26gad_source%3D1%26gclid%3DCj0KCQjw8pKxBhD_ARIsAPrG45k1stY9f8MVtc74piYfpxQSvKSaqN5agLq-vbh2kdCvWfeMH8cJb5AaAgUGEALw_wcB&type=entity&deeplinkId=f7115a86-3e8a-4180-9d1c-3cb7b4f16e56&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true#" target="blank">{post.NetId}</a> </p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
