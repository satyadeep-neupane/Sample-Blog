import axios from "axios";
import { toast } from "react-toastify";

// Create an axios instance
const http = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
)

http.interceptors.response.use(
    function (response) {
        if (response.status === 200)
        {
            if (response.data.message)
                toast.success(response.data.message);
            return response.data;
        }
        else
            return response;
    }
)

const httpApi = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
};

export default httpApi;
