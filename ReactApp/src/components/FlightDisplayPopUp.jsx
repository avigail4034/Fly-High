import react from 'react';
import  { Component } from 'react';
import { useParams } from 'react-router-dom'
import { useState, useContext,useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom'; 
   import { Link } from 'react-router-dom';

function FlightDisplayPopUp(props) {
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const { userDetails,setUserDetails } = context;
    const [flight, setflight] = useState(props.flight);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [disabledButtonUpdate, setDisabledButtonUpdate] = useState(false);

    return (
    <div>
      

     <p>flightCode: {flight.flightCode}</p>
        <p>company: {flight.company}</p>
        <p>aaaa: {flight.airplain_id}</p>
        <p>exit from: {flight.exitP}</p>
        <p>departureDate: {flight.departureDate}</p>
        <p>arrivalDate: {flight.arrivalDate}</p>
        <p>departureTime: {flight.departureTime}</p>
        <p>arrivalTime: {flight.arrivalTime}</p>
      

        {userDetails.userName ?  
  <Link to={{ pathname: "/order", search: `?id=${flight.airplain_id}&flightId=${flight.id}` }}>
    {(props.IOrder!==true)&&<button variant="primary" className="custom-button">TO ORDER</button>}
  </Link>
  : null
}

    </div>
    );
}


export default FlightDisplayPopUp;

