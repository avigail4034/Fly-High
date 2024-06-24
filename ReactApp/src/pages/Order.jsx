import { Navbar1 } from '../pages/Navbar1';
import '../Styles/Order.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export function Order() {
    const context = useContext(UserContext);
    const { userDetails } = context;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const airplaneId = searchParams.get('id');
    const flightId = searchParams.get('flightId');
    const navigate = useNavigate();

    const [seatMap, setSeatMap] = useState([]);
    const [seatMapSelected, setSeatMapSelected] = useState([]);

    const handleOrderOnDBButton = () => {
        const selectedSeats = [];
        seatMap.forEach(row => {
            row.forEach(seat => {
                if (seat.selected) {
                    selectedSeats.push({id:seat.id, airplane_id:airplaneId, rowP:seat.rowP, columnP:seat.columnP, isAvailable:seat.available});
                }
            });
        });

        setSeatMapSelected(selectedSeats);

        fetch('http://localhost:3000/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userDetails.id,
                flight_id: flightId,
                places_arr: selectedSeats
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error making POST request:', error);
            });

        fetch(`http://localhost:3000/Places/${airplaneId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedSeats),
          })
            .then(() => {
             navigate(`/thank`);
            alert("ההרשמה התבצעה בהצלחה");

            })
            .catch(error => {
              console.error('Error making POST request:', error);
              alert(error);
            });

    };

    async function getAirplane() {
        try {
            const data = await fetch(`http://localhost:3000/Places?airplane_id=${airplaneId}`);
            const seats = await data.json();

            const generatedSeatMap = generateSeatMap(seats);
            setSeatMap(generatedSeatMap);
       
       
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getAirplane();
    }, []);

    const generateSeatMap = (seats) => {
        const seatMap = [];

        seats.forEach(seat => {
            if (!seatMap[seat.rowP - 1]) {
                seatMap[seat.rowP - 1] = [];
            }
            seatMap[seat.rowP - 1][seat.columnP - 1] = seat.isAvailable === 1 ? { available: true, selected: false, id: seat.id, rowP:seat.rowP, columnP:seat.columnP } : { available: false, selected: false, id: seat.id , rowP:seat.rowP, columnP:seat.columnP};
       
        });
        return seatMap;
    };

    const toggleSeatSelection = (rowIndex, seatIndex) => {
        if (seatMap[rowIndex][seatIndex].available) {
            const updatedSeatMap = [...seatMap];
            updatedSeatMap[rowIndex][seatIndex].selected = !updatedSeatMap[rowIndex][seatIndex].selected;
            setSeatMap(updatedSeatMap);
        }
    };

    return (
        <>
            <Navbar1 />
            <div className="seat-map-container">
                <div className="seat-map">
                    {seatMap.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            {row.map((seat, seatIndex) => (
                                <label key={seatIndex} className={`seat ${seat.available ? (seat.selected ? 'selected' : 'available') : 'unavailable'}`}>
                                    <input
                                        type="checkbox"
                                        disabled={!seat.available}
                                        checked={seat.selected}
                                        onChange={() => {toggleSeatSelection(rowIndex, seatIndex);}}
                                    />
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" id="signUp" className="button button-block" onClick={handleOrderOnDBButton}>סיום הזמנה</button>
        </>
    );
}

export default Order;
