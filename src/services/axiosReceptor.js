import { Alert } from "@mui/material";
import axios from "axios";

//creating an axios instance
const axiosReceptor = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // This attaches cookies (e.g., refresh token) to the request
});

/** Interceptor for requests sent from the application: 
retrieve the Access Token from localStorage and 
add it to every API request made using the axios instance.
*/
axiosReceptor.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/** Interceptor for responses received by the application: 
check if the response indicates an expired access token, and 
if so, send a refresh token request to obtain a new access token and
retry the original request using the updated token.
Here the refresh token is stored as cookies.
*/
axiosReceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response === undefined) {
      return null;
    }
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.get(
          "http://localhost:8000/auth/refresh-token",
          {
            withCredentials: true, // This attaches cookies (e.g., refresh token) to the request
          }
        );
        if (response) {
          //update the access token
          localStorage.setItem("accessToken", response.data.accessToken);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          return axiosReceptor(originalRequest);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosReceptor;
