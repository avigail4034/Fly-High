import React, { useEffect, useState } from 'react';
import '../Styles/ThankYou.css'
import { Navbar1 } from '../pages/Navbar1';
const ThankYou = () => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true);
    }, []);

    return (
        <>
            <Navbar1 />
            <div className="thank-you-container">
                {showMessage && (
                    <div className="thank-you-message">
                        <h1>תודה על הזמנתך</h1>
                        <p>הזמנתך התקבלה ותטופל בהקדם האפשרי.</p>
                    </div>
                )}
            </div>
        </>
    );
};
export default ThankYou;
