import React, { useState, useContext, useEffect } from 'react';
import FlightDisplayPopUp from './FlightDisplayPopUp';
import { useNavigate } from 'react-router-dom';
import UsersListModal from './UsersListModal';
import DeletePlaceScreen from './DeletePlaceScreen';
import { UserContext } from '../App';
import '../Styles/FlightAtScreen.css';

const FlightAtScreen = (props) => {
    const context = useContext(UserContext);
    const { userDetails } = context;
    const [flight, setFlight] = useState(props.flight);
    const [selectedPlace, setSelectedPlace] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [placesDetails, setPlacesDetails] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalOfAllUsers = () => {
        setIsModalOpen(!isModalOpen);
    };

    const navigate = useNavigate();

    const handleOpenClosedDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleCheckboxChange = (placeId, isChecked) => {
        if (isChecked) {
            const updatedPlaces = placesDetails.map(place => {
                if (place.id === placeId) {
                    return { ...place, isAvailable: 0 };
                }
                return { ...place, isAvailable: 1 };
            });
            setPlacesDetails([...updatedPlaces]);

            setSelectedPlace([...selectedPlace, placeId]);
        } else {
            setSelectedPlace(selectedPlace.filter(id => id !== placeId));
        }
    };

    const handleDeletePlace = async () => {
        if (selectedPlace.length > 0) {
            const url = (`http://localhost:3000/Order?flight_id=${props.flight.id}`);
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        arrPlaces: selectedPlace,
                        userDetails: userDetails,
                    })
                });
                if (response.ok) {
                    console.log('Places deleted successfully');
                    setSelectedPlace([]);
                } else {
                    console.log('Failed to delete places');
                }
            } catch (error) {
                console.error('An error occurred while deleting places', error);
            }
        }

        const airplaneId = flight.airplain_id;
        fetch(`http://localhost:3000/Places/${airplaneId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(placesDetails),
        })
            .then(() => {
                alert("עליך לשלם דמי ביטול");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error making POST request:', error);
                alert(error);
            });
    };

    if (props.IOrder) {//אם הזמנתי טיסה-הבאת המקומות שהזמנתי 
        useEffect(() => {
            async function fetchPlacesDetails() {
                let PlacesIds = [{}];
                PlacesIds = props.places.map(item => item.place_id);
                console.log("PlacesIds",PlacesIds);
                try {
                    const response = await fetch(`http://localhost:3000/Places?arrOfPlacesId=${PlacesIds}`, { credentials: 'include' });
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
        }, [props.places]);
    }

    const deleteFlight = async () => {
        let usersData;
        try {
            //הבאה מטבלת ההזמנות את כל הלקוחות שהזמינו את הטיסה שעכשיו הוא מוחק
            const response = await fetch(`http://localhost:3000/Order?flightId=${props.flight.id}`, { credentials: 'include' });

            if (!response) {
                console.error('Failed to fetch users');
            }
            usersData = await response.json();
            setUsersList(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        console.log(usersData.length, "usersData.length");
        if (usersData.length > 0) {
            try {
                //עדכון טיסה ללא פעילה עד שכל הנוסעים יאשרו את ביטול הטיסה
                const response = await fetch(`http://localhost:3000/flights/${props.flight.id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(props.flight),
                    body: JSON.stringify({ userDetails: userDetails }),
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
        } else {
            //מחיקת הטיסה מטבלת הטיסות
            const url = (`http://localhost:3000/flights/${props.flight.id}`);
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        flight: flight,
                        userDetails: userDetails,
                    })
                });
                if (response) {
                    console.log('Flight deleted successfully');
                    window.location.reload();
                } else {
                    console.log('Failed to delete flight');
                }
            } catch (error) {
                console.error('An error occurred while deleting flight', error);
            }
        }
    };
   
    return (
        <div className='flight-card'>
            <img src={`http://localhost:3000/images/${flight.image}`} alt={flight.id} style={{ credentials: 'include' }} />
            <div className="overlay">
                <h3>Flight {flight.id}</h3>
                <h2>{flight.target}</h2>
                <p>Price: {flight.price}</p>
                <div className='space'>
                    <button className='btnPost' onClick={() => setIsPopupVisible(true)}>פרטים</button>
                    {((userDetails && userDetails.roleId == 2 || userDetails && userDetails.roleId == 1) && !props.IOrder) &&
                        <button className='btnPost' onClick={deleteFlight}>מחיקה</button>}
                    {props.IOrder &&
                        <button className='btnPost' onClick={handleOpenClosedDeleteModal}> ביטול טיסה</button>}
                </div>
            </div>
            {isPopupVisible && (

                <FlightDisplayPopUp
                    flight={props.flight}
                    index={props.index}
                    IOrder={props.IOrder}
                    onClose={() => setIsPopupVisible(false)}
                />
            )}
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
            {isModalOpen && (
                <UsersListModal
                    isOpen={isModalOpen}
                    onClose={handleOpenModalOfAllUsers}
                    users={usersList}
                    flightId={props.flight.id}
                />
            )}
        </div>
    );
};

export default FlightAtScreen;
