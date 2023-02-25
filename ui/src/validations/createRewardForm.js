import * as yup from "yup";

// Used to validate the create form and update form
export default yup.object().shape({
  rewardName: yup.string().required("You must enter a reward name"),
  starsRequired: yup
    .number()
    .typeError("Stars required must be a number")
    .required("You must enter a star requirement"),
});
