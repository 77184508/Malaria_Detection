import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
function Login(prop){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleLogin(event){
        event.preventDefault();
        try{
        const response=await axios.post('http://localhost:5000/login', { username, password });
        if(response.data.status==='200'){
            prop.setLogIn(true);
            navigate('/detection'); // Redirect to the detection page
        } 
    }
    catch(error){
        if (error.response) {
            if (error.response.data.status === '400') {
                alert(error.response.data.message);
            } else if (error.response.data.status === '500') {
                alert(error.response.data.message);
            }
            else if(error.response.data.status === '401') {
                alert(error.response.data.message);
                setTimeout(()=>navigate('/signup'), 500);
            }
             else {
                alert('An error occurred. Please try again.');
            }
            prop.setLogIn(false);
            navigate('/login');
        }
    }
}
    return (
        <div className="login-page">
            <div className="login-container">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div className="login-form">
                <input  id="username" type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
                <input id="password" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                <button type="submit">Login</button>
                </div>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );
}
export default Login;