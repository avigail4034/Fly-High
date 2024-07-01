// DeletePlaceModal.js

import React from 'react';
import Modal from 'react-modal';
import '../Styles/DeletePlaceScreen.css';

const DeletePlaceScreen = ({ isOpen, onClose, placesDetails, handleCheckboxChange, handleDeletePlace, selectedPlace }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
            contentLabel="Select Place to Delete"
        >
            <h2>בחירת מקומות למחיקה</h2>
            <p>:נא בחר מקומות</p>
            <ul>
                {placesDetails.map((place, index) => (
                    <li key={index}>
                        <p><strong>:שורה</strong> {place.rowP}</p>
                        <p><strong>:עמודה</strong> {place.columnP}</p>
                        <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(place.id, e.target.checked)}
                            checked={place.isChecked}
                        />
                    </li>
                ))}
            </ul>

            <button onClick={handleDeletePlace} disabled={selectedPlace.length === 0}>מחיקה</button>
            <button onClick={onClose}>סגירה</button>
        </Modal>
    );
};

export default DeletePlaceScreen;
