import axios from "axios";
import { useCookies } from "react-cookie";

// Custom hook that creates and returns an instance of the Axios library for making HTTP requests to a specified base URL
const useAxiosInstance = () => {
    const [cookies] = useCookies(["user"]);
    const requestInstance = axios.create({
        headers: {
            "x-access-token": cookies.token ? cookies.token.split(" ")[1] : null,
        },
        baseURL: "http://13.49.102.10:8000",
    });

    return { request: requestInstance };
};
export default useAxiosInstance;
