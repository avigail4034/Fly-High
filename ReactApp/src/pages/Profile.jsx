// Profile.jsx

import { Navbar1 } from '../pages/Navbar1';
import BringThemHome from '../pages/BringThemHome';
import '../Styles/Profile.css';
import { useState, useContext, useEffect } from 'react';
import FlightAtScreen from '../components/FlightAtScreen';
import MessageOfCancel from '../components/MessageOfCancel';
import { UserContext } from '../App';

export function Profile() {
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [flightsArray, setFlightsArray] = useState([]);
    const [cancelsArray, setCancelsArray] = useState([]);
    const [flightsData, setflightsData] = useState([]);
    let flightsIds;

    useEffect(() => {
        async function getFlightsOfUser() {
            try {
                //קבלת כל הטיסות שהוזמנו של המשתשמש
                const userId = userDetails.id;
                const orderResponse = await fetch(`http://localhost:3000/Order?user_id=${userId}`, { credentials: 'include' });
                const orders = await orderResponse.json();
                console.log("orders",orders);
                if (orders) {
                     flightsIds = orders.map(item => item.flight_id).join('')
                }

                if (orders) {
                  const  flightsData1 = orders.map(order => ({
                        flight_id: order.flight_id,
                        places: order.place_ids.split(',').map(placeId => ({
                            place_id: placeId,
                            // Additional details for each place can be added here if needed
                        }))
                    }));
                    setflightsData(flightsData1);
                }
                //קבלת כל הטיסות שנמחקו למשתמש
                const cancelResponse = await fetch(`http://localhost:3000/Cancel?userId=${userId}`, { credentials: 'include' });
                const cancels = await cancelResponse.json();
                setCancelsArray(cancels);

               
                if (flightsIds&&flightsIds.length > 0) {
                    const flightsResponse = await fetch(`http://localhost:3000/flights?arrOfFlightsId=${flightsIds}`, { credentials: 'include' });
                    const flights = await flightsResponse.json();
                    setFlightsArray(flights);
                }
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        }

        getFlightsOfUser();
        document.title = 'הפרופיל שלי';
    }, [userDetails]);

    return (
        <>
            <Navbar1 />
            <BringThemHome />
            <div className="page-container">
                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                <h2 className="f-w-600">{userDetails.firstName} {userDetails.lastName}</h2>
                <div className="card-block">
                    <h2>:הודעות</h2>
                    <MessageOfCancel cancels={cancelsArray} />
                    <div className="personal-info">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">:פרטים אישיים</h6>
                        <div className="row">
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">:מספר טלפון</p>
                                <h6 className="text-muted f-w-400">{userDetails.phone}</h6>
                            </div>
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">:כתובת דוא"ל</p>
                                <h6 className="text-muted f-w-400">{userDetails.email}</h6>
                            </div>
                        </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">נתוני טיסות</h6>
                    <div className="row mergeRow">
                        {flightsArray.length !== 0 && flightsArray.map((flight, index) => (
                            <FlightAtScreen
                                key={flight.id}
                                index={index}
                                flight={flight}
                                IOrder={true}
                                numPlaces={flightsData.find(data => data.flight_id === flight.id)?.places.length || 0}
                                places={flightsData.find(data => data.flight_id === flight.id)?.places || []}
                                setFlightsArray={setFlightsArray}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
