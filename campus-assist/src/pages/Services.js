import React from "react";
import { ServiceList } from "../helpers/ServiceList";
import ServiceItem from "../components/ServiceItem";
import "../styles/Service.css";

function Service() {
  return (
    /* Showing different services from the service list */
    <div className="service">
      <h1 className="serviceTitle">Our Services</h1>
      <div className="serviceList">
        {ServiceList.map((serviceItem, key) => {
          return (
            <ServiceItem
              key={key}
              image={serviceItem.image}
              name={serviceItem.name}
              price={serviceItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Service;
