import React from 'react'
import { useState, useContext ,useEffect} from 'react'
import '../Styles/Login.css';
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"
import { Navbar1 } from '../pages/Navbar1';

const Rergister = () => {
    useEffect(() => {
        document.title = 'הצטרפות אלינו';
      }, []);
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleRegisterButton = () => {

        fetch(`http://localhost:3000/users?userName=${userName}&password=${password}`)
            .then((response) => response.json())
            .then((answer) => {
                if (answer[0]) {//אם חזרה תשובה זה אומר שקיים כזה משתמש
                    alert('קיים כבר משתמש עם שם זהה.');
                }
                else if (password != verifyPassword) {
                    alert('סיסמאות לא תואמות.');
                }
                else if (!isStrongPassword(password)) {
                    alert('סיסמא לא חזקה מספיק.');
                }
                else {
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userName: userName, password: password }),
                    })
                        .then(response => response.json())  // Parse the JSON from the response
                        .then(data => {
                            setUserDetails(data);
                        })
                        .catch(error => {
                            console.error('Error making POST request:', error);
                        });

                    // navigate('/register/add-details');
                    navigate('/register/add-details');
                }

            })
            .catch((error) => console.error('Error fetching data:', error));
    }
    function isStrongPassword(password) {
        // בדיקת אורך - לפחות 8 תווים ובדיקת שימוש באותיות קטנות
        if (password.length < 8 || !/[a-z]/.test(password)) {
            return false;
        }
        return true;
    }

    return (
        <div>
             <Navbar1 />
            <form id="form">
                <ul id="tabs" className="register-buttons active">
                    <li className="tab active">
                        <a href="#signup" className="link-btn">הרשמה</a>
                    </li>
                    <li className="tab">
                        <a href="/logIn" className="link-btn">התחברות</a>
                    </li>
                </ul>
                <div className="User-fill" id="signUpForm">
                    <h1> !ברוך הבא</h1>
                    <div className="User-fill">
                        <input className="input" onChange={(e) => setuserName(e.target.value)} value={userName} type="text" placeholder=":שם" required />
                    </div>
                    <div className="password">
                        <div className="User-fill">
                            <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} id="pwd1" type="password" placeholder=":סיסמא" required />
                        </div>
                        <div className="User-fill">
                            <input className="input" onChange={(e) => setVerifyPassword(e.target.value)} value={verifyPassword} id="pwd2" type="password" placeholder=" :אימות סיסמא" required />
                        </div>
                    </div>
                    <button type="button" id="signUp" className="button1" onClick={handleRegisterButton}>הרשמה</button>
                </div>
            </form>
        </div>
    )
};

export default Rergister