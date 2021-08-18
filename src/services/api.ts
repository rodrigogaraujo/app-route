import axios from "axios";

const api = axios.create({
    baseURL: "https://km.g3infotech.app",
});

export default api;