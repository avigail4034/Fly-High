import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import FlightAtScreen from '../components/FlightAtScreen';
import { Navbar1 } from './Navbar1';
import { useNavigate } from 'react-router-dom';
import '../Styles/Flights.css';


// import '../CSS/list.css'
const Flights = () => {
    const navigate = useNavigate();

    const [flightsArray, setflightsArray] = useState([]);
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [flight, setflight] = useState({ company: "", exitP: "", flightCode: "", target: "", price: "", date: "", time: "", image: "" });
    const [enableAdd, setEnableAdd] = useState(false);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchID, setSearchID] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchArrayflights, setSearchArrayflights] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    function isBeforeISODate(fullDateStr, isoDateStr) {
        const fullDate = new Date(fullDateStr); // המרת התאריך המלא לאובייקט Date
        const isoDate = new Date(isoDateStr); // המרת התאריך ה-ISO לאובייקט Date

        return fullDate < isoDate; // בדיקה אם התאריך המלא הוא לפני התאריך ה-ISO
    }
    async function getflights() {// פונקציה אסינכרונית בגלל שאני רוצה לחכות לתשובבה  מהשרת כדי להציג את המשימות
        try {
            // console.log(userDetails,"userDetails");
            // const ys=userDetails.id;
            // console.log(ys,"userDetails.id");
            const data = await fetch(`http://localhost:3000/flights`);
            const flights = await data.json();
            const today = new Date(); // מציין את תאריך היום

            // סינון הטיסות לפי תאריך היום
            const filteredFlights = flights.filter(flight => {
                const result = isBeforeISODate(today, flight.departureDate);
                return result;
            });

            setflightsArray(filteredFlights);
        }
        catch (error) {
            alert(error);
        }

    }

    useEffect(() => {//כל פעם שיש שינוי מציג אותו
        getflights();
    }, [])



    const orderOfFlights = (event) => {//פונקציה שמפנה לפונקציות המיון
        if (event.target.value === "serial") {
            FlightSearcheri();
        }
        if (event.target.value === "random") {
            orderRandom();
        } if (event.target.value === "price") {
            SortByPrice();
        }
    }
    const FlightSearcheri = () => {
        let arrTemp = [...flightsArray];
        arrTemp.sort((flight1, flight2) => {
            return flight1.id - flight2.id;
        });
        setflightsArray(arrTemp);
    };

    const orderRandom = () => {
        let randomNum = Math.random();
        let arrTemp = [...flightsArray].sort(function (a, b) { return randomNum - Math.random(); })
        setflightsArray(arrTemp);
    }
    const SortByPrice = () => {//פונקציה שמפנה לפונקציות המיון

        let arrTemp = [...flightsArray];
        arrTemp.sort((flight1, flight2) => {
            return flight1.price - flight2.price;
        });
        setflightsArray(arrTemp);
    }
    useEffect(() => {
        const searchValue = searchTitle.toLowerCase(); // המרת הערך של ה-input לאותיות קטנות
        const filteredFlights = flightsArray.filter(flight => flight.target.toLowerCase().includes(searchValue));
        setSearchArrayflights(filteredFlights);
    }, [searchTitle, flightsArray]);


    return (
        <>
        <Navbar1 />
        <h1>הטיסות הכי זולות</h1>
        <div id="flexBtnflight">
            {(userDetails&&userDetails.roleId === 2 || userDetails&&userDetails.roleId === 1) && 
                <button className='btnPost' onClick={() => navigate("/add-flight")}>הוספת טיסה</button>
            }
            <select className='btnTodo' name="order" id="order" onChange={orderOfFlights}>
            <option value="price">מחיר</option>
             <option value="serial">שם</option>
                <option value="random">רנדומלי</option>
                
            </select>
            <input
                className='inputFill'
                type='text'
                onChange={(event) => setSearchTitle(event.target.value)}
                value={searchTitle}
                placeholder='חיפוש '
            />
        </div>
        <div id="boxShow">
            {searchArrayflights.map((flight, index) => (
               
                <FlightAtScreen key={flight.id} index={index} flight={flight} />
            ))}
        </div>
    </>
    )
}

export default Flights