import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UsersList.css';
import { UserContext } from '../App';
//רשימת לקוחות לצפייה למנהל!!
function UsersAtScreen(props) {
    const context = useContext(UserContext);
    const { userDetails, setUserDetails } = context;
    const navigate = useNavigate();
    const [user, setUser] = useState(props.user);

    const handlePermissionChange = () => {
        let updatedUser;
        if (user.roleId === 3) {
            updatedUser = { ...user, roleId: 2 };
        } else if (user.roleId === 2) {
            updatedUser = { ...user, roleId: 3 };
        }
        setUser(updatedUser);

        // בקשת PUT לשרת לעדכון המשתמש
        fetch(`http://localhost:3000/users/${userDetails.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updatedUser,userDetails}),
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
        <div className="user-card">
            <p className="user-info">{user.firstName} :שם </p>
            <p className="user-info"> {user.lastName} :משפחה</p>
            <p className="user-info"> {user.email} :כתובת אימייל</p>
            <p className="user-info"> תפקיד: {user.roleId === 3 ? 'משתמש' :user.roleId === 2 ? 'עובד':'מנהל'}</p>
            {user.roleId === 3 ? (
                <button onClick={handlePermissionChange}>עדכון להרשאת עובד</button>
            ) : user.roleId === 2 ? (
                <button onClick={handlePermissionChange}>עדכון להרשאת משתמש רגיל</button>
            ) : null}
            <hr />
        </div>
    );
}

export default UsersAtScreen;
