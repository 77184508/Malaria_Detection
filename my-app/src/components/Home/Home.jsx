import React from "react";
import { Link } from "react-router-dom";
import './Home.css'; 
function Home() {
  return (
    <div className="home-page">
    <div className="home-container">
       <img
        src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=400&q=80"
        alt="Microscope"
        className="medical-image"
      />
      <h2>Detect Malaria</h2>
      <div className="navbar">
          <div id="login"><Link to="/login">Login</Link></div>
          <div id="signup"><Link to="/signup">Signup</Link></div>
          <div id="detection"><Link to="/detection">Detection</Link></div>
      </div>
      </div>
      </div>
  )
}
export default Home;

