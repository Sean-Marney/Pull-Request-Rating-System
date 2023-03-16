import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
// import {ExpandMore} from "@material-ui/icons";
import { Collapse, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
            <Card sx={{ maxWidth: 345 }} key={q._id}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Question
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {q.question}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  answer
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    ANSWER
                  </Typography>
                  <Typography paragraph>{q.answer}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </Box>
    </div>
  );
}

