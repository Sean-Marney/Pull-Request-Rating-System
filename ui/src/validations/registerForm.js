import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

// Used to validate the create user form and update form
export default yup.object().shape({
    name: yup.string().max(50).required("Please enter your full name"),
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(
            8,
            "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
        )
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1)
        .required("Please provide a password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});
