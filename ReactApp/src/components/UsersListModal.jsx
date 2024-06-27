import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import emailjs from 'emailjs-com';

const UsersListModal = ({ isOpen, onClose, users, flightId }) => {
  const [usersArray, setUsersArray] = useState([{}]);
  const [canceledArray, setCanceledArray] = useState([{}]);
  const userIds = Array.from(new Set(users.map(item => item.user_id)));
  useEffect(() => {
    async function getUsersByIds() {
      try {
        const usersResponse = await fetch(`http://localhost:3000/users?arrOfUsersId=${userIds}`);
        const users = await usersResponse.json();
        setUsersArray(users);
      }
      catch (error) {
        console.error('Error fetching users:', error);
        alert(error);
      }



    }
    getUsersByIds();
  }, []);
  const handleMessageToPassengers = async () => {

    try {
      // שליחת מייל לכל אחד מהמשתמשים
      await Promise.all(usersArray.map(async (user) => {
        const templateParams = {
          from_name: `FLY-HIGH`,
          to_name: `${user.firstName} ${user.lastName}`,
          to_email: user.email,
          message: ` טיסה מספר   ${flightId} שהזמנת בוטלה. נא הכנס לפרופיל שלך כדי לאשר ביטול. `,
        };
        // שליחת המייל באמצעות EmailJS
        await emailjs.send('service_3d97smk', 'template_mugrt4p', templateParams, 'brqCSjHygkRyZhacH');
      }));
      alert('ההודעה נשלחה לנוסעים');
    } catch (error) {
      console.error('שגיאה בשליחת המייל:', error);
      alert('נכשל לשלוח הודעה לנוסעים');
    }
    //////////////

    try {
      const response = await fetch(`http://localhost:3000/Cancel/${flightId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userIds),
      });
      const result = await response.json();
      if (result) {
        alert('ההודעה נשלחה');
      } else {
        alert('נכשל לבצע את הביטול');
      }
    } catch (error) {
      console.error(error);
    }




    window.location.reload();

  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Users List Modal"
    >
      <h2>Users List</h2>
      <ul>
        {usersArray.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
      <button onClick={handleMessageToPassengers}>שליחת הודעה לנוסעים</button>
    </Modal>
  );
};

export default UsersListModal;
