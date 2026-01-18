import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const settingsAPI = axios.create({
    baseURL: `${API_BASE_URL}/settings`,
    headers: {
        'Content-Type': 'application/json'
    }
});

settingsAPI.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('Settings API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default {
    getSettings: () => settingsAPI.get('/'),
    updateSettings: (data) => settingsAPI.put('/', data),
    getMerchantUPI: () => settingsAPI.get('/merchant-upi')
};
