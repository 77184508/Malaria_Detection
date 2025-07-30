import React from "react";
import { Link } from "react-router-dom";



function Logout(){
return(
    <div className="logout-box">
        <Link to ="/logout">Logout</Link>
        <button className="logout-button" onClick={() => {
            alert("You have been logged out.");
        }}>Logout</button>
    </div>
);
}
export default Logout;