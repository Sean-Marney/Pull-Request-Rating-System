import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

// Used to validate the create user form and update form
export default yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Full name may only contain letters")
        .strict()
        .required("Please enter your full name"),
    email: yup
        .string()
        .email("Please enter a valid email address")
        .matches(
            /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Please enter a valid email address"
        )
        .required("Please provide your email"),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            "Password may only contain at least one uppercase letter, one lowercase letter, one number and one special case character"
        )
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password must be max 50 characters long")
        .required("Please provide a password"),
    git_username: yup
        .string()
        .matches(
            /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
            "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen"
        )
        .max(39, "Username is too long (maximum is 39 characters)")
        .required("Please provide your GitHub username"),
});
