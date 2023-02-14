import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user = {
            email: form.email.value,
            name: form.name.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value,
        };

        // Check that the passwords match
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/register`,
                user
            );
            if (response.data.isRegistered) {
                navigate("/login");
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
            <input required type="email" name="email" id="email" />
            <label htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" />
            <label htmlFor="password">Password</label>
            <input required type="password" name="password" id="password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                required
                type="password"
                name="confirmPassword"
                id="confirmPassword"
            />

            <input type="submit" value="Register" />
        </form>
    );
}

export default Register;
