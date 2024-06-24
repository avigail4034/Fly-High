
import { Component } from 'react';
import { useParams } from 'react-router-dom'
import FlightAtScreen from '../components/FlightAtScreen';
import { Navbar1 } from './Navbar1'
import React, { useState } from 'react';

function FlightSearch() {
    const [flightsArray, setFlightsArray] = useState([]);
    const [exitP, setExitP] = useState('');
    const [target, setTarget] = useState('');
    const [date, setDate] = useState("");
    const [isDirect, setIsDirect] = useState(false);

    const handleSearch = () => {
        fetch(`http://localhost:3000/flights?exitP=${exitP}&target=${target}&date=${date}&isDirect=${isDirect}`)
   //     fetch(`http://localhost:3000/flights?exitP=${exitP}&target=${target}&date=${new Date(date).toISOString()}&isDirect=${isDirect}`)
            .then((response) => response.json())
            .then((answer) => {
                console.log(answer,"hghku");
                if (!answer[0]) {//אם חזרה תשובה זה אומר שקיים כזה משתמש
                    alert("We apologize! There is currently no flight as requested")
                }
                else {
                    setFlightsArray( answer)
                }
            })
            .catch((error) => console.error('Error fetching data:', error));

        // כאן תוכל לכתוב קוד שמבצע את החיפוש לפי הנתונים שהוזנו
    };
    return (
        <div>
            <Navbar1></Navbar1>
            <br></br>
            <label>exit:</label>
            <input
                type='text'
                value={exitP}
                onChange={(e) => setExitP(e.target.value)}
            />
            <br></br>
            <label>target:</label>
            <input
                type='text'
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <br></br>
            <label>date:</label>
            <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <br></br>
            <p>only direct flights</p><input type="checkbox" onChange={(e) => { setIsDirect(!isDirect); }} />
            <br></br>

            <button onClick={handleSearch}>חיפוש</button>
            <br></br>

            {flightsArray.map((flight, index) => <FlightAtScreen key={flight.id} index={index} flight={flight} />)}
        </div>
    );
}


export default FlightSearch;
