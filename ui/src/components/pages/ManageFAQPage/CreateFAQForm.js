import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import validateCreateFAQForm from "../../../validations/createFAQForm";
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

export default function CreateFAQ() {
    const classes = useStyles();
    const [createForm, setCreateForm] = useState({
        question: "",
        answer: "",
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

    const createFAQ = async (e) => {
        e.preventDefault(); // Prevents refresh after submit

        try {
            await validateCreateFAQForm.validate(createForm, {
                abortEarly: false,
            });
            // Create new faq
            await axios.post(
                "http://localhost:8000/management/manageFaqs/create",
                createForm
            );

            navigate("/management/manageFaqs"); // Redirects after reward is created
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
                        <b>Create New FAQ</b>
                    </Typography>
                    <CardContent>
                        <form onSubmit={createFAQ}>
                            <div>
                                <InputLabel htmlFor="question">
                                    Question
                                </InputLabel>
                                <Input
                                    onChange={updateCreateFormField}
                                    value={createForm.question}
                                    name="question"
                                    id="question"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.question && (
                                    <div style={{ color: "red" }}>
                                        {error.question}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel htmlFor="answer">
                                    Answer
                                </InputLabel>
                                <Input
                                    onChange={updateCreateFormField}
                                    value={createForm.answer}
                                    name="answer"
                                    id="answer"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.answer && (
                                    <div style={{ color: "red" }}>
                                        {error.answer}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={() =>
                                        navigate("/management/manageFaqs")
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
                                    Create FAQ
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
