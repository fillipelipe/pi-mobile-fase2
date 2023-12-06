import axios from 'axios';

const firebaseAxios = axios.create({
  baseURL: "https://prestador-c3f71-default-rtdb.firebaseio.com",
});

export default firebaseAxios;
