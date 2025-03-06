// Data.js
import React, { useState } from "react";
import UploadImage from "../../UploadImage";

const Data = () => {
  const [orderData, setOrderData] = useState([]);
  const [imageHash, setImageHash] = useState("");

  const addRecord = (record) => {
    setOrderData([...orderData, record]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newRecord = {
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      bloodType: formData.get("bloodType"),
      allergies: formData.get("allergies"),
      diagnosis: formData.get("diagnosis"),
      treatment: formData.get("treatment"),
      imageURL: `https://gateway.pinata.cloud/ipfs/${imageHash}`,
    };

    addRecord(newRecord);
    e.target.reset();
    setImageHash("");
  };

  return (
    <div>
      <h1>Medical Records</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="age" placeholder="Age" required />
        <input type="text" name="gender" placeholder="Gender" required />
        <input type="text" name="bloodType" placeholder="Blood Type" required />
        <input type="text" name="allergies" placeholder="Allergies" required />
        <input type="text" name="diagnosis" placeholder="Diagnosis" required />
        <input type="text" name="treatment" placeholder="Treatment" required />

        <UploadImage setImageHash={setImageHash} />

        <button type="submit" disabled={!imageHash}>
          Add Record
        </button>
      </form>

      <h2>Records List</h2>
      <div>
        {orderData.map((record, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
            <p><strong>Name:</strong> {record.name}</p>
            <p><strong>Age:</strong> {record.age}</p>
            <p><strong>Gender:</strong> {record.gender}</p>
            <p><strong>Blood Type:</strong> {record.bloodType}</p>
            <p><strong>Allergies:</strong> {record.allergies}</p>
            <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
            <p><strong>Treatment:</strong> {record.treatment}</p>
            {record.imageURL && (
              <img
                src={record.imageURL}
                alt="Medical Record"
                style={{ width: "200px", borderRadius: "10px", marginTop: "10px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
