import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link, json } from "react-router-dom"
// import './App.css'
import LogIn from './pages/LogIn'
import Flights from './pages/Flights'
import Rergister from './pages/Rergister'
import About from './pages/About';
import Home from './pages/Home'
import Order from './pages/Order'
import Profile from './pages/Profile'
import ThankYou from './pages/ThankYou'
import AddFlight from './pages/AddFlight'
import UsersList from './pages/UsersList'
import UserAddDetails from './pages/UserAddDetails'
import FlightSearch from './pages/FlightSearch'
import FlightDisplayPopUp from './components/FlightDisplayPopUp'
export const UserContext = React.createContext();

function App() {


  const [userDetails, setUserDetails] = useState({});
//הבאת המשתמש הנוכחי כל פעם שהעמוד מתרענן
  useEffect(() => {
    const getUserRefresh = async () => {
      try {
        //בדיקה לפי העוגיה מי המשתמש הנוכחי
        const response = await fetch("http://localhost:3000/checkConnect", {
          method: "POST",
          credentials: "include",
        });
  console.log(response,"response");
        if (response.ok) {
          const userSession = await response.json(); 
          //הבאת המשתמש הנוכחי
          const data = await fetch(`http://localhost:3000/users?id=${userSession.id}`, {
            method: "GET",
            credentials: "include",
          });
          const user = await data.json();
          setUserDetails(user); // הגדרת המשתנה userDetails עם המידע של המשתמש
        } else {
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserDetails(null);
      }
    };
  
    getUserRefresh();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Routes>
          <Route path="/" index element={<Navigate to="/Home" />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Flights" element={<Flights />} />
          <Route path="/FlightSearch" element={<FlightSearch />} />
          <Route path="/Flights/:id" element={<FlightDisplayPopUp />} />
          <Route path="/register" element={<Rergister />} />
          <Route path='/about-us' element={<About />}></Route>
          <Route path="/register/add-details" element={<UserAddDetails />} />
          <Route path="/register/about-us" element={<About />} />
          <Route path="/order" element={<Order />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/thank" element={<ThankYou />} />
          <Route path="/add-flight" element={<AddFlight />} />
          <Route path="/home" element={<Home />}>
            <Route path="users/:userId">  </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
