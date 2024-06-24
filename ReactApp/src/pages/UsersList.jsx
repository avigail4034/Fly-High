import React, { useEffect, useState } from 'react';
import UsersAtScreen from '../components/UsersAtScreen';
import { Navbar1 } from '../pages/Navbar1';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`http://localhost:3000/users`);

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const usersData = await response.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
                // טיפול בשגיאה, לדוגמה: הצגת הודעת שגיאה למשתמש
            }
        }
        fetchUsers();
    }, []);
    return (
        <div>
            <Navbar1 />
            <h2>Users List</h2>
            <div id="boxShow">
                {users.map((user, index) => <UsersAtScreen key={user.id} index={index} user={user}
                />)}
            </div>
        </div>
    );
}
export default UsersList;
