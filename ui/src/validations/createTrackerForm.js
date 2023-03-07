import * as yup from "yup";

// Used to validate the create tracker form and update tracker form
export default yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z ]*$/, "Tracker name may only contain letters")
        .strict()
        .max(20, "Tracker name must be max 50 characters long")
        .required("Please enter the tracker name"),
});