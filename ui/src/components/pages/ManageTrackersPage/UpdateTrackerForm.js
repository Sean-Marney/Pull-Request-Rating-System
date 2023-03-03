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
import validateCreateTrackerForm from "../../../validations/createTrackerForm";

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
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        width: "100%",
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
    error: {
        color: "red",
        marginBottom: theme.spacing(2),
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(4),
    },

    title: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));

export default function UpdateTracker() {
    const classes = useStyles();
    const [updateForm, setUpdateForm] = useState({
        name: "",
    });

    const [error, setError] = useState({});

    const { id } = useParams(); // Get tracker ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        getTracker();
    }, []);

    const getTracker = async () => {
        // Get reward by id
        const res = await axios.get(
            `http://localhost:8000/management/trackers/${id}`
        );

        // Set to state (fills in textboxes)
        setUpdateForm({
            name: res.data.name,
        });
    };

    const updateEditFormField = (e) => {
        const { name, value } = e.target;

        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    const updateTracker = async (e) => {
        e.preventDefault();

        try {
            await validateCreateTrackerForm.validate(updateForm, {
                abortEarly: false,
            });
            // Update reward
            await axios.patch(
                `http://localhost:8000/management/trackers/update/${id}`,
                updateForm
            );

            navigate("/management/trackers");
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
                        <b>Update Trackers</b>
                    </Typography>
                    <CardContent>
                        <form
                            onSubmit={updateTracker}
                            className={classes.formControl}
                        >
                            <div>
                                <InputLabel htmlFor="name">
                                    Tracker Name
                                </InputLabel>
                                <Input
                                    onChange={updateEditFormField}
                                    value={updateForm.name}
                                    name="name"
                                    id="name"
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
                            <div className={classes.buttonContainer}>
                                <Button
                                    onClick={() =>
                                        navigate("/management/trackers")
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
                                    Update Tracker
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
