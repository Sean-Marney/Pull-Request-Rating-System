import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    table: {
        minWidth: 650,
    },
}));

function Leaderboard() {
    const classes = useStyles();
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/leaderboard")
            .then((res) => setLeaderboardData(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                <b>Leaderboard</b>
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="leaderboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Stars</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardData.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="right">{user.stars}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Leaderboard;
