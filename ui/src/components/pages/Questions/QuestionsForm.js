import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    InputLabel,
    Button,
    TextField,
    Card,
    CardContent,
  } from "@material-ui/core";
import * as yup from "yup";
import validateCreateQuestionForm from "../../../validations/createQuestionForm";
import { useStyles } from "../../styles/formStyle";

export default function AddQuestion() {
    const classes = useStyles();
    const [createForm, setCreateForm] = useState({
        question: "",
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

    const AddQuestion = async (e) => {
    e.preventDefault(); // Prevents refresh after submit

    try {
        await validateCreateQuestionForm.validate(createForm, {
        abortEarly: false,
        });
        // Create new question
        await axios.post(
        "http://localhost:8000/management/questions/create",
        createForm
        );

        navigate("/faq"); // Redirects after reward is created
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
                        <b>Ask a question</b>
                    </Typography>
                    <CardContent>
                        <form
                            onSubmit={AddQuestion}
                            className={classes.formControl}
                        >
                            <div>
                                <InputLabel htmlFor="question">
                                how can we be of help?
                                </InputLabel>
                                <TextField
                                onChange={updateCreateFormField}
                                value={createForm.question}
                                name="question"
                                id="question"
                                multiline
                                rows={3}
                                inputProps={{
                                    style: { textAlign: "left" },
                                }}
                                className={classes.input}
                                />
                                {error.question && (
                                    <div className={classes.error}>
                                        {error.question}
                                    </div>
                                )}
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    onClick={() =>
                                        navigate("/faq")
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
                                    Send
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}