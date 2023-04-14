import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useStyles } from "../../styles/tableStyle";
import Pagination from "../../reusable/Pagination";

export default function ManageQuestions() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [visible, setVisible] = React.useState(10);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    // Get faqs
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/management/questions"
    );

    // Set to state
    setQuestions(res.data);
  };

  const deleteQuestion = async (_id) => {
    // Delete faq
    await axios.delete(
      process.env.REACT_APP_API_ENDPOINT + `/management/questions/delete/${_id}`
    );

    getQuestions(); // Get updated list of rewards
  };

  // Handling "Load More" click
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4" className={classes.title}>
            <b>Developers Questions</b>
          </Typography>
        </Box>

        <Box>
          {/* Get all rewards from database and display in a table */}
          {questions && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      <b>Questions</b>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Render items that have been loaded via pagination */}
                  {questions.slice(0, visible).map((question) => (
                    <TableRow key={question._id}>
                      <TableCell className={classes.tableContent}>
                        {question.question}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Add Question"
                          onClick={() =>
                            navigate(
                              `/management/manageFaqs/questions/add/${question._id}`
                            )
                          }
                        >
                          <AddCircleIcon className={classes.editButton} />
                        </IconButton>
                        <IconButton
                          title="Delete Question"
                          onClick={() => deleteQuestion(question._id)}
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
          <div>
            {/* Render "Load More" button from the reusable component and use the handler on click */}
            <Pagination handlePageClick={handlePageClick} />
          </div>
        </Box>
      </Paper>
    </div>
  );
}
