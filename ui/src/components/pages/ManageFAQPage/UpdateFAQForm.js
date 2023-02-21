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
import validateCreateRewardForm from "../../../validations/createRewardForm";
import TextField from "@mui/material/TextField";

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

export default function UpdateFAQs() {
    const classes = useStyles();
    const [updateForm, setUpdateForm] = useState({
        question: "",
        answer: "",
    });

    const [error, setError] = useState({});

    const { id } = useParams(); // Get faq ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = async () => {
        // Get FAQ by id
        const res = await axios.get(
            `http://localhost:8000/management/manageFaqs/${id}`
        );

        // Set to state (fills in textboxes)
        setUpdateForm({
            question: res.data.question,
            answer: res.data.answer,
        });
    };

    const updateEditFormField = (e) => {
        const { name, value } = e.target;

        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    const UpdateFAQs = async (e) => {
        e.preventDefault();

        try {
            await validateCreateRewardForm.validate(updateForm, {
                abortEarly: false,
            });
            // Update reward
            await axios.patch(
                `http://localhost:8000/management/manageFaqs/update/${id}`,
                updateForm
            );

            navigate("/management/manageFaqs");
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
                        <b>Update FAQ</b>
                    </Typography>
                    <CardContent>
                        <form onSubmit={UpdateFAQs}>
                            <div>
                                <InputLabel>Question</InputLabel>
                                <TextField
                                    multiline
                                    rows={3}
                                    onChange={updateEditFormField}
                                    value={updateForm.question}
                                    name="question"
                                    inputProps={{
                                        style: { textAlign: "left" },
                                    }}
                                    className={classes.input}
                                />
                                {error.question && (
                                    <div style={{ color: "red" }}>{error.question}</div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel>Answer</InputLabel>
                                <TextField
                                    multiline
                                    rows={3}
                                    onChange={updateEditFormField}
                                    value={updateForm.answer}
                                    name="answer"
                                    inputProps={{
                                        style: { textAlign: "left" },
                                    }}
                                    className={classes.input}
                                />
                                {error.answer && (
                                    <div style={{ color: "red" }}>{error.answer}</div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={() => navigate("/management/manageFaqs")}
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
                                    Update FAQ
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
