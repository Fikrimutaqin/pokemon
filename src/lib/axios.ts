// Axios
import axios from 'axios';

// Axios Instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Export Axios Instance
export default axiosInstance;