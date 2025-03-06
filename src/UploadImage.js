// UploadImage.js
import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ setImageHash }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadToPinata = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_KEY;

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setImageUrl(imageUrl);
      setImageHash(ipfsHash); // Pass image hash to parent component
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload Medical Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={uploadToPinata}
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        Upload
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
