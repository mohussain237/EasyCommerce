
// to-do : resolve webpack error technical dept.
import axios from "axios";

const api = axios.create({
 baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
});

export default api;