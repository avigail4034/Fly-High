
import { Component } from 'react';
import { useParams } from 'react-router-dom'
import FlightAtScreen from '../components/FlightAtScreen';
import { useState, useContext, useEffect } from 'react'
import { Navbar1 } from './Navbar1'
import React from 'react';
import '../Styles/FlightSearch.css'
//ככ
function FlightSearch() {
    const [flightsArray, setFlightsArray] = useState([]);
    const [flightsArrayOfRoute, setFlightsArrayOfRoute] = useState([]);
    const [flightsArrayOfFlightsInRoute, setFlightsArrayOfFlightsInRoute] = useState([]);
    const [exitP, setExitP] = useState('');
    const [target, setTarget] = useState('');
    const [date, setDate] = useState("");
    const [isDirect, setIsDirect] = useState(false);

    useEffect(() => {//כל פעם שיש שינוי מציג אותו
        document.title = 'חיפוש טיסה';
    }, [])

    const handleSearch = () => {
        fetch(`http://localhost:3000/flights?exitP=${exitP}&target=${target}&date=${date}&isDirect=${isDirect}`)
            .then((response) => response.json())
            .then((answer) => {
                if (isDirect) {
                    if (!answer[0]) {//אם חזרה תשובה זה אומר שקיים כזה משתמש
                        alert("מצטערים! לא מצאנו לך טיסה מתאימה.")
                    }
                    else {
                        setFlightsArray(answer)
                    }
                }
                else { //אם מצב מסלול- כלומר טיסה לא ישירה
                    if (!answer[0]) {//אם חזרה תשובה זה אומר שקיים כזה משתמש
                        alert("מצטערים! לא מצאנו לך טיסה מתאימה")
                    }
                    else {
                        setFlightsArrayOfRoute(answer)
                    }
                }
            })
            .catch((error) => console.error('Error fetching data:', error));

        // כאן תוכל לכתוב קוד שמבצע את החיפוש לפי הנתונים שהוזנו
    };

    const routeViewing = (flights) => {
        setFlightsArrayOfFlightsInRoute(flights);
    }
    return (
        <div >
            <Navbar1></Navbar1>
            <br></br>
            <h1>חיפוש מדויק</h1>
            <div className='AllLabel'>
                <br></br>
                <label>:ארץ מוצא</label>
                <input
                    type='text'
                    value={exitP}
                    onChange={(e) => setExitP(e.target.value)}
                />
                <br></br>
                <label>:ארץ יעד</label>
                <input
                    type='text'
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                />
                <br></br>
                <label>:תאריך</label>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br></br>
                <br></br>
                <label>:טיסה ישירה</label><input type="checkbox" onChange={(e) => { setIsDirect(!isDirect); }} />
                <br></br>

                <button onClick={handleSearch}>חיפוש</button>
                <br></br>
                {flightsArray.length > 0 && flightsArray.map((flight, index) => (
                    <FlightAtScreen key={flight.id} index={index} flight={flight} />
                ))}

                {flightsArrayOfRoute.length > 0 && flightsArrayOfRoute.map((route, index) => (
                    <div key={index}>
                        <p> {route[0].target} :תחנת ביניים</p>
                        <br />
                        <p> {route[0].departureDate.split("T")[0]} :יציאה ב</p>
                        <p>{route[0].departureTime}</p>
                        <br />
                        <p> {route[1].arrivalDate.split("T")[0]}:הגעה ב</p>
                        <p> {route[1].arrivalTime}</p>
                        <button onClick={(e) => { routeViewing(route); }}>לצפייה במסלול המפורט</button>
                    </div>
                ))}
                {flightsArrayOfFlightsInRoute.length > 0 && flightsArrayOfFlightsInRoute.map((flight, index) => (
                    <FlightAtScreen key={flight.id} index={index} flight={flight} />
                ))}
            </div>
        </div>
    );
}


export default FlightSearch;
