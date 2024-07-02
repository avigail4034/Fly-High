import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UsersList.css';

function UsersAtScreen(props) {
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
        <div className="user-card">
            <p className="user-info">{user.firstName} :שם </p>
            <p className="user-info"> {user.lastName} :משפחה</p>
            <p className="user-info"> {user.email} :כתובת אימייל</p>
            <p className="user-info"> {user.roleId === 3 ? 'Admin' : 'Employee'} :תפקיד</p>
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
