import React, { useState, useContext, useEffect } from 'react'
import FlightDisplayPopUp from './FlightDisplayPopUp';
import { useNavigate } from 'react-router-dom';
import UsersListModal from './UsersListModal';
import DeletePlaceScreen from './deletePlaceScreen';
import { UserContext } from '../App';

const FlightAtScreen = (props) => {
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [flight, setFlight] = useState(props.flight);
    const [selectedPlace, setSelectedPlace] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [placesDetails, setPlacesDetails] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let usersData;
    const handleOpenModalOfAllUsers = () => {
        setIsModalOpen(!isModalOpen);
    };
    const navigate = useNavigate();

    // הגדרת מודל לפתיחה וסגירה
    const handleOpenClosedDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    // בעת בחירת מקום למחיקה, עדכון של selectedPlace
    const handleCheckboxChange = (placeId, isChecked) => {
        if (isChecked) {
            const updatedPlaces = placesDetails.map(place => {
                if (place.id === placeId) {
                    return { ...place, isAvailable: 0 };
                }
                return { ...place, isAvailable: 1 };
            });
            setPlacesDetails([...updatedPlaces])

            setSelectedPlace([...selectedPlace, placeId]);
        }
        else {
            setSelectedPlace(selectedPlace.filter(id => id !== placeId));
        }
    };

    // ביצוע מחיקת ההזמנות הנבחרות
    const handleDeletePlace = async () => {
        if (selectedPlace.length > 0) {
            const url = `http://localhost:3000/Order?flight_id=${props.flight.id}`;
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        arrPlaces: selectedPlace
                    })
                });
                if (response.ok) {
                    console.log('Places deleted successfully');
                    setSelectedPlace([]); // איפוס selectedPlace לאחר מחיקה
                } else {
                    console.log('Failed to delete places');
                }
            } catch (error) {
                console.error('An error occurred while deleting places', error);
            }
        }
        // ביצוע  עדכון המקומות הנבחרות
        const airplaneId = props.flight.airplain_id;
        fetch(`http://localhost:3000/Places/${airplaneId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(placesDetails),
        })
            .then(() => {
                alert("עליך לשלם דמי ביטול")
                window.location.reload();

            })
            .catch(error => {
                console.error('Error making POST request:', error);
                alert(error);
            });


    };

    // טעינת הנתונים עבור placesDetails בפעם הראשונה עם useEffect
    //כל הנתונים של הטיסות- בשביל מיקום מדויק- שורה ועמודה
    if (props.IOrder) {
        useEffect(() => {
            async function fetchPlacesDetails() {
                let PlacesIds = [{}]
                PlacesIds = props.places.map(item => item.place_id)
                try {
                    const response = await fetch(`http://localhost:3000/Places?arrOfPlacesId=${PlacesIds}`);
                    if (response.ok) {
                        const places = await response.json();
                        setPlacesDetails(places);
                    } else {
                        console.log('Failed to fetch places details');
                    }
                } catch (error) {
                    console.error('Error fetching places details:', error);
                }
            }

            fetchPlacesDetails();
        }, [props.places]); // ריענון בכל שינוי ב- props.places
    }
    const deleteFlight = async () => {


        try {//כל האנשים שהזמינו תטיסה הזו
            const response = await fetch(`http://localhost:3000/Order?flightId=${props.flight.id}`);

            if (!response) {
                console.error('Failed to fetch users');
            }
            usersData = await response.json();
            setUsersList(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
            // טיפול בשגיאה, לדוגמה: הצגת הודעת שגיאה למשתמש
        }

        if (usersData.length > 0) {//אם יש אנשים שהזמינו את הטיסה
            try {
                const response = await fetch(`http://localhost:3000/flights/${props.flight.id}`, {//עדכון טיסה לא פעילה 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(props.flight),
                });

                if (!response) {
                    throw new Error('Failed to update flight details');
                }
            } catch (error) {
                console.error('Error updating flight details:', error.message);
                throw error;
            }
            alert("אינך יכול למחוק את הטיסה, כיון שנרשמו אליה כבר. לצפיה ברשימת הנוסעים לחץ אישור.");
            handleOpenModalOfAllUsers();
        }
        else {
          
           
            const url = `http://localhost:3000/flights/${props.flight.id}`;//אם אין אנשים שהזמינו את הטיסה-מחיקת הטיסה
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                       flight
                    )
                });
                if (response) {
                    console.log('flight deleted successfully');
                   window.location.reload();

                } else {
                    console.log('Failed to delete flight');
                }
            } catch (error) {
                console.error('An error occurred while deleting flight', error);
            }
        }
    }
    return (
        <div>
            <h3>Flight {flight.id}</h3>
            <h2>{flight.target}</h2>
            <p>Price: {flight.price}</p>
            <img
  src={`http://localhost:3000/images/${flight.image}`}
  alt={flight.id}
  style={{ maxWidth: '30%', height: 'auto' }}
/>

            {/* נתונים רק אם הגעת מפרופיל הטיסות שהזמנת */}
            {props.IOrder && (
                <div>
                    <p>Num of places: {props.numPlaces}</p>
                    <p>Places:</p>
                    {<div style={{ whiteSpace: 'nowrap' }}>
                        {placesDetails.map((place, index) => (
                            <span key={index} style={{ display: 'inline-block', marginRight: '10px', marginBottom: '10px', border: '1px solid #ccc', padding: '5px' }}>
                                <p><strong>Row:</strong> {place.rowP}</p>
                                <p><strong>Column:</strong> {place.columnP}</p>
                                {/* סימון ובחירת מקום למחיקה */}
                            </span>
                        ))}
                    </div>}
                </div>
            )}

            {/* כפתור להצגת פרטים */}
            <button className='btnPost' onClick={() => setIsPopupVisible(!isPopupVisible)}>Details</button>
            {((userDetails.roleId == 2 || userDetails.roleId == 1) && !props.IOrder) && <button className='btnPost' onClick={deleteFlight}>Delete</button>}
            {(usersList.length > 0 ? <UsersListModal isOpen={isModalOpen} onClose={handleOpenModalOfAllUsers} users={usersList} flightId={props.flight.id} /> : null)}
            {/* כפתור למחיקת מקום בטיסה */}
            {props.IOrder && <button className='btnPost' onClick={handleOpenClosedDeleteModal}>Delete Place</button>}

            {/* מודל לבחירת מקום למחיקה */}
            {isDeleteModalOpen && (
                <DeletePlaceScreen
                    isOpen={isDeleteModalOpen}
                    onClose={handleOpenClosedDeleteModal}
                    placesDetails={placesDetails}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDeletePlace={handleDeletePlace}
                    selectedPlace={selectedPlace}
                />
            )}

            {/* חלון פרטים נוספים */}
            {isPopupVisible && (
                <FlightDisplayPopUp flight={props.flight} index={props.index} IOrder={props.IOrder} />
            )}
        </div>
    );
};

export default FlightAtScreen;
