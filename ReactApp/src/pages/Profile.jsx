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
    useEffect(() => {
        async function getFlightsOfUser() {
            try {//כל הטיסות של המשתמש
                const userId = userDetails.id;
                const orderResponse = await fetch(`http://localhost:3000/Order?user_id=${userId}`);
                const orders = await orderResponse.json();
                const flightsIds = orders.map(item => item.flight_id).join('');//מערך של ID של הטיסות
                const flightsData = orders.map(order => ({//בניית מערך שיכיל בכל תא את מספר המקומות בשביל התצוגה של הטיסה
                    flight_id: order.flight_id,
                    places: order.place_ids.split(',').map(placeId => ({
                        place_id: placeId,
                        // אם יש צורך להוסיף פרטים נוספים עבור כל מקום, ניתן להוסיף אותם כאן
                    }))
                }));

                const cancelResponse = await fetch(`http://localhost:3000/Cancel?userId=${userId}`);
                const cancels = await cancelResponse.json();
                setCancelsArray(cancels);

                setflightsData(flightsData);
                if (flightsIds.length > 0) {//כל פרטי הטיסות של המשתמש
                    const flightsResponse = await fetch(`http://localhost:3000/flights?arrOfFlightsId=${flightsIds}`);
                    const flights = await flightsResponse.json();
                    setFlightsArray(flights);
                }
            } catch (error) {
                console.error('Error fetching flights:', error);
                alert(error);
            }
        }

        getFlightsOfUser();
        document.title = 'הפרופיל שלי';
    }, [userDetails]);

    return (
        <>
            <Navbar1 />
            <BringThemHome />
            <div className="page-content page-container" id="page-content">
                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
            </div>
            <h5 className="f-w-600">{userDetails.firstName} {userDetails.lastName}</h5>
            <div className="col-sm-8">
                <div className="card-block">
                    <h2>הודעות</h2>
                        <MessageOfCancel  cancels={cancelsArray} />
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">פרטים אישיים</h6>
                    <div className="row">
                        <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">מספר טלפון</p>
                            <h6 className="text-muted f-w-400">{userDetails.phone}</h6>
                        </div>
                        <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">כתובת דוא"ל</p>
                            <h6 className="text-muted f-w-400">{userDetails.email}</h6>
                        </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">נתוני טיסות</h6>
                    <div className="row mergeRow">
                        {flightsArray.length !== 0 && flightsArray.map((flight, index) => {
                            return (
                                <FlightAtScreen key={flight.id} index={index} flight={flight} IOrder={true} numPlaces={flightsData.find(data => data.flight_id === flight.id)?.places.length || 0} places={flightsData.find(data => data.flight_id === flight.id)?.places || []} />
                            );
                        })}

                    </div>
                </div>
            </div>
           
        </>
    );
}
export default Profile;
