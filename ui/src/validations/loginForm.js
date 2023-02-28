import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

// Used to validate the create user form and update form
export default yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .matches(
            /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Please enter your email"
        )
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special case character"
        )
        .required("Please provide a password"),
});
