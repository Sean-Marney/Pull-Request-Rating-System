import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

const ManagerHelp = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = {
            name,
            
            message,
        };
        axios.post('http://localhost:8000/management/ManagerHelp', formData)
            .then((response) => {
                if (response.status === 200) {
                    alert('Email sent successfully');
                } else {
                    alert('Error sending email');
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Error sending email');
            });
    };


    return (
        <div className="cForm">
            <Typography gutterBottom variant="h3" align="center">
                Manager Help
            </Typography>
            <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                            Fill up the form and our team will get back to you within 24 hours.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField placeholder="Enter first name" label="Name" value={name} variant="outlined" onChange={(event) => setName(event.target.value)} fullWidth required />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField label="Message" multiline rows={4} placeholder="Type your message here" value={message} variant="outlined" onChange={(event) => setMessage(event.target.value)} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                </Grid>

                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
}




export default ManagerHelp;




