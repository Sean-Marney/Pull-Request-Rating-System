import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Stack from '@mui/material/Stack';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useStyles } from "../../styles/tableStyle";

export default function ManageFAQ() {
  const classes = useStyles();
  const [questions, setQuestions] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    // Get faqs
    const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/management/manageFaqs");

    // Set to state
    setQuestions(res.data);
  };

  const deleteFAQ = async (_id) => {
    // Delete faq
    await axios.delete(
      process.env.REACT_APP_API_ENDPOINT + `/management/manageFaqs/delete/${_id}`
    );

    getFaqs(); // Get updated list of rewards
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4">
            <b>Manage FAQs</b>
          </Typography>
        </Box>
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        >
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/management/manageFaqs/create")}
        >
          Add New FAQ
        </Button>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LiveHelpIcon />}
          onClick={() => navigate("/management/manageFaqs/questions")}
        >
          View New Questions
        </Button>
        </Stack>

        <Box>
          {/* Get all rewards from database and display in a table */}
          {questions && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      <b>Question</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Answer</b>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question._id}>
                      <TableCell className={classes.tableContent}>
                        {question.question}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {question.answer}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Edit FAQ"
                          onClick={() =>
                            navigate(
                              `/management/manageFaqs/update/${question._id}`
                            )
                          }
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Delete FAQ"
                          onClick={() => deleteFAQ(question._id)}
                        >
                          <DeleteIcon className={classes.deleteButton} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </div>
  );
}
