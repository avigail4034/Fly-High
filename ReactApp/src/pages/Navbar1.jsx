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
          <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/Flights")}>Flights</Nav.Link>
        </Nav.Item>
        {userDetails.userName ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/FlightSearch")}>Flight Search</Nav.Link>
          </Nav.Item>
        ) : null}
        {userDetails.roleId === 1 ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/users")}>Users List</Nav.Link>
          </Nav.Item>
        ) : null}
        {userDetails.userName ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
          </Nav.Item>
        ) : null}
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/about-us")}>About</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );

}
