import axios from 'axios';

const instance = axios.create({
  baseURL: `http://140.112.26.145:4000/`,
  headers:{
    "ngrok-skip-browser-warning":"any"
  }
});

export default instance;