import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom"

const UserAddDetails = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userDetails, setUserDetails } = context;
  const [user, setUser] = useState({//אובייקט של כל פרטי המשתמש
    id: "",
    firstName: "",
    userName: "",
    lastName: "",
      email: "",
      phone: "",
  });
 
  const handleOkAddButton = () => {
    fetch(`http://localhost:3000/users/${userDetails.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userDetails.id, firstName: user.firstName,lastName:user.lastName,userName: userDetails.userName,  email:user.email, phone:user.phone, roleId:3}),
    })
      .then(() => {
        setUserDetails({ ...user, id: userDetails.id, firstName: user.firstName,lastName:user.lastName,userName: userDetails.userName,  email:user.email, phone:user.phone, roleId:3});
        navigate(`/home/users/${userDetails.id}`);
      })
      .catch(error => {
        console.error('Error making POST request:', error);
        alert(error);
      });
  }
  return (
    <div>
      <form id="form">
        <div className="content" id="signUpForm">
          <h1>HELLO {userDetails.userName}! ADD DETAILS</h1>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName} type="text" placeholder="firstName" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName} type="text" placeholder="lastName" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} type="email" placeholder="Email" required />
          </div>
          <div className="User-fill">
            <input className="input" onChange={(e) => setUser({ ...user, phone: e.target.value })} value={user.phone} type="text" placeholder="Phone Number" required />
          </div>
          <button type="button" id="signUp" className="button button-block" onClick={handleOkAddButton}>OK</button>
        </div>

      </form>
    </div>
  )
}

export default UserAddDetails