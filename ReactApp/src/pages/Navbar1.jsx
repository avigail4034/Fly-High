import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../Styles/Navbar.css';
import logo from '../Imgs/Logo.jpg';
import { useState, useContext,useEffect } from 'react'
import { UserContext } from '../App';
export function Navbar1() {
  const context = useContext(UserContext);
  const { userDetails,setUserDetails } = context;
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => navigate("/home")}>
        <img src={logo} className="logo" alt="logo" />
        <span className="site-name">Fly High</span>
      </div>
      <Nav className='mainNavigation' dir='rtl'>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/home")}>בית</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/Flights")}>טיסות</Nav.Link>
        </Nav.Item>
        {userDetails.userName ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/FlightSearch")}>חיפוש טיסה</Nav.Link>
          </Nav.Item>
        ) : null}
        {userDetails.roleId === 1 ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/users")}>לקוחות</Nav.Link>
          </Nav.Item>
        ) : null}
        {userDetails.userName ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/profile")}>פרופיל</Nav.Link>
          </Nav.Item>
        ) : null}
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/about-us")}>אודות</Nav.Link>
        </Nav.Item>
        {userDetails.userName ? (<Nav.Item>
          <Nav.Link onClick={() => navigate("/logIn")}>התנתקות</Nav.Link>
          {/* מה עוד עושים ביציאה??????????? */}
        </Nav.Item>
        ) : null}
                {userDetails.userName ? null : (<Nav.Item>
          <Nav.Link onClick={() => navigate("/logIn")}>הרשמה</Nav.Link>
          {/* מה עוד עושים ביציאה??????????? */}
        </Nav.Item>
        )}
      </Nav>
    </div>
  );

}
