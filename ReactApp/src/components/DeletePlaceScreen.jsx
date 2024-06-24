// DeletePlaceModal.js

import React from 'react';
import Modal from 'react-modal';

const DeletePlaceScreen = ({ isOpen, onClose, placesDetails, handleCheckboxChange, handleDeletePlace, selectedPlace }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Select Place to Delete"
        >
            <h2>Select Place to Delete</h2>
            <p>Choose the place you want to delete:</p>
            <ul>
                {placesDetails.map((place, index) => (
                    <li key={index}>
                        <p><strong>Row:</strong> {place.rowP}</p>
                        <p><strong>Column:</strong> {place.columnP}</p>
                        <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(place.id, e.target.checked)}
                            checked={place.isChecked}
                        />
                    </li>
                ))}
            </ul>

            <button onClick={handleDeletePlace} disabled={selectedPlace.length === 0}>Confirm Delete</button>
            <button onClick={onClose}>Cancel</button>
        </Modal>
    );
};

export default DeletePlaceScreen;
