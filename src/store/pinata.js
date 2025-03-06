// src/store/pinata.js
import axios from "axios";

const PINATA_API_KEY = "your_api_key";
const PINATA_SECRET_API_KEY = "your_secret_api_key";

export const pinJSONToIPFS = async (image) => {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return null;
  }
};
