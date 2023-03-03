import * as yup from "yup";

// Used to validate the create form and update form
export default yup.object().shape({
    question: yup
    .string()
    // .matches(/^[a-zA-Z0-9 .?]*$/, "Please enter an answer")
    .matches(/^[a-zA-Z0-9.?]+[a-zA-Z0-9.? ]*[a-zA-Z0-9.?]*$/, "Please enter an answer")
    // /^[a-zA-Z0-9]+[a-zA-Z0-9 ]*[a-zA-Z0-9]+$/gm
    .required("You must enter a question"),
    answer: yup
    .string()
    .matches(/^[a-zA-Z0-9.?]*$/, "Please enter an answer")
    .required("You must enter an answer"),
});
