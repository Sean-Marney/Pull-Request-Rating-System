import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Button,
  Card,
  CardContent,
  Input,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateFAQForm from "../../../validations/createFAQForm";
import { useStyles } from "../../styles/formStyle";

export default function AddQuestions() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    question: "",
    answer: "",
  });

  const [error, setError] = useState({});

  const { id } = useParams(); // Get faq ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    // Get question by id
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/management/questions/${id}`
    );

    // Set to state (fills in textboxes)
    setCreateForm({
      question: res.data.question,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
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
        process.env.REACT_APP_API_ENDPOINT + "/management/manageFaqs/create",
        createForm
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
      <Card className={classes.card}>
        <Typography variant="h4" className={classes.title}>
          <b>Add Question FAQ</b>
        </Typography>
        <CardContent>
          <form onSubmit={createFAQ} className={classes.formControl}>
            <div>
              <InputLabel>Question</InputLabel>
              <Input
                multiline
                rows={3}
                onChange={updateEditFormField}
                value={createForm.question}
                name="question"
                className={classes.input}
              />
              {error.question && (
                <div className={classes.error}>{error.question}</div>
              )}
            </div>
            <div>
              <InputLabel>Answer</InputLabel>
              <Input
                multiline
                rows={3}
                onChange={updateEditFormField}
                //   value={updateForm.answer}
                name="answer"
                className={classes.input}
              />
              {error.answer && (
                <div className={classes.error}>{error.answer}</div>
              )}
            </div>
            <div className={classes.buttonContainer}>
              <Button
                onClick={() => navigate("/management/manageFaqs/questions")}
                variant="contained"
                style={{ marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add FAQ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
