// Request.js
import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Request.css'; // Import the CSS file for styling

const Request = () => {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    // Implement your logic to handle the form submission
    console.log("Service:", selectedService);
    console.log("Details:", details);
    console.log("Payment:", payment);
    console.log("Selected Date:", selectedDate);
    // Add your logic to submit the request
  };

  return (
    <div className="centered-container"> {/* Add a container with centered styling */}
      <h1>Service Request</h1>
      <FormControl fullWidth>
        <InputLabel id="service-label">Select Service</InputLabel>
        <Select
          labelId="service-label"
          id="service-select"
          value={selectedService}
          label="Select Service"
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <MenuItem value="moving">Moving</MenuItem>
          <MenuItem value="basic-reparation">Basic Reparation</MenuItem>
          <MenuItem value="technical-support">Technical Support</MenuItem>
          <MenuItem value="assembly-furniture">Assembly Furniture</MenuItem>
        </Select>
      </FormControl>
      <p>   </p>
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
        label="Payment"
        fullWidth
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      />
      <p>   </p>
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

export default Request;
