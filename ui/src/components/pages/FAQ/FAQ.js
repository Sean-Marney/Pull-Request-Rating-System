import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Button, Paper } from "@material-ui/core";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import Pagination from "../../reusable/Pagination";
import { useStyles } from "../../styles/Repositories/RepositoryStyle";

export default function ManageFaqs() {
  const classes = useStyles();
  const [question, setQuestion] = useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(5);
  const navigate = useNavigate();
  

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    // Get faqs
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/management/manageFaqs"
    );

    // Set to state
    setQuestion(res.data);
  };

  // handling the accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // handling pagination
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 5);
  };

  return (
    <div>
       <Paper className={classes.paper}>
      <Box padding={3}>
        <Typography variant="h4">
          <b>FAQ</b>
        </Typography>
      </Box>

      <Box padding={5}>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            margin: 40,
          }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/faq/ask")}
        >
          <QuizIcon /> Ask A Question
        </Button>

        {/* Get all FAQs from database and display on a card */}
        {question &&
          question.slice(0, visible).map((q) => (
            <Accordion
              sx={{ maxWidth: 3500 }}
              key={q._id}
              style={{ padding: 6, margin: 35 }}
            >
              <AccordionSummary
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                expandIcon={
                  <ExpandCircleDownIcon style={{ color: "#1b2437" }} />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="body2" color="text.secondary">
                  <div style={{ color: "red" }}>
                    {" "}
                    <PsychologyAltIcon />{" "}
                  </div>
                  <h3>Question</h3>
                  <br></br>
                  <Typography paragraph>{q.question}</Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <h3>Answer</h3>
                <br></br>
                <Typography paragraph>{q.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

        <div>
        </div>
      </Box>
      </Paper>
      <Pagination
            handlePageClick={handlePageClick}
          />
    </div>
  );
}
