import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { Navbar1 } from './Navbar1';
import { useNavigate } from 'react-router-dom';
import '../Styles/AddFlight.css';

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
    const [formError, setFormError] = useState('');
    
    const context = useContext(UserContext);
    const { userDetails } = context;

    useEffect(() => {
        getAirplanesByCompany();
    }, []);
//בקשה לקבלת שם חברה של העובד
    async function getAirplanesByCompany() {
        try {
            const response = await fetch(`http://localhost:3000/company_employees?employee_id=${userDetails.id}`,{credentials: 'include'});
            const companyData = await response.json();
            const company1 = companyData.company;
            setFlightDetails({ ...flightDetails, company: company1 });
//בקשה לקבלת כל המטוסים של החברה
            const response2 = await fetch(`http://localhost:3000/airplanes?company=${company1}`,{credentials: 'include'});
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
            setFormError('אנא מלא את כל השדות.');
            return;
        } else {
            setFormError('');
        }

        // בדיקת תאריכים- יציאה ונחיתה
        const departureDateTime = new Date(`${departureDate}T${departureTime}`);
        const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);

        if (departureDateTime >= arrivalDateTime) {
            setFormError('תאריך ושעת ההמראה חייבים להיות לפני תאריך ושעת הנחיתה.');
            return;
        }

        // בדיקה שמטוס נבחר
        if (!flightDetails.airplane_id) {
            setFormError('אנא בחר מטוס.');
            return;
        }

        
        const isAvailable = await checkAvailableAirplanes();
        if (isAvailable) {
            // הוספת טיסה בפועל
            try {
                const response = await fetch('http://localhost:3000/flights', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({flightDetails:flightDetails, userDetails:userDetails}),
                });
                if (response.ok) {
                    alert("טיסה נוספה בהצלחה");
                    navigate("/Flights");
                } else {
                    throw new Error('Failed to add flight');
                }
            } catch (error) {
                alert(error);
            }
        }
    };
//בדיקת זמינות מטוסים
    async function checkAvailableAirplanes() {
        const { departureDate, arrivalDate, airplane_id } = flightDetails;

        if (!departureDate || !arrivalDate) {
            setFormError('אנא בחר תאריכי יציאה ונחיתה.');
            return;
        }

        try {
            //ניסיון לקבוע טיסה בתאריכים מסוימים--שליחה לשרת בכדי לקבל תשובה אם התאריכים פנויים
            const response = await fetch(`http://localhost:3000/flights?airplane_id=${airplane_id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ departureDate, arrivalDate ,userDetails}),
            });
            const result = await response.json();
            if (result.success) {
                const unavailableAirplanes = result.unavailableAirplanes;
                if (unavailableAirplanes[0]) {
                    setFormError('שגיאה בבדיקת זמינות התאריכים');
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
            <div className="form-container">
                <h1 className="form-title">הוספת טיסה חדשה</h1>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">
                       :נקודת יציאה
                        </label>
                        <input
                            type="text"
                            name="exitP"
                            value={flightDetails.exitP}
                            onChange={handleChange}
                            className="form-input"
                        />
                  

                    <label className="form-label">
                   :קוד טיסה
                        </label>
                        <input
                            type="text"
                            name="flightCode"
                            value={flightDetails.flightCode}
                            onChange={handleChange}
                            className="form-input"
                        />
                 

                    <label className="form-label">
                 :מחיר
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={flightDetails.price}
                            onChange={handleChange}
                            className="form-input"
                        />
                    

                    <label className="form-label">
                   :יעד
                    </label>
                        <input
                            type="text"
                            name="target"
                            value={flightDetails.target}
                            onChange={handleChange}
                            className="form-input"
                        />
                  

                    <label className="form-label">
                        :תאריך המראה
                        </label>
                        <input
                            type="date"
                            name="departureDate"
                            value={flightDetails.departureDate}
                            onChange={handleChange}
                            className="form-input"
                        />
                  

                    <label className="form-label">
                       :תאריך נחיתה
                       </label>
                        <input
                            type="date"
                            name="arrivalDate"
                            value={flightDetails.arrivalDate}
                            onChange={handleChange}
                            className="form-input"
                        />
          
                    <label className="form-label">
                      :תמונה
                      </label>
                        <input
                            type="text"
                            name="image"
                            value={flightDetails.image}
                            onChange={handleChange}
                            className="form-input"
                        />
                   

                    <label className="form-label">
                        :זמן המראה
                        <input
                            type="time"
                            name="departureTime"
                            value={flightDetails.departureTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </label>

                    <label className="form-label">
                      :זמן נחיתה
                        <input
                            type="time"
                            name="arrivalTime"
                            value={flightDetails.arrivalTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </label>

                    <label className="form-label">
                       :בחר מטוס
                        <select
                            name="airplane_id"
                            value={flightDetails.airplane_id}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">בחר מטוס</option>
                            {airplanes.map((airplane) => (
                                <option key={airplane.id} value={airplane.id}>
                                    {`מטוס מספר: ${airplane.id}, מספר מושבים: ${airplane.num_places}`}
                                </option>
                            ))}
                        </select>
                    </label>

                

                    {formError && <p className="form-error">{formError}</p>}

                    <button type="submit" className="form-button">שלח</button>
                </form>
            </div>
        </div>
    );
}

export default AddFlight;
