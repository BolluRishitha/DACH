/*import React, { useState } from 'react';
import api from '../api';

const VerifyDataForm = () => {
  const [formData, setFormData] = useState({ userName: '', encryptionKey: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.verifyData(formData);
      alert(res.message || 'User verified successfully!');
    } catch (error) {
      console.error(error);
      alert('Verification failed');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input name="userName" placeholder="Username" onChange={handleChange} required />
      <input name="encryptionKey" placeholder="Encryption Key" onChange={handleChange} required />
      <button type="submit">Verify Data</button>
    </form>
  );
};

export default VerifyDataForm;*/
import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const VerifyDataForm = () => {
  const [formData, setFormData] = useState({ userName: '', encryptionKey: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Log form data to ensure it's correct
    console.log('User Data:', formData);
  
    const data = {
      userName: formData.userName,
      encryptionKey: formData.encryptionKey
    };
  
    try {
      // Log the request data
      console.log("Sending data to server:", data);
  
      await axios.post('http://localhost:5000/api/v1/userVerification/', data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input name="userName" placeholder="Username" onChange={handleChange} required />
      <input name="encryptionKey" placeholder="Encryption Key" onChange={handleChange} required />
      <button type="submit">Verify Data</button>
    </form>
  );
};

export default VerifyDataForm;

