import React, { useState } from 'react';
import api from '../api';

const DeleteUserForm = () => {
  const [formData, setFormData] = useState({ username: '', encryptionKey: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.delete('/delete-user', { data: formData });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete User</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="encryptionKey" placeholder="Encryption Key" onChange={handleChange} required />
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteUserForm;
