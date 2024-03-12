// ServiceItem.js
import React from "react";
import { Link } from "react-router-dom";

function ServiceItem({ image, name }) {
  return (
    <div className="ServiceItem">
      {/* Link the images to the request-service page path by clicking on the image*/}
      <Link to="/requestservice">
        <div style={{ backgroundImage: `url('${image}')` }}> </div>
      </Link>
      <h1>{name}</h1>
    </div>
  );
}

export default ServiceItem;
