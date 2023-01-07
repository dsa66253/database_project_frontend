import axios from 'axios';

const instance = axios.create({
  baseURL: `http://140.112.26.145:4000/`,
});

export default instance;