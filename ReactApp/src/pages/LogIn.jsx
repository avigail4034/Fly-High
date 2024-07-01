import React from 'react'
import { useState, useContext,useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails,setUserDetails } = context;
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const handleLogInButton = () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        };
    
        fetch('http://localhost:3000/LogIn', requestData)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((answer) => {
                if (!answer) {
                    alert("One or more of the details are wrong");
                } else {
                    setUserDetails(answer);
                    navigate(`/home/users/${answer.id}`);
                }
            })
            .catch(error => {
                alert("Error fetching:", error);
            });
    }
    
    
    return (
        <div>
            <form id="form">
                <ul id="tabs" className="register-buttons active">
                    <li className="tab active">
                        <a href="/register" className="link-btn">Sign Up</a>
                    </li>
                    <li className="tab">
                        <a className="link-btn">Log In</a>
                    </li>
                </ul>
                <div>
                    <h1>Welcome Back!</h1>
                    <div className="User-fill">
                        <input className="input" id="userName" onChange={(e)=>setuserName(e.target.value)} value={userName} type="text" placeholder="userName" required />
                    </div>
                    <div className="User-fill">
                        <input className="input" onChange={(e)=>setPassword(e.target.value)} value={password}  id="userPassword" type="password" placeholder="Password" required />
                    </div>
                    <button type="button" id="logIn" onClick={handleLogInButton} className="button button-block">LogIn</button>

                </div>
            </form>
        </div>
    )
}

export default LogIn