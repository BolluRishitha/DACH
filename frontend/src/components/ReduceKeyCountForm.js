import React, { useState } from 'react';
import api from '../api';

const ReduceKeyCountForm = () => {
  const [formData, setFormData] = useState({ username: '', encryptionKey: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/reduce-key-count', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error reducing key count');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reduce Key Count</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="encryptionKey" placeholder="Encryption Key" onChange={handleChange} required />
      <button type="submit">Reduce</button>
    </form>
  );
};

export default ReduceKeyCountForm;