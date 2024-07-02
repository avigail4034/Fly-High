import React from 'react'
import { useState, useContext,useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"
import '../Styles/Login.css';
import { Navbar1 } from '../pages/Navbar1';

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
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        };
    
        fetch('http://localhost:3000/LogIn', requestData)
            .then((response) => {
                if (response.status !== 200) {
                  alert("שם או סיסמא שגויים")
                  setuserName('');
                  setPassword('');
                }
                return response.json();
            })
            .then((answer) => {
                console.log(answer,"answer");
                if (answer.id) {
                    setUserDetails(answer);
                    navigate(`/home/users/${answer.id}`);
              }
            })
            .catch(error => {
                alert("Error fetching:", error);
            });
    }
    
    
    return (
        <div >
               <Navbar1 />
            <form id="form">
                <ul id="tabs" className="register-buttons active">
                    <li className="tab active">
                        <a href="/register" className="link-btn">הרשמה</a>
                    </li>
                    <li className="tab">
                        <a className="link-btn">התחברות</a>
                    </li>
                </ul>
                <div>
                    <h1>!ברוך שובך</h1>
                    <div className="User-fill">
                        <input className="input" id="userName" onChange={(e)=>setuserName(e.target.value)} value={userName} type="text" placeholder=":שם" required />
                    </div>
                    <div className="User-fill">
                        <input className="input" onChange={(e)=>setPassword(e.target.value)} value={password}  id="userPassword" type="password" placeholder=":סיסמא" required />
                    </div>
                    <button type="button" id="logIn" onClick={handleLogInButton} className="button1">התחברות</button>

                </div>
            </form>
        </div>
    )
}

export default LogIn