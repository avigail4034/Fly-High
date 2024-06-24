import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar1 } from './Navbar1';
import BringThemHome from './BringThemHome';
import { IoCodeSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import { BiHappyBeaming } from "react-icons/bi";
import '../Styles/About.css';

const About = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'קצת עלינו...';
    }, []);
    return (
        <>
            <Navbar1></Navbar1>
            <BringThemHome></BringThemHome>
            <div className="main-content" dir='rtl'>
                <div className="container">
                    <section className="find-your-seat">
                        <h1>מצא את מושבך</h1>
                        <p>הזן את גילך, תחביבים והעדפות כדי למצוא את המושב המושלם בטיסה הבאה שלך</p>
                        <button onClick={() => { navigate("/register") }}>הירשם</button>
                    </section>
                    <section className="how-it-works">
                        <h1>איך זה עובד</h1>
                        <div className="steps">
                            <div>
                                <h2><FiUser className='large_icon' /></h2>
                                <h2>קלט משתמש</h2>
                                <p>.אתה מספק את גילך, תחביבים והעדפות</p>
                            </div>
                            <div>
                                <h2><IoCodeSharp className='large_icon' /></h2>
                                <h2>אלגוריתם התאמה </h2>
                                <p>.האלגוריתם החכם שלנו מוצא את המושב המושלם עבורך</p>
                            </div>
                            <div>
                                <h2><MdFlight className='large_icon' /></h2>
                                <h2>המלצת מושב</h2>
                                <p>.אנו מספקים לך את המושב הטוב ביותר לטיסה שלך</p>
                            </div>
                            <div>
                                <h2><BiHappyBeaming className='large_icon' /></h2>
                                <h2>נוסעים מרוצים</h2>
                                <p>.המשתמשים שלנו אוהבים את החוויה האישית</p>
                            </div>
                        </div>
                    </section>
                    <section className="featured-flyers">
                        <h1>נוסעים מובילים</h1>
                        <div className="testimonials">
                            <div>
                                <h2>דניאל ספיר </h2>
                                <p>נוסע קבוע</p>
                                <p>"אני אוהב איך אתם מתאימים לי את המושב המושלם בכל פעם. זה הופך את חווית הטיסה שלי להרבה יותר נעימה"</p>
                            </div>
                            <div>
                                <h2>נועה פרץ</h2>
                                <p>נוסעת לעיתים</p>
                                <p>"הייתי סקפטית בהתחלה, אבל האלגוריתם של האתר הזה באמת מצא לי את המושב המושלם. אני אשתמש בו בכל הטיסות שלי החל מעכשיו"</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default About;
