import {useState} from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Detection from './components/Detection/Malaria_detect';
import ProtectedRoute from './components/ProtectedRoute';
function App(){
   const[ vis, setVis]=useState(false);
    const[islogin,setLogIn]=useState(false);
    return(
           <Routes>
            <Route path="/" element={<Home />}  />
            <Route path="/login" element={<Login setLogIn={setLogIn} />} />
            <Route path="/signup" element={<Signup setLogIn={setLogIn} />} />
              <Route
          path="/detection"
          element={
            <ProtectedRoute islogin={islogin} setVis={setVis}>
              <Detection setLogIn={setLogIn} setVis={setVis} vis={vis} />
            </ProtectedRoute>
          }
        />

           </Routes>
    )
}
export default App;