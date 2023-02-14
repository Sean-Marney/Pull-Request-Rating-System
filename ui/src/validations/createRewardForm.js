import * as yup from "yup";

// Used to validate the create form and update form
export default yup.object().shape({
  rewardName: yup.string().required(),
  starsRequired: yup.string().required(),
});
