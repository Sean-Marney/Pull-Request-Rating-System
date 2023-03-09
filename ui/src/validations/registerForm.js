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
        .required("Please enter your email"),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            "Password may only contain at least one uppercase letter, one lowercase letter, one number and one special case character"
        )
        .required("Please provide a password")
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password must be max 50 characters long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});
