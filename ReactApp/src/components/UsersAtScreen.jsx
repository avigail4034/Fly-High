import react from 'react';
import { Component } from 'react';
import { useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UsersAtScreen(props) {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const [user, setUser] = useState(props.user);
    const handlePermissionChange = () => {
        let updatedUser;
        if (user.roleId == 3) { updatedUser = { ...user, roleId: 2 }; }
        else {
            if (user.roleId == 2) { updatedUser = { ...user, roleId: 3 }; }
        }
        setUser(updatedUser); // עדכון המצב למשתמש החדש
        // בקשת PUT לשרת לעדכון המשתמש
        fetch(`http://localhost:3000/users/${props.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(() => {
                alert("העדכון הושלם");
            })
            .catch(error => {
                console.error('שגיאה בביצוע בקשת PUT:', error);
                alert(error);
            });
    };
    return (
        <div>
            <p>firstName: {user.firstName}</p>
            <p> lastName: {user.lastName}</p>
            <p>   email: {user.email}</p>
            <p>  roleId:{user.roleId}</p>
            {user.roleId == 3 ? <button onClick={handlePermissionChange}>  עדכון להרשאת עובד </button> : user.roleId == 2 ? <button onClick={handlePermissionChange}>  עדכון להרשאת משתמש רגיל </button> : null}
            <p>-----------------------</p>
        </div>
    );
}


export default UsersAtScreen;

