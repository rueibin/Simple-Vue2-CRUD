import axios from "axios";

const instance=axios.create({
  baseURL:'http://localhost:7979/',
  headers: { 'Content-Type': 'application/json' },
  timeout:5000
});

export default instance;
