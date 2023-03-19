import * as yup from "yup";

// Used to validate the create form 
export default yup.object().shape({
    question: yup
    .string()
    .matches(/^[a-zA-Z0-9 ]+[a-zA-Z0-9 ]*[a-zA-Z0-9 ]*[.?]*[a-zA-Z0-9 ]+[a-zA-Z0-9 ]*[a-zA-Z0-9 ]*[.?]*$/, "Question should only have . or ?")
    .required("You must enter a question"),
});