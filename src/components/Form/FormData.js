// FormData.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitRecord } from "../../store/interactions";
import "./form.css";

const FormData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !bloodType || !allergies || !diagnosis || !treatment) {
      alert("Please fill out all fields.");
      return;
    }
    const recordData = {
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      imageURL: image ? URL.createObjectURL(image) : "",
    };
    console.log("Submitting Record:", recordData);
    submitRecord(medical, provider, recordData, dispatch);
    setName("");
    setAge("");
    setGender("");
    setBloodType("");
    setAllergies("");
    setDiagnosis("");
    setTreatment("");
    setImage(null);
  };

  return (
    <div className="form-container">
      <h1>Medical Records</h1>
      {account ? (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Blood Type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required />
          <input type="text" placeholder="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} required />
          <input type="text" placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
          <input type="text" placeholder="Treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default FormData;
