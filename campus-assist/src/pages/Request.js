// Request.js
import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material"; // Import TextField component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'; // Import format function from date-fns
import "../styles/Request.css";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid"; // Generate unique IDs for image storage
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const imageServices = ["basic-reparation", "assembly-furniture"]; // Services requiring pictures

const Request = () => {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };

  const handleImageChange = (event) => { 
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const db = getDatabase(app);
    const storage = getStorage(app); // Initialize Firebase Storage

    const newPost = push(ref(db, "Requests/Posts"));

    try {
      const dateToRecord = format(selectedDate, "MM/dd/yy hh:mm a"); // Format date and time

      let data = {
        Service: selectedService,
        Details: details,
        Payment: payment,
        Date: dateToRecord,
      };

      // If a picture is required and selected, handle its upload
      if (imageServices.includes(selectedService) && selectedImage) {
        const imageRef = storageRef(storage, `Images/${uuidv4()}.jpg`); // Reference to the image in Firebase Storage
        await uploadBytes(imageRef, selectedImage); // Upload image to Firebase Storage
        const imageUrl = await imageRef.getDownloadURL(); // Get the download URL of the uploaded image
        data.Picture = imageUrl; // Store the image URL in the post
      }

      await set(newPost, data);

      alert("Data saved successfully");

      // Clear form fields
      setSelectedService("");
      setDetails("");
      setPayment("");
      setSelectedDate(null);
      setSelectedImage(null);
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
        > {/*Drop down menu */}
          <MenuItem value="Moving">Moving</MenuItem>
          <MenuItem value="Basic Reparation">Basic Reparation</MenuItem>
          <MenuItem value="Technical Support">Technical Support</MenuItem>
          <MenuItem value="Assembly Furniture">Assembly Furniture</MenuItem>
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
      
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
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
        timeFormat="hh:mm aa" // Format time with AM/PM
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa" // Display selected date and time with AM/PM
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
