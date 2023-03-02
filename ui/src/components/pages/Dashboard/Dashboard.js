
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Dashboard() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Requests Table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Rating Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(request => (
            <TableRow key={request._id}>
              <TableCell component="th" scope="row">{request.title}</TableCell>
              <TableCell>{request.rating_complete.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
