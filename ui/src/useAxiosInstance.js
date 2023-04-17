import axios from "axios";
import { useCookies } from "react-cookie";

// Custom hook that creates and returns an instance of the Axios library for making HTTP requests to a specified base URL
const useAxiosInstance = () => {
    const [cookies] = useCookies(["user"]);

    // create a new instance of the axios library
    const requestInstance = axios.create({
        // set the headers to include the user's authentication token (if logged in)
        headers: {
            "x-access-token": cookies.token
                ? cookies.token.split(" ")[1]
                : null,
        },
        // set the base URL for all requests made with this instance
        baseURL: process.env.REACT_APP_API_ENDPOINT,
    });

    // return an object that contains the axios instance
    return { request: requestInstance };
};
export default useAxiosInstance;
