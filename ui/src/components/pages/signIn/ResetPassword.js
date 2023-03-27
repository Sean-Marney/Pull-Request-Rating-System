import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
} from "@material-ui/core";
import updatePasswordForm from "../../../validations/updatePasswordForm";
import * as yup from "yup";
import { useStyles } from "../../styles/formStyle";
import UpdateUser from "../ManageUsers/UpdateUserForm";

export default function ResetPassword() {
    const classes = useStyles();
    const { state } = useLocation();
    const [updateForm, setUpdateForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const updateEditFormField = (e) => {
        const { name, value } = e.target;

        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        console.log("inside the updateuser method:");
        console.log(state.email);

        try {
            if (!state.email) {
                throw new Error("Email is undefined");
            }
            
            await updatePasswordForm.validate(updateForm, {
                abortEarly: false,
            });
            console.log("after form validation")
            await axios.patch(
                `http://localhost:8000/management/users/updatePassword/email/${state.email}`,
                updateForm
            );
            navigate("/login");
        } catch (error) {
            const validationErrors = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setError(validationErrors);
            }
        }
    };

    return (
        <div>
            <div>
                <Card className={classes.card}>
                    <Typography variant="h4">
                        <b>Change Password</b>
                    </Typography>
                    <CardContent>
                        <form>
                            {/* password */}
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel htmlFor="password">
                                    New Password{" "}
                                </InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputProps={{
                                        style: { textAlign: "left" },
                                    }}
                                    className={classes.input}
                                />
                                {error.password && (
                                    <div style={{ color: "red" }}>
                                        {error.password}
                                    </div>
                                )}
                            </div>

                            {/* confirm password */}
                            <div>
                                <InputLabel htmlFor="password">
                                    Confirm Password{" "}
                                </InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    inputProps={{
                                        style: { textAlign: "left" },
                                    }}
                                    className={classes.input}
                                />
                                {error.confirmPassword && (
                                    <div style={{ color: "red" }}>
                                        {error.confirmPassword}
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    style={{ marginLeft: "30px" }}
                                    onClick={(e) => updateUser(e)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
