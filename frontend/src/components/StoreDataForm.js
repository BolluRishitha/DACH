import React, { useState } from 'react';
import api from '../api';

const StoreDataForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    encryptionKey: '',
    name: '',
    age: '',
    aadhar: '',
    pan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userName: formData.username,
        encryptionKey: formData.encryptionKey,
        mutableData: {
          name: formData.name,
          age: formData.age
        },
        immutableData: {
          aadhar: formData.aadhar,
          pan: formData.pan
        }
      };

      const res = await api.storeData(payload);
      alert(res.message || 'Data stored successfully!');
    } catch (error) {
      console.error(error);
      alert('Error storing data');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="encryptionKey" placeholder="Encryption Key" onChange={handleChange} required />
      <input name="name" placeholder="Name (Mutable)" onChange={handleChange} required />
      <input name="age" placeholder="Age (Mutable)" onChange={handleChange} required />
      <input name="aadhar" placeholder="Aadhar (Immutable)" onChange={handleChange} required />
      <input name="pan" placeholder="PAN (Immutable)" onChange={handleChange} required />
      <button type="submit">Store Data</button>
    </form>
  );
};

export default StoreDataForm;
