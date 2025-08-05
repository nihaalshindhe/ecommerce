import axios from 'axios';

const API = process.env.REACT_APP_API_URL; 
console.log(API);
const login = async (email, password) => {
    return await axios.post(`${API}/auth/login`, { email, password });
};

const updateUser = async (userId, updateData) => {
    return await axios.put(`${API}/auth/update/${userId}`, updateData);
};

export default { login, updateUser };
