import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Navbar1 } from '../pages/Navbar1';

const Register = () => {
    useEffect(() => {
        document.title = 'הצטרפות אלינו';
    }, []);

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { setUserDetails } = context;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleRegisterButton = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?userName=${userName}&password=${password}`);
            const answer = await response.json();

            if (answer[0]) {
                alert('קיים כבר משתמש עם שם זהה.');
            } else if (password !== verifyPassword) {
                alert('סיסמאות לא תואמות.');
            } else if (!isStrongPassword(password)) {
                alert('סיסמא לא חזקה מספיק.');
            } else {
                const registerResponse = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName: userName, password: password }),
                });
                const data = await registerResponse.json();
                setUserDetails(data);
                navigate('/register/add-details');
            }
        } catch (error) {
            console.error('Error handling registration:', error);
            // Handle error here (e.g., show an error message to the user)
        }
    };

    const isStrongPassword = (password) => {
        // בדיקת אורך - לפחות 8 תווים ובדיקת שימוש באותיות קטנות
        if (password.length < 8 || !/[a-z]/.test(password)) {
            return false;
        }
        return true;
    };

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
                        <input className="input" onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder=":שם" required />
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
    );
};

export default Register;
