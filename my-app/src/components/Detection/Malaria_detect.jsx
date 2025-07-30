import React, { useState } from "react";
import axios from "axios";
import './Malaria_detect.css';
import { useNavigate } from 'react-router-dom';
function Detection(props) {
  const navigate=useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const[accuracy,setAccuracy]=useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // optional: show preview
    console.log("Selected file:", file);
    console.log("Preview URL:", URL.createObjectURL(file));
  };

  async function handleUpload(){
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image); // key must match backend handler

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      console.log(res.data);
      setResult(res.data.prediction);
      setAccuracy(res.data.accuracy);
      setPreview(null); // clear preview after upload
    } catch (err) {
      console.error(err);
    }
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  async function handleLogout(){
    alert("Logging-out");
    setTimeout(()=>navigate("/login"),10);
    await delay(1000);
    props.setLogIn(false);
    props.setVis(false);
  }
  return (
    <div className="img">  
    <button className="log-out" onClick={handleLogout}>Logout</button> 
    <div className="image-detection">
      <h2>Upload Image for Prediction</h2>
      <input  id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
      {preview ? <img src={preview} alt="Preview" width="200" />:null}
      <br />
      <button  id="predict-button" onClick={handleUpload}>Predict</button>
       <div className="prediction-output">
      {result ? <div>Prediction: {result} </div> : null}
      {accuracy ? <div>Accuracy: {accuracy}%</div> : null}
    </div>
    </div>
    </div> 
  );
}
export default Detection;
