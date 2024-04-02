import axios from "axios";
// import {  } from "./config";
const BASE_URL = "http://68.183.72.136:9000/api/v1/";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    // Get the token from your desired source (e.g., localStorage)
    const token = localStorage.getItem("token");
    // const token = "303|l35M1QkIplrSJleI5p4h8CWKfnTkjgq59LaYwqWE1fc47b4a";

    // Add the Bearer token to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default api;
