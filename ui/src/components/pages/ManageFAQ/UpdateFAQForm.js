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
      process.env.REACT_APP_API_ENDPOINT + `/management/manageFaqs/${id}`,{ withCredentials: true},
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
        process.env.REACT_APP_API_ENDPOINT +
          `/management/manageFaqs/update/${id}`, updateForm, { withCredentials: true},
      );

      navigate("/management/faqs");
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
                <Input
                  multiline
                  rows={3}
                  onChange={updateEditFormField}
                  value={updateForm.question}
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
                  value={updateForm.answer}
                  name="answer"
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
