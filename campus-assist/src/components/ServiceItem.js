import React from "react";
import PropTypes from "prop-types"; 
import { Link } from "react-router-dom";

function ServiceItem({ image, name, description }) {
  return (
    <div className="ServiceItem">
      {/* Link the images to the request-service page path by clicking on the image*/}
      <Link to="/requestservice">
        {/* Use a div with background image style */}
        <div style={{ backgroundImage: `url('${image}')`}} title={description}> {/*Tooltip description*/}      
        </div>
      
        <div className="name">
            <h2>{name}</h2>
        </div>
        </Link>
    </div>
  );
}

// Add prop type validation for image, name, and description
ServiceItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ServiceItem;
