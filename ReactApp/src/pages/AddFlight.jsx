import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { Navbar1 } from './Navbar1';
import { useNavigate } from 'react-router-dom';


function AddFlight() {
    const navigate = useNavigate();

    const [flightDetails, setFlightDetails] = useState({
        company: '',
        airplane_id: '',
        exitP: '',
        flightCode: '',
        price: '',
        target: '',
        departureDate: '',
        arrivalDate: '',
        departureTime: '',
        arrivalTime: '',
        image: '',
    });
    const [airplanes, setAirplanes] = useState([]);
    const context = useContext(UserContext);
    const { userDetails } = context;
    useEffect(() => {
        getAirplanesByCompany();
    }, []);

    async function getAirplanesByCompany() {////מביאה את כל המטוסים ששייכים לחברה שלי
        try {
            const response = await fetch(`http://localhost:3000/company_employees?employee_id=${userDetails.id}`);
            const companyData = await response.json();
            const company1 = companyData.company;
            setFlightDetails({ ...flightDetails, company: company1 });

            const response2 = await fetch(`http://localhost:3000/airplanes?company=${company1}`);
            const airplanesData = await response2.json();
            setAirplanes(airplanesData);
        } catch (error) {
            alert(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightDetails({ ...flightDetails, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { departureDate, arrivalDate, departureTime, arrivalTime } = flightDetails;

        // בדיקה שכל השדות מלאים
        if (Object.values(flightDetails).some(value => !value)) {
            alert('אנא מלא את כל השדות.');
            return;
        }
        // בדיקת תאריכים- יציאה ונחיתה
        const departureDateTime = new Date(`${departureDate}T${departureTime}`);
        const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);

        if (departureDateTime >= arrivalDateTime) {
            alert('תאריך ושעת ההמראה חייבים להיות לפני תאריך ושעת הנחיתה.');
            return;
        }
        // בדיקה שמטוס נבחר
        if (!flightDetails.airplane_id) {
            alert('אנא בחר מטוס.');
            return;
        }
        //בדיקת זמינות מטוסים
        const isAvailable = await checkAvailableAirplanes();
        if (isAvailable) {
            // הוספת טיסה בפועל
            try {
                const response = await fetch('http://localhost:3000/flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(flightDetails),
                });
                if (response.ok) {
                    alert("טיסה נוספה בהצלחה");
                    navigate("/Flights")
                } else {
                    throw new Error('Failed to add flight');
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    async function checkAvailableAirplanes() {
        const { departureDate, arrivalDate, airplane_id } = flightDetails;

        if (!departureDate || !arrivalDate) {
            alert('אנא בחר תאריכי יציאה ונחיתה.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/flights?airplane_id=${airplane_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ departureDate, arrivalDate }),
            });
            const result = await response.json();
            if (result.success) {
                const unavailableAirplanes = result.unavailableAirplanes;
                if (unavailableAirplanes[0]) {
                    alert('שגיאה בבדיקת זמינות התאריכים');
                    return false;
                } else {
                    return true;

                }
            }
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div>
            <Navbar1 />
            <h1>הוספת טיסה חדשה</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    נקודת יציאה:
                    <input
                        type="text"
                        name="exitP"
                        value={flightDetails.exitP}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    קוד טיסה:
                    <input
                        type="text"
                        name="flightCode"
                        value={flightDetails.flightCode}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    מחיר:
                    <input
                        type="text"
                        name="price"
                        value={flightDetails.price}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    יעד:
                    <input
                        type="text"
                        name="target"
                        value={flightDetails.target}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    תאריך המראה:
                    <input
                        type="date"
                        name="departureDate"
                        value={flightDetails.departureDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    תאריך נחיתה:
                    <input
                        type="date"
                        name="arrivalDate"
                        value={flightDetails.arrivalDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    זמן המראה:
                    <input
                        type="time"
                        name="departureTime"
                        value={flightDetails.departureTime}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    זמן נחיתה:
                    <input
                        type="time"
                        name="arrivalTime"
                        value={flightDetails.arrivalTime}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    בחר מטוס:
                    <select
                        name="airplane_id"
                        value={flightDetails.airplane_id}
                        onChange={handleChange}
                    >
                        <option value="">בחר מטוס</option>
                        {airplanes.map((airplane) => (
                            <option key={airplane.id} value={airplane.id}>
                                {`מטוס מספר: ${airplane.id}, מספר מושבים: ${airplane.num_places}`}
                            </option>
                        ))}
                    </select>
                </label>
                <br />       
                <label>
                    תמונה:
                    <input
                        type="text"
                        name="image"
                        value={flightDetails.image}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">שלח</button>
            </form>
        </div>
    );
}

export default AddFlight;
