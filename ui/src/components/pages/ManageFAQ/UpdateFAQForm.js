import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  InputLabel,
  TextField,
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
  cancelButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
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

  const updateFAQs = async (e) => {
    e.preventDefault();

    try {
      await validateCreateFAQForm.validate(updateForm, {
        abortEarly: false,
      });
      // Update faq
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
          <Typography variant="h4" className={classes.title}>
            <b>Update FAQ</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateFAQs} className={classes.formControl}>
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
              <div>
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
                  <div className={classes.error}>{error.answer}</div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/manageFaqs")}
                  variant="contained"
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
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
