import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate } from "react-router-dom";
import { color } from "@mui/system";


export default function ManageFaqs() {
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    // Get faqs
    const res = await axios.get("http://localhost:8000/management/manageFaqs");

    // Set to state
    setQuestion(res.data);
  };

  const [expanded, setExpanded] = React.useState(false); 

  // handling the accordion expansion 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [visible, setVisible] = React.useState(2);
  
  // handling pagination
  const handlePageClick = () =>{
    setVisible(preValue => preValue + 2);
  };
  const handlePageBack = () =>{
    setVisible(postValue => postValue -2);
  };


  return (
  <div>
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
            justifyContent:"center",
            margin: 40
          }}
          variant="contained" 
          color="primary"
          size="large"
          onClick={() => navigate("/faq/ask")}
        >
          <QuizIcon />  Ask A Question 
        </Button>

    {/* Get all FAQs from database and display on a card */}
    {question &&
      question.slice(0, visible).map((q) => (
        <Accordion  sx={{ maxWidth: 3500 }} key={q._id} style={{ padding: 6, margin:35 }}>
          <AccordionSummary
          expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
            expandIcon={<ExpandCircleDownIcon style={{ color: "#1b2437" }}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
          <Typography variant="body2" color="text.secondary" >
          <div style={{ color: "red" }}>    <PsychologyAltIcon /> </div>
           <h3>Question</h3><br></br>
           <Typography paragraph>{q.question}</Typography>
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <h3>Answer</h3><br></br>
          <Typography paragraph>{q.answer}</Typography>
          </AccordionDetails>
        </Accordion>
        ))}

        <div>
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        >
      <Button
          style={{
            display: "flex", 
            justifyContent:"center",
            margin: 40
          }}
          variant="outlined" 
          color="primary"
          size="large"
          onClick={handlePageClick}
        >
          Load More
        </Button>
        <Button
          style={{
            // marginLeft: "20px",
            // marginTop: "20px",
            // marginBottom: "20px",
            display: "flex", 
            justifyContent:"center",
            margin: 40
          }}
          variant="outlined" 
          color="primary"
          size="large"
          onClick={handlePageBack}
        >
          Load Less
        </Button>
        </Stack>
        </div>
    </Box>

   
  </div>
  );
}
