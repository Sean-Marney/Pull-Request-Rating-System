import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
} from "@material-ui/core";
// import {ExpandMore} from "@material-ui/icons";
import { Collapse, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { color } from "@mui/system";


export default function ManageFaqs() {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    // Get faqs
    const res = await axios.get("http://localhost:8000/management/manageFaqs");

    // Set to state
    setQuestion(res.data);
  };
  

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
  <div>
      <Box padding={3}>
        <Typography variant="h4">
           <b>FAQ</b>
         </Typography>
      </Box>

    <Box padding={5}>
    {/* Get all FAQs from database and display on a card */}
    {question &&
      question.map((q) => (
        <Accordion  sx={{ maxWidth: 3500 }} key={q._id} style={{ padding: 6, margin:35 }}>
          <AccordionSummary
          expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
            expandIcon={<TipsAndUpdatesIcon style={{ color: "#1b2437" }}/>}
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
        <Pagination count={3} variant="outlined" color="primary" style={{ display: "flex", justifyContent:"center" }} />
    </Box>
  </div>
  );
}
