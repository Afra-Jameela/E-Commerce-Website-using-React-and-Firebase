import { useRef } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import emailjs from '@emailjs/browser';
import styles from "./Contact.module.scss"
import Card from '../../components/card/Card'
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_j29m65m', form.current, {
        publicKey: 'Bv92YVoMo56j1zHlA',
      })
      .then(
        () => {
          toast.success("Message Sent Successfully")
          
        },
        (error) => {
          toast.error("error.text")
          
        },
      );
      e.target.reset()
  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label >Name</label>
              <input type="text" name="user_name" placeholder='Full Nmae' required></input>
              <label >Email</label>
              <input type="email" name="user_email" placeholder='Your Active Email' required></input>
              <label >Subject</label>
              <input type="text" name="subject" placeholder='Subject' required></input>
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className='--btn --btn-primary'> Send Message</button>
            </Card>

          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                
                <p>+91 833045734</p>
                </span>
                <span>
                  <MdEmail />
                
                <p>support@luisant.com</p>
                </span>
                <span>
                  <FaLocationDot />
                
                <p>Salem, Tamil Nadu</p>
                </span>
                <span>
                  <IoLogoInstagram />
                
                <p>@LuisantSoftware</p>
                </span>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>

  )
}

export default Contact
