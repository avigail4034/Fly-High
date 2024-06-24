import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';

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
