// MessageOfCancel.jsx

import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';

const MessageOfCancel = ({ cancels }) => {
    const [cancelsDetails, setCancelsDetails] = useState([{}]);
    const [flightsIdsToCancel, setFlightsIdsToCancel] = useState([]);
    const [employeesArray, setEmployeesArray] = useState([]);
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
                        const response = await fetch(`http://localhost:3000/flights?arrOfFlightsIdToCancel=${flightsIdsToCancel}`,{credentials: 'include'});
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
        //מחיקת הזמנת הטיסות לאחר שהלקוח מאשר שראה שהתבטלו לו הטיסות
        const url = `http://localhost:3000/Order?flight_id_arr=${flightsIdsToCancel}&user_id=${userDetails.id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userDetails:userDetails}), // המרת userDetails לתבנית JSON
            });
            if (response.ok) {
                console.log('Order deleted successfully');
            } else {
                console.log('Failed to delete Order');
            }
        } catch (error) {
            console.error('An error occurred while deleting places', error);
            
            //לאחר מחיקת ההזמנות- מחיקה ההזמנות מהטבלה של ההזמנות שבוטלו
        }
        const url2 = `http://localhost:3000/Cancel?flight_id_arr=${flightsIdsToCancel}&user_id=${userDetails.id}`;
        try {
            const response = await fetch(url2, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails), // המרת userDetails לתבנית JSON
            });
            if (response.ok) {
                console.log(' Cancel deleted successfully');
                window.location.reload();

            } else {
                console.log('Failed to delete Cancel');
            }
        } catch (error) {
            console.error('An error occurred while deleting Cancel', error);
        }

        console.log(id, "id!!!!!");
        try {
            //כל פעם שלקוח מוחק טיסה- יהיה בדיקת שרת האם כל המזמינים של הטיסה אישרו שהם ראו- אם כן שליחת הודעה למנהל שניתן למחוק סופית את הטיסה
            const data = await fetch(`http://localhost:3000/Cancel?flightId=${id}`,{credentials: 'include'});
            const cancelOfFlight = await data.json();
            console.log(cancelOfFlight, "cancelOfFlight");
            if (cancelOfFlight.length>0) { return false; }
            else {
                //////////////מביאים את כל העובדים והמנהלים כדי לשלוח להם מייל שניתן למחוק סופית של הטיסה--------------------------------------------------------לא עובד
                try {
                    const data = await fetch(`http://localhost:3000/users?roleId=${1}`,{credentials: 'include'});
                    const employees = await data.json();

                    setEmployeesArray(employees);
                }
                catch (error) {
                    alert(error);
                }
                try {
                // שליחת מייל לכל אחד מהמשתמשים
                await Promise.all(employeesArray.map(async (employee) => {
                  const templateParams = {
                    from_name: `FLY-HIGH`,
                    to_name: `${employee.firstName} ${employee.lastName}`,
                    to_email: employee.email,
                    message: ` ניתן למחוק סופית את טיסה  ${id} כל הנוסעים אישרו ביטול. `,
                  };
                  // שליחת המייל באמצעות EmailJS
                  await emailjs.send('service_3d97smk', 'template_mugrt4p', templateParams, 'brqCSjHygkRyZhacH');
                }));
                console.log("ההודעה נשלחה לעובדים");
              } catch (error) {
                console.error('שגיאה בשליחת המייל:', error);
                console.log('נכשל לשלוח הודעה לעובדים');
              } }
        }
        catch (error) {
            alert(error);
        }



    }
    return (
        <>
            {haveMessage ? <div className="main-component">
                {cancelsDetails.map((cancel, index) => (
                    <div>
                        <p>{cancel.target} </p>
                        <p>הטיסה התבטלה </p>
                        <button className='btnPost' onClick={() => handleAgreeCancle(cancel.id)}>אישור</button>

                    </div>
                ))}
            </div> :
                <p>אין לך הודעות חדשות</p>}
        </>
    );
};

export default MessageOfCancel;
