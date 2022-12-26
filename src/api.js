import axios from 'axios';

const instance = axios.create({
  baseURL: `http://332a-159-117-84-78.ngrok.io`,
});

export default instance;