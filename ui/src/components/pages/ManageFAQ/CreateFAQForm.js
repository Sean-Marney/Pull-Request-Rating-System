import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Button,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateFAQForm from "../../../validations/createFAQForm";
import TextField from "@mui/material/TextField";
import { useStyles } from "../../styles/formStyle";

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
        process.env.REACT_APP_API_ENDPOINT + "/management/manageFaqs/create", createForm,{ withCredentials: true},{ withCredentials: true},
      );

      navigate("/management/faqs"); // Redirects after reward is created
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
            <b>Create New FAQ</b>
          </Typography>
          <CardContent>
            <form onSubmit={createFAQ} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="question">Question</InputLabel>

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
                  <div className={classes.error}>{error.question}</div>
                )}
              </div>
              <div>
                <br />
                <InputLabel htmlFor="answer">Answer</InputLabel>
                <TextField
                  onChange={updateCreateFormField}
                  value={createForm.answer}
                  name="answer"
                  id="answer"
                  multiline
                  rows={3}
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                {error.answer && (
                  <div className={classes.error}>{error.answer}</div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/faqs")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
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
