import * as yup from "yup";

// Used to validate the create form and update form
export default yup.object().shape({
    question: yup.string().required("You must enter a question"),
    answer: yup.string().required("You must enter an answer"),
});
