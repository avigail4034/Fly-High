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
  const handleOkAddButton = async () => {
    // Update local state for user first
    const updatedUser = { ...userDetails, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, roleId: 3 };
    setUserDetails(updatedUser); // Update userDetails with the updated user details
  
    try {
      // Wait for setUserDetails to complete before sending PUT request
      await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userDetails:updatedUser}), // Send the updated user details
      });
  
      // Navigate after successful update
      navigate(`/home/users/${updatedUser.id}`);
    } catch (error) {
      console.error('Error making PUT request:', error);
      alert('Fill in all details.');
    }
  };
  

  return (
    <div>
      <form>
        <div className="content3" id="signUpForm">
          <h1>! שלום {userDetails.userName}</h1>
          <div id='form'>
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
        </div>
      </form>
    </div>
  );
};

export default UserAddDetails;
