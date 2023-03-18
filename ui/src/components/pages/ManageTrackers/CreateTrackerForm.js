import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateTrackerForm from "../../../validations/createTrackerForm";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/formStyle";

export default function CreateTracker() {
    const classes = useStyles();
    const { request } = useAxiosInstance();
    const [createForm, setCreateForm] = useState({
        name: "",
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const updateCreateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm, // Duplicates object
            [name]: value,
        });
    };

    const createTracker = async (e) => {
        e.preventDefault(); // Prevents refresh after submit

        try {
            await validateCreateTrackerForm.validate(createForm, {
                abortEarly: false,
            });

            await request({
                method: "post",
                url: "/management/trackers/create",
                data: { ...createForm },
            });

            navigate("/management/trackers"); // Redirects after reward is created
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
                    <Typography variant="h4" className={classes.title}>
                        <b>Create New Tracker</b>
                    </Typography>
                    <CardContent>
                        <form
                            onSubmit={createTracker}
                            className={classes.formControl}
                        >
                            <div>
                                <InputLabel htmlFor="name">
                                    Tracker Name
                                </InputLabel>
                                <Input
                                    onChange={updateCreateFormField}
                                    value={createForm.name}
                                    name="name"
                                    id="name"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.name && (
                                    <div className={classes.error}>
                                        {error.name}
                                    </div>
                                )}
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    onClick={() =>
                                        navigate("/management/trackers")
                                    }
                                    variant="contained"
                                    style={{ marginRight: "20px" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Create Tracker
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
