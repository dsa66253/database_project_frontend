import axios from 'axios';
// import * as dotenv from "dotenv"
// dotenv.config()
console.log("rocess.env.test",process.env.REACT_APP_TEST)
console.log("rocess.env.BACKEND_URL",process.env.REACT_APP_BACKEND_URL, process.env)
const apiBase = process.env.REACT_APP_BACKEND_URL
const instance = axios.create({
  baseURL: apiBase,
  headers:{
    "ngrok-skip-browser-warning":"any"
  }
});

export default instance;