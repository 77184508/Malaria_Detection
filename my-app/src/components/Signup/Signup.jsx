import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';   
import './Signup.css';
function Signup(props){
      const [formData, setFormData] = useState({
            username: '',   
            password:'',});
        const navigate = useNavigate();
        function handleChange(event) {
            console.log(event.target);
            const { name, value } = event.target;
            setFormData((prevValue) => ({
                ...prevValue,
                [name]: value,
            }));
        }
        async function handleSubmit(event) {
            event.preventDefault();
            try{
                const response = await axios.post('http://localhost:5000/signup', formData);
                if (response.data.status === '200') {

                    props.setLogIn(true);
                    navigate('/login'); // Redirect to login page 
                }
            } catch (error) {
                 if (error.response) {
            if (error.response.data.status === '400') {
                alert(error.response.data.message);
                setTimeout(() => navigate('/login'), 500);
            } else if (error.response.data.status === '500') {
               alert(error.response.data.message); // Or show error.response.data.message
            } else {
                alert('An error occurred. Please try again.');
            }
        props.setLogIn(false);
        navigate('/signup');
            }
        }
    }
    return(
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div>
                    <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <button  type="submit">Signup</button>
            </form>
        </div>
    )
}
export default Signup;