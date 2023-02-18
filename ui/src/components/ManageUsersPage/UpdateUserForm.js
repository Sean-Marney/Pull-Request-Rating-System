import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateUserForm from "../../validations/createUserForm";

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        minHeight: 325,
        padding: "20px 5px",
        margin: "0 auto",
        marginTop: theme.spacing(10),
        boxShadow: theme.shadows[20],
        borderRadius: "20px",
    },
    input: {
        padding: "5px 5px",
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

export default function UpdateUser() {
    const classes = useStyles();
    const [updateForm, setUpdateForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({});

    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        // Get user by id
        const res = await axios.get(
            `http://localhost:8000/management/users/${id}`
        );
        // Set to state (fills in textboxes)
        setUpdateForm({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
        });
    };

    const updateEditFormField = (e) => {
        const { name, value } = e.target;

        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            await validateCreateUserForm.validate(updateForm, {
                abortEarly: false,
            });
            await axios.patch(
                `http://localhost:8000/management/users/update/${id}`,
                updateForm
            );

            navigate("/management/users");
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
                        <b>Update User</b>
                    </Typography>
                    <CardContent>
                        <form onSubmit={updateUser}>
                            <div>
                                <InputLabel>User Name</InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    value={updateForm.name}
                                    name="name"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.name && (
                                    <div style={{ color: "red" }}>
                                        {error.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <InputLabel>Email</InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    value={updateForm.email}
                                    name="email"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.email && (
                                    <div style={{ color: "red" }}>
                                        {error.email}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel>Password</InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    value={updateForm.password}
                                    name="password"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.password && (
                                    <div style={{ color: "red" }}>
                                        {error.password}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={() =>
                                        navigate("/management/users")
                                    }
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    style={{ marginLeft: "30px" }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Update User
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
