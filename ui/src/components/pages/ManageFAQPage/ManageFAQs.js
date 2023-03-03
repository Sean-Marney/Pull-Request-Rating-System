import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        boxShadow: theme.shadows[20],
        paddingBottom: theme.spacing(0),
        borderRadius: "20px",
    },
    tableContainer: {
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20),
    },
    tableHeaders: {
        fontSize: "25px",
    },
    tableContent: {
        fontSize: "20px",
    },
}));

export default function ManageFAQ() {
    const classes = useStyles();
    const [questions, setQuestions] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = async () => {
        // Get faqs
        const res = await axios.get("http://localhost:8000/management/manageFaqs");

        // Set to state
        setQuestions(res.data);
    };

    const deleteFAQ = async (_id) => {
        // Delete faq
        await axios.delete(
            `http://localhost:8000/management/manageFaqs/delete/${_id}`
        );

        getFaqs(); // Get updated list of rewards
    };

    return (
        <div className={classes.tableContainer}>
            <Box padding={3}>
                <Typography variant="h4">
                    <b>Manage FAQs</b>
                </Typography>
            </Box>
            <Box>
                {/* Get all rewards from database and display in a table */}
                {questions && (
                    <TableContainer className={classes.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Question</b>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Answer</b>
                                    </TableCell>
                                    <TableCell className={classes.tableHeaders}>
                                        <b>Edit</b>
                                    </TableCell>
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
                                                color="primary"
                                                title="Edit FAQ"
                                                onClick={() =>
                                                    navigate(`/management/manageFaqs/update/${question._id}`)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                title="Delete FAQ"
                                                onClick={() => deleteFAQ(question._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box><br/>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddCircleIcon />}
                onClick={() => navigate("/management/manageFaqs/create")}
            >
                Add New FAQ
            </Button>
        </div>
    );
}
