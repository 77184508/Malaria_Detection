import React from "react";
import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props) {
  const navigate=useNavigate();
  if (!props.islogin && !props.vis) {
    alert("You must be logged in to access this page.");

    setTimeout(()=>navigate("/login"),10);
  }
  else{
    console.log(props);
    props.setVis(true);
  return props.children;
}
}
export default ProtectedRoute;