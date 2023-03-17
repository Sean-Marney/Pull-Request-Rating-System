import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

// Used to validate the create user form and update form
export default yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
});
