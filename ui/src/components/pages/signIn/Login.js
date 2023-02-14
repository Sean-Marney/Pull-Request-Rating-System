import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user = {
            email: form.email.value,
            password: form.password.value,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/login`,
                user
            );
            if (response.data.token) {
                setCookie("token", response.data.token, { path: "/" });
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input required type="email" name="email" />
            <label htmlFor="password">Password</label>
            <input required type="password" name="password" />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Login;
