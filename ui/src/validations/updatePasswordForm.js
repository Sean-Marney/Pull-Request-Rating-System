import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

// Used to validate the  update form
export default yup.object().shape({
    password : yup
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