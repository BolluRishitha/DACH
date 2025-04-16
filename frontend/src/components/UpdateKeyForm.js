import React, { useState } from 'react';
import api from '../api';

const UpdateKeyForm = () => {
  const [formData, setFormData] = useState({ username: '', oldKey: '', newKey: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/update-key', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating key');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Encryption Key</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="oldKey" placeholder="Old Encryption Key" onChange={handleChange} required />
      <input name="newKey" placeholder="New Encryption Key" onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateKeyForm;