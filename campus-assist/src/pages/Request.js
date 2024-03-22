// Request.js
import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Request.css";

const Request = ({ addPost }) => {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const newPost = {
      selectedService,
      details,
      payment,
      selectedDate
    };

    // Call the addPost function passed from the parent component
    addPost(newPost);

    // Clear the form fields after submission
    setSelectedService("");
    setDetails("");
    setPayment("");
    setSelectedDate(null);
  };

  return (
    <div className="centered-container">
      <h1>Service Request</h1>
      <FormControl fullWidth>
        <InputLabel id="service-label">Select Service</InputLabel>
        <Select
          labelId="service-label"
          id="service-select"
          value={selectedService}
          label="Select Service"
          onChange={(e) => setSelectedService(e.target.value)} 
        > {/*Drop down menu */}
          <MenuItem value="moving">Moving</MenuItem>
          <MenuItem value="basic-reparation">Basic Reparation</MenuItem>
          <MenuItem value="technical-support">Technical Support</MenuItem>
          <MenuItem value="assembly-furniture">Assembly Furniture</MenuItem>
        </Select>
      </FormControl>
      <p>   </p> {/*Box to write down request details */}
      <TextField
        label="Details"
        multiline
        rows={4}
        fullWidth
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <p>   </p>
      <TextField
        label="Willing to Pay"
        fullWidth
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      />
      <p>   </p> {/*Calendar day/time selection */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Service Date and Time"
      />
      <p>   </p>
      <Button variant="contained" onClick={handleSubmit}>
        Submit Request
      </Button>
    </div>
  );
};

// Define prop types for addPost function
Request.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default Request;
