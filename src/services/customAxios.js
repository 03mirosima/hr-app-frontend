import axios from "axios";
const customAxios = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
  },
  baseURL: "http://localhost:8080",
});

export default customAxios;
