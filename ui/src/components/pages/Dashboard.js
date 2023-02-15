import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../useAxiosInstance";

function Dashboard() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const { request } = useAxiosInstance();

    function logout() {
        removeCookie("token");
        navigate("/login");
    }

    // async function fetchUsers() {
    //     const response = await request({
    //         method: "get",
    //         url: "/users",
    //     });
    // }

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
