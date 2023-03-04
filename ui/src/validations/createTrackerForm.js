import * as yup from "yup";

// Used to validate the create tracker form and update form
export default yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Please enter the tracker name")
        .strict()
        .required("Please enter the tracker name"),
});