// Request.js
import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const handleDateChange = (date) => { setSelectedDate(date);
  };
  const handleImageChange = (event) => { setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const db = getDatabase(app);
    const storage = getStorage(app); // Initialize Firebase Storage

    const newPost = push(ref(db, "Requests/Posts"));

    try {
      const dateToRecord = selectedDate.toISOString();// convert to ISO string

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
      //addPost(newPost);

      // Clear form fields
      setSelectedService("");
      setDetails("");
      setPayment("");
      setSelectedDate(null);
      setSelectedImage(null);
    } catch (error) {
      alert("Error: ", error.message);
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
          type="file"
          label="Upload Picture"
          onChange={handleImageChange}
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
//Request.propTypes = {
  //addPost: PropTypes.func.isRequired,
//};

export default Request;
