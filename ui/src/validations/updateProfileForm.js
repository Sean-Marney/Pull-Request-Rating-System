import * as yup from "yup";

// Used to validate the  update form
export default yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z 0-9]*$/, "Please enter the right format")
        .strict()
        .required("Please enter your full name"),
    email: yup
        .string()
        .email("Please enter a valid email address")
        .matches(
            /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Email form is wrong"
        )
        .required("Email is required"),
    bio: yup
        .string()
        .matches(
          /^[a-zA-Z0-9 .!()]*$/,
          "Bio cannot contain special characters except for . ! ()"
        ),
});
