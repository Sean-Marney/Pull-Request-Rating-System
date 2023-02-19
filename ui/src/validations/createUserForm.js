import * as yup from "yup";

// Used to validate the create form and update form
export default yup.object().shape({
    name: yup.string().required("You must enter a user name"),
    email: yup.string().required("You must enter a user email"),
    password: yup.string().required("You must enter password"),
});
