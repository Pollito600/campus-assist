// Request.js
import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import "../styles/Request.css";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const imageServices = ["Basic Reparation", "Assembly Furniture"];

const Request = () => {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };

  const handleImageChange = (event) => { 
    setSelectedImage(event.target.files[0]);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    // Reset the file input value to clear the selected file name
    document.getElementById("file-input").value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const db = getDatabase(app);
    const storage = getStorage(app);

    const newPost = push(ref(db, "Requests/Posts"));

    try {
      const dateToRecord = format(selectedDate, "MM/dd/yy hh:mm a");

      let data = {
        Service: selectedService,
        Details: details,
        Payment: payment,
        Date: dateToRecord,
      };

      if (imageServices.includes(selectedService) && selectedImage) {
        const imageRef = storageRef(storage, `Images/${uuidv4()}.jpg`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);
        data.Picture = imageUrl;
      }

      await set(newPost, data);

      alert("Data saved successfully");

      // Clear all fields after successful submission
      setSelectedService("");
      setDetails("");
      setPayment("");
      setSelectedDate(null);
      setSelectedImage(null);
      // Reset the file input value to clear the selected file and its name
      const fileInput = document.getElementById("file-input");
      fileInput.value = "";
      fileInput.type = "";
      fileInput.type = "file";
    } catch (error) {
      alert("Error: " + error.message);
    }
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
        >
          <MenuItem value="Moving">Moving</MenuItem>
          <MenuItem value="Basic Reparation">Basic Reparation</MenuItem>
          <MenuItem value="Technical Support">Technical Support</MenuItem>
          <MenuItem value="Assembly Furniture">Assembly Furniture</MenuItem>
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
      
      <input
        id="file-input"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {selectedImage && (
        <Button variant="outlined" onClick={handleClearImage}>
          Clear Image
        </Button>
      )}
      <p>   </p>
      <TextField
        label="Willing to Pay"
        fullWidth
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      />
      <p>   </p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time"
      />
      <p>   </p>
      <Button variant="contained" onClick={handleSubmit}>
        Submit Request
      </Button>
      
    </div>
  );
};

export default Request;
