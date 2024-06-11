/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import Header from '../Header/Header';
import './contactUs.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
function Contact() {
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const sendMessage = useCallback(async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8001/api/sendMessage', { email, telephone, message });
      toast.success('Sent With Success !')
      setEmail('');
      setTelephone('');
      setMessage('');
      setErrorMessage('');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrorMessage('Failed to send message. Please try again later.');
      }
    }
  }, [email, telephone, message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'telephone':
        setTelephone(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <div className="cardForm">
      <Toaster position="top-center" />
        {errorMessage && <div className="error">{errorMessage}</div>}
        <p className="heading">Contact US Now </p>
        <div className="input-div">
          <input type="text" className="input" name="email" onChange={handleInputChange} value={email} placeholder="Email" />
          {errors.email && <div className="text-primary">{errors.email[0]}</div>}
        </div>
        <div className="input-div">
          <input className="input" type="text" name="telephone" onChange={handleInputChange} placeholder="Phone" value={telephone} />
          {errors.telephone && <div className="text-primary">{errors.telephone[0]}</div>}
        </div>
        <div className="input-div">
          <input className="input" type="text" name="message" onChange={handleInputChange} placeholder="Your Message" value={message} />
          {errors.message && <div className="text-primary">{errors.message[0]}</div>}
        </div>
        <div className="button-div">
          <button className="submit" onClick={sendMessage}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Contact;
