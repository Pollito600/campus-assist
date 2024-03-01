import React from "react";

function ServiceItem({ image, name }) {
  return (
    <div className="ServiceItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      
    </div>
  );
}

export default ServiceItem;
