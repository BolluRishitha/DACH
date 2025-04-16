// src/App.js

import React from 'react';
import StoreDataForm from './components/StoreDataForm.js';
import VerifyDataForm from './components/VerifyDataForm.js';
import UpdateKeyForm from './components/UpdateKeyForm.js';
import DeleteUserForm from './components/DeleteUserForm.js';
import ReduceKeyCountForm from './components/ReduceKeyCountForm.js';

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Decentralized User Data Portal</h1>

      <div style={styles.section}>
        <h2>1. Store User Data</h2>
        <StoreDataForm />
      </div>

      <div style={styles.section}>
        <h2>2. Verify User</h2>
        <VerifyDataForm />
      </div>

      <div style={styles.section}>
        <h2>3. Update User Encryption Key</h2>
        <UpdateKeyForm />
      </div>

      <div style={styles.section}>
        <h2>4. Delete User Data</h2>
        <DeleteUserForm />
      </div>

      <div style={styles.section}>
        <h2>5. Reduce Key Count</h2>
        <ReduceKeyCountForm />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
};

export default App;
