import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import '../Styles/UserAddDetails.css';

const UserAddDetails = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userDetails, setUserDetails } = context;

  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleOkAddButton = () => {
    console.log(    userDetails.id,
     user.firstName,
       user.lastName,
     userDetails.userName,
     user.email,
      user.phone,
   );
    fetch(`http://localhost:3000/users/${userDetails.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userDetails.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: userDetails.userName,
        email: user.email,
        phone: user.phone,
        roleId: 3,
      }),
    })
      .then(() => {
        setUserDetails({ ...userDetails, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone });
        navigate(`/home/users/${userDetails.id}`);
      })
      .catch(error => {
        console.error('Error making PUT request:', error);
        alert('מלא את כל הפרטים.');
      });
  };

  return (
    <div>
      <form >
        <div className="content3" id="signUpForm">
          <h1>! {userDetails.userName}שלום</h1>
          <h3>נא מלא פרטים אישיים</h3>
          <div className="User-fill">
            <input
              className="input"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              value={user.firstName}
              type="text"
              placeholder=":שם"
              required
            />
          </div>
          <div className="User-fill">
            <input
              className="input"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              value={user.lastName}
              type="text"
              placeholder=":משפחה"
              required
            />
          </div>
          <div className="User-fill">
            <input
              className="input"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="Email"
              placeholder=":מייל"
              required
            />
          </div>
          <div className="User-fill">
            <input
              className="input"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              value={user.phone}
              type="text"
              placeholder=":טלפון"
              required
            />
          </div>
          <button type="button" id="signUp" className="button button-block" onClick={handleOkAddButton}>
            OK
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAddDetails;
