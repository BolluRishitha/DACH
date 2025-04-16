import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';


const api = {
  storeData: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/storeVerification/`, formData);
    return response.data;
  },

  updateKey: async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/userVerification/updateEncryptionKey`, formData);
    return response.data;
  },

  reduceKeyCount: async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/userVerification/reduceKeyUseCount`, formData);
    return response.data;
  },

  verifyData: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/userVerification/`, formData);
    return response.data;
  }
};

export default api;
