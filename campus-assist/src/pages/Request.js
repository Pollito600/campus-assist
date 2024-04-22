// Request.js
import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import "../styles/Request.css";
import { app } from "../FirebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
//import { v4 as uuidv4 } from "uuid";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const Request = () => {
  const [selectedService, setSelectedService] = useState("");
  const [details, setDetails] = useState("");
  const [netid, setNetId] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the uploaded image URL

  const handleDateChange = (date) => { 
    setSelectedDate(date);
  };

  const handleImageChange = (event) => { 
    setSelectedImage(event.target.files[0]);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImageUrl(null); // Clear the image URL state

    document.getElementById("file-input").value = ""; // Reset the file input value to clear the selected file name
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
        NetId: netid,
        Payment: payment,
        Date: dateToRecord,
      };
  
      
        try {
          const imageRef = storageRef(storage, `Images/${selectedImage.name}`);
          await uploadBytes(imageRef, selectedImage);
          const uploadedImageUrl = await getDownloadURL(imageRef);
          data.Picture = uploadedImageUrl;
          setImageUrl(uploadedImageUrl); // Update the state with the uploaded URL for verification
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
        }
      
      await set(newPost, data);
      console.log("Data saved successfully"); // Log success message
  
      alert("Data saved successfully");
  
      // Clear all fields after successful submission
      setSelectedService("");
      setDetails("");
      setNetId("");
      setPayment("");
      setSelectedDate(null);
      setSelectedImage(null);
      setImageUrl(null);


      // Reset the file input value to clear the selected file and its name
      const fileInput = document.getElementById("file-input");
      fileInput.value = "";
      fileInput.type = "";
      fileInput.type = "file";
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
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
          <MenuItem value="Basic Repair">Basic Repair</MenuItem>
          <MenuItem value="Tech Support">Tech Support</MenuItem>
          <MenuItem value="Assemble Furniture">Assemble Furniture</MenuItem>
        </Select>
      </FormControl>
      <p>   </p>
      <TextField
        label="Details"
        multiline
        rows={3}
        fullWidth
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <p>   </p>
      <TextField
        label="Teams NetID: abc1234"
        fullWidth
        value={netid}
        onChange={(e) => setNetId(e.target.value)}
      />
      
      
      <input
        id="file-input"
        type="file"
        onChange={handleImageChange}
        accept="Images/*"
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
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time"
      />
      <p>   </p>
      <Button variant="contained" onClick={handleSubmit}>
        Submit Request
      </Button>
      {imageUrl && (  // Conditionally render the image if imageUrl is available
          <img src={imageUrl} alt="Uploaded Image" />
        )}
    </div>
  );
};

export default Request;
