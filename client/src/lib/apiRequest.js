import axios from "axios";

const apiRequest = axios.create({
    baseURL : "https://real-estate-api-afk2.onrender.com/api",
    withCredentials : true,
})

export default apiRequest;