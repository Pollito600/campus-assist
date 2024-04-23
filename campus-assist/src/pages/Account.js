import React, { useState, useEffect, useRef } from "react";
import { useAuth } from '../AuthContext';
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import AvatarEditor from "react-avatar-editor";
import '../styles/account.css';

const Account = () => {
  const { user } = useAuth();
  const [newBio, setNewBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadMode, setUploadMode] = useState(false); // Flag to control upload mode
  const [imageFile, setImageFile] = useState(null); // Store the selected image file
  const db = getDatabase();
  const storage = getStorage();
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bioRef = ref(db, `users/${user.uid}/bio`);
        const bioSnapshot = await get(bioRef);
        if (bioSnapshot.exists()) {
          setNewBio(bioSnapshot.val());
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const storageRefChild = storageRef(storage, `profilePics/${user.uid}`);
        const url = await getDownloadURL(storageRefChild);
        setProfilePic(url);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchBio();
    fetchProfilePic();
  }, [db, storage, user.uid]);

  const handleSaveBio = async () => {
    try {
      if (newBio.trim() !== "") {
        await set(ref(db, `users/${user.uid}/bio`), newBio.trim());
        console.log("Bio saved successfully!");
        setMessage("Bio saved successfully!");
      } else {
        setMessage("Bio cannot be empty.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      setMessage("Failed to save bio. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUploadMode(true); // Switch to upload mode when file is selected
    }
  };

  const handleUploadProfilePic = async () => {
    try {
      if (editorRef.current && imageFile) {
        const canvas = editorRef.current.getImage();
        const dataUrl = canvas.toDataURL(); // Get cropped image as data URL

        // Convert data URL to Blob
        const blob = await fetch(dataUrl).then((res) => res.blob());

        // Upload the Blob to Firebase Storage
        const storageRefChild = storageRef(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRefChild, blob);
        console.log("Cropped image uploaded successfully!");
        setMessage("Cropped image uploaded successfully!");

        // Update profile pic state with data URL
        setProfilePic(dataUrl);
        setUploadMode(false); // Disable upload mode
      }
    } catch (error) {
      console.error("Error uploading cropped image:", error);
      setMessage("Failed to upload cropped image. Please try again later.");
    }
  };

  return (
    <div className="account-container">
      <div className="account-info">
        <h1>Account Information</h1>
        <p><strong>Name:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bio-container">
        <h2>Edit Bio</h2>
        <textarea
          className="bio-textarea"
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="Enter your bio..."
          rows="4"
        />
        <button className="save-button" onClick={handleSaveBio}>Save Bio</button>
        {message && <p className={message.includes("successfully") ? "success-message" : "error-message"}>{message}</p>}
      </div>

      <div className="profile-pic-container">
        <h2>Upload Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploadMode && imageFile && (
          <div className="editor-container">
            <AvatarEditor
              ref={editorRef}
              image={imageFile}
              width={150}
              height={150}
              border={50}
              borderRadius={75}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />
            <button className="upload-button" onClick={handleUploadProfilePic}>Upload</button>
          </div>
        )}
        {profilePic && !uploadMode && (
          <div className="profile-pic-preview">
            <img src={profilePic} alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
