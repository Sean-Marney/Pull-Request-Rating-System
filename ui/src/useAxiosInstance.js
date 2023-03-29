import axios from "axios";
import { useCookies } from "react-cookie";

// Custom hook that creates and returns an instance of the Axios library for making HTTP requests to a specified base URL
const useAxiosInstance = () => {
    const [cookies] = useCookies(["user"]);
    const requestInstance = axios.create({
        headers: {
            "x-access-token": cookies.token ? cookies.token.split(" ")[1] : null,
        },
        baseURL: process.env.REACT_APP_API_ENDPOINT,
    });

    return { request: requestInstance };
};
export default useAxiosInstance;
