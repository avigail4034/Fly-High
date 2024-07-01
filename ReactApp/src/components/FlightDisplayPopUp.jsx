import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import '../Styles/FlightDisplayPopUp.css';

function FlightDisplayPopUp(props) {
    const context = useContext(UserContext);
    const { userDetails } = context;
    const { flight } = props;
    console.log(flight,"flightdfh");

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2 className="popup-title">{flight.target}</h2>
                <div className="popup-content">
                    {/* <div className="popup-row">
                        <span className="popup-label">Flight Code:</span>
                        <span className="popup-value">{flight.flightCode}</span>
                    </div> */}
                    <div className="popup-row">
                        <span className="popup-label">:חברה</span>
                        <span className="popup-value">{flight.company}</span>
                    </div>
                    <div className="popup-row">
                        <span className="popup-label">:מטוס</span>
                        <span className="popup-value">{flight.airplain_id}</span>
                    </div>
                    <div className="popup-row">
                        <span className="popup-label">:ארץ מוצא</span>
                        <span className="popup-value">{flight.exitP}</span>
                    </div>
                    <div className="popup-row">
                        <span className="popup-label">:תאריך יציאה</span>
                        <span className="popup-value">{flight.departureDate}</span>
                    </div>
                    <div className="popup-row">
                        <span className="popup-label">:תאריך הגעה</span>
                        <span className="popup-value">{flight.arrivalDate}</span>
                    </div>

                    {userDetails.userName && (
                        <Link to={{ pathname: "/order", search: `?id=${flight.airplain_id}&flightId=${flight.id}` }}>
                            {props.IOrder !== true && <button className="close-button">להזמנה</button>}
                        </Link>
                    )}
                    <button className="close-button" onClick={props.onClose}>סגירה</button>
                </div>
            </div>
        </div>
    );
}

export default FlightDisplayPopUp;
