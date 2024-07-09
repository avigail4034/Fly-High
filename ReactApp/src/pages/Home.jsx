import React from 'react';
import { Button } from 'react-bootstrap';
import { Navbar1 } from './Navbar1';
import '../Styles/HomePage.css';
import firstImage from '../Imgs/topImage.jpg';
import secondImage from '../Imgs/iamge.jpg';
import thirdImage from '../Imgs/buttomImage.jpg';
import { useState, useContext,useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

export function Home() {
  useEffect(() => {
    document.title = 'עמוד ראשי';
  })
const navigate = useNavigate();
    const context = useContext(UserContext);
    const { userDetails,setUserDetails } = context;
  return (
    <>
      <Navbar1 />
      <div className="homepage">
        <section className="header section">
          <div className="content" dir='rtl'>
            <h1>גלו את העולם עם Fly High</h1>
            <p>חוו את הריגוש שבנסיעה עם שירותי הטיסה המובילים שלנו. הזמינו את ההרפתקה הבאה שלכם היום!</p>
            <div className="button-group" dir='ltr'>
              <Button variant="primary" className="custom-button" onClick={() => navigate("/register")}>הירשם</Button>
              <Button variant="secondary" className="custom-button"onClick={() => navigate("/Flights")}>גלו מבצעים</Button>
            </div>
          </div>
          <div className="image-placeholder">
            <img src={firstImage} alt="Top Image" />
          </div>
        </section>
        <section className="white-section section">
          <div className="image-placeholder">
            <img src={secondImage} alt="Second Image" />
          </div>
          <div className="content" dir='rtl'>
            <h2>טסים עם חברים חדשים</h2>
            <p>
              אנו מתאימים לכם שכנים לטיסה על בסיס גיל, תחביבים ורצונות לפעילות בטיסה, כך שתוכלו ליהנות מחוויית טיסה נעימה ונעימה יותר. התחילו עכשיו ובחרו את השכן המושלם לטיסה שלכם!
            </p>
            {/* <p>
              עם הפלטפורמה הקלה לשימוש שלנו, תוכלו לחפש טיסות, להשוות מחירים ולהזמין מושבים בלחיצה אחת. הצוות שלנו תמיד כאן לעזור לכם למצוא את היעד המושלם, מלהמליץ על המקומות הטובים ביותר לביקור ועד מתן טיפים מקומיים.
            </p> */}
            <div className="button-group" dir='ltr'>
              <Button variant="primary" className="custom-button"onClick={() => navigate("/about-us")}>למד עוד</Button>
              <Button variant="secondary" className="custom-button">צור קשר</Button>
            </div>
          </div>
        </section>

        <section className="header section">
          <div className="content" dir='rtl'>
            <h2> חווית טיסה אישית ונעימה</h2>
            <p>
              חווית הטיסה שלכם חשובה לנו. אנו מציעים התאמה אישית של שכנים לטיסה על בסיס גיל, תחביבים ופעילויות מועדפות בטיסה, כדי שתוכלו לבלות בטיסה בצורה הכי נוחה ונעימה. הצטרפו עכשיו ותיהנו מטיסה מושלמת!
            </p>
            <div className="button-group" dir='ltr'>
              <Button variant="primary" className="custom-button" onClick={() => navigate("/Flights")}>ראה מבצעים</Button>
              <Button variant="secondary" className="custom-button" onClick={() => navigate("/Flights")}>הזמינו עכשיו</Button>
            </div>
          </div>
          <div className="image-placeholder">
            <img src={thirdImage} alt="Bottom Image" />
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About FlyHigh</h3>
              <p>FlyHigh is a leading travel booking platform that makes it easy to find and book flights, hotels, and vacation packages.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>Home</li>
                <li>Flights</li>
                <li>Seats</li>
                <li>About</li>
                <li>Contact</li>
                <li>Deals</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Customer Support</h3>
              <ul>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Feedback</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Subscribe to our Newsletter</h3>
              <input type="email" placeholder="Enter your email" />
              <Button variant="primary" className="subscribe-button">Subscribe</Button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FlyHigh. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
export default Home;