// Posts.js
import React from "react";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>Request Details</h2>
          <p>Service: {post.selectedService}</p>
          <p>Details: {post.details}</p>
          <p>Payment: {post.payment}</p>
          <p>Selected Date: {post.selectedDate.toString()}</p>
          <button>Accept Request</button>
          <button>Mark as Completed</button>
        </div>
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
