// MessageOfCancel.jsx

import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';

const MessageOfCancel = ({ cancels }) => {
    const [cancelsDetails, setCancelsDetails] = useState([{}]);
    const [flightsIdsToCancel, setFlightsIdsToCancel] = useState([]);
    const [haveMessage, setHaveMessage] = useState(false);
    const context = useContext(UserContext);
    const { userDetails } = context;
    useEffect(() => {
        async function fetchCancelsDetails() {
            if (cancels.length > 0) {
                let flightsIdsToCancel1 = [{}]
                flightsIdsToCancel1 = cancels.map(item => item.flight_id)
                setFlightsIdsToCancel(flightsIdsToCancel1);
                if (flightsIdsToCancel.length > 0) {
                    try {
                        //בקשת הטיסות שהתבטלו בשביל התצוגה
                        const response = await fetch(`http://localhost:3000/flights?arrOfFlightsIdToCancel=${flightsIdsToCancel}`);
                        if (response.ok) {
                            const cancels = await response.json();
                            if (cancels.length > 0) {
                                setHaveMessage(true);
                                setCancelsDetails(cancels);
                            }

                        } else {
                            console.error('Failed to fetch cancels details');
                        }
                    } catch (error) {
                        console.error('Error fetching cancels details:', error);
                    }
                }
            }
        }

        fetchCancelsDetails();
    }, [cancels]); // ריענון בכל שינוי ב- props.places

    const handleAgreeCancle = async (id) => {
        //מחיקה מההזמנות לפי ID--- של משתמש ומערך של כל הטיסות לביטול
        const url = `http://localhost:3000/Order?flight_id_arr=${flightsIdsToCancel}&user_id=${userDetails.id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Places deleted successfully');
            } else {
                console.log('Failed to delete places');
            }
        } catch (error) {
            console.error('An error occurred while deleting places', error);
            //לאחר מחיקת ההזמנות- מחיקה ההזמנות מהטבלה של ההזמנות שבוטלו
        } const url2 = `http://localhost:3000/Cancel?flight_id_arr=${flightsIdsToCancel}&user_id=${userDetails.id}`;
        try {
            const response = await fetch(url2, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Places deleted successfully');
                window.location.reload();

            } else {
                console.log('Failed to delete places');
            }
        } catch (error) {
            console.error('An error occurred while deleting places', error);
        }

        console.log(id, "id!!!!!");
        try {
            const data = await fetch(`http://localhost:3000/Cancel?flightId=${id}`);
            const cancelOfFlight = await data.json();
            console.log(cancelOfFlight, "cancelOfFlight");
            if (cancelOfFlight.length>0) { return false; }
            else { alert("נשלחה הודעה למנהל שכולם ביטלו- כשיש מייל למחוק את ההודעה"); }
        }
        catch (error) {
            alert(error);
        }
        ////////////////////////פה להוסיף, את הבדיקה האם כולם בטלו


    }
    return (
        <>
            {haveMessage ? <div className="main-component">
                {cancelsDetails.map((cancel, index) => (
                    <div>
                        <p>Your flight to {cancel.target} was cancelled </p>
                        <button className='btnPost' onClick={() => handleAgreeCancle(cancel.id)}>I am agree</button>

                    </div>
                ))}
            </div> :
                <p>אין לך הודעות חדשות</p>}
        </>
    );
};

export default MessageOfCancel;
