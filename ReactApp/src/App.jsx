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
 const storedUserDetails = JSON.parse(localStorage.getItem('currentUser')) || {};

  const [userDetails, setUserDetails] = useState(storedUserDetails);

  useEffect(() => {
    const userDetailsWithoutpassword = { ...userDetails };
    delete userDetailsWithoutpassword.password;

    // Store the modified userDetails in local storage
   localStorage.setItem('currentUser', JSON.stringify(userDetailsWithoutpassword));
  }, [userDetails]);


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




/**
 * 
 * const templateParams = {
                    from_name: `${user.firstName} ${user.lastName}`,
                    to_email: fullRide.email,
                    message: `${user.firstName} ${user.lastName} wants to travel with you \n
                      on your ride from ${fullRide.source} to ${fullRide.destination} at ${fullRide.date}\n
                      in station ${stop.name}.`,
                    requestId: requestId.toString()
                };

                emailjs.send(
                    'service_7vdgzor',
                    'template_ww2a0cd',
                    templateParams,
                    '-smQEZzJW4OLKNgra'
                )
                    .then((response) => {
                        console.log('Email sent successfully!', response.status, response.text);
                    }, (error) => {
                        console.error('Failed to send email:', error);
                    });

 */