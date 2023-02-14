import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
    const [cookies, setCookie] = useCookies([]);

    useEffect(async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/users`,
            {
                headers: {
                    "x-access-token": cookies.token.split(" ")[1],
                },
            }
        );
        console.log(response);
    }, []);

    return (
        <div>
            <h1>Redirected after login</h1>
        </div>
    );
}

export default Dashboard;
