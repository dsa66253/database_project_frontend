import axios from 'axios';

const instance = axios.create({
  baseURL: `https://1ed9-140-112-26-145.jp.ngrok.io/`,
  headers:{
    "ngrok-skip-browser-warning":"any"
  }
});

export default instance;