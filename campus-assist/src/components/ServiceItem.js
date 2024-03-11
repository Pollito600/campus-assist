// ServiceItem.js
import React from "react";
import { Link } from "react-router-dom";

function ServiceItem({ image, name }) {
  return (
    <div className="ServiceItem">
      {/* Use Link component to wrap the image and set "to" attribute to the request-service page path */}
      <Link to="/requestservice">
        <div style={{ backgroundImage: `url('${image}')` }}> </div>
      </Link>
      <h1>{name}</h1>
    </div>
  );
}

export default ServiceItem;
