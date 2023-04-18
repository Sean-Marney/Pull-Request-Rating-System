import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputLabel,
  Input,
} from "@material-ui/core";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import { useStyles } from "../../styles/formStyle";

export default function ManagerHelp() {
  const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const validateEmail = (email) => {
      // Regular expression to check if email is valid
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      if (!name) {
        toast.error('Name is required');
        return;
      }
  
      if (!email || !validateEmail(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
  
      if (!message) {
        toast.error('Message is required');
        return;
      }
  
      emailjs
        .sendForm(
          'service_ddgstfy',
          'template_e4arkwr',
          e.target,
          '7coZYu5AFawFbosmz'
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log('message sent');
            toast.success('Your message has been sent!');
          },
          (error) => {
            console.log(error.text);
            toast.error('Error sending message. Please try again later.');
          }
        );
  
      setName('');
      setEmail('');
      setMessage('');
    };

  return (
    <div>
      <div>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Contact Us
          </Typography>
          <CardContent>
            <Typography variant="body1">
              Fill in the form and our team will get back to you within 24
              hours.
            </Typography>
            <form onSubmit={sendEmail} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="name">Name</InputLabel>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  name="user_name"
                  data-testid="name-label"
                  style={{ marginBottom: "1.5rem" }}
                  className={classes.input}
                />
              </div>
              <div>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  name="user_email"
                  type="email"
                  data-testid="email-label"
                  style={{ marginBottom: "1.5rem" }}
                  className={classes.input}
                />
              </div>
              <div>
                <InputLabel htmlFor="message">Message</InputLabel>
                <TextField
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="message"
                  multiline
                  rows={4}
                  data-testid="message-label"
                  style={{ marginBottom: "1.5rem" }}
                  className={classes.input}
                />
              </div>
              <div className={classes.buttonContainer}>
                <Button type="submit" variant="contained" color="primary">
                  Send
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
// return (
//   <div>
//     <Typography variant="h4" className={classes.title}>
//       Manager Help
//     </Typography>
//     <Grid container justify="center">
//       <Grid item xs={12} sm={6}>
//         <Card>
//           <CardContent>
//             <Typography gutterBottom variant="h5">
//               Contact Us
//             </Typography>
//             <Typography
//               variant="body2"
//               color="textSecondary"
//               component="p"
//               gutterBottom
//             >
//               Fill in the form and our team will get back to you within 24
//               hours.
//             </Typography>

//             <form onSubmit={sendEmail}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
// label="Name"
// value={name}
// onChange={(e) => setName(e.target.value)}
// variant="outlined"
// margin="normal"
// required
// fullWidth
// name="user_name"
// data-testid="name-label"
//                   />

//                   <Grid item xs={12}>
//                     <TextField
// label="Email"
// value={email}
// onChange={(e) => setEmail(e.target.value)}
// variant="outlined"
// margin="normal"
// required
// fullWidth
// name="user_email"
// type="email"
// data-testid="email-label"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
// label="Message"
// value={message}
// onChange={(e) => setMessage(e.target.value)}
// variant="outlined"
// margin="normal"
// required
// fullWidth
// name="message"
// multiline
// rows={4}
// data-testid="message-label"
//                     />
//                   </Grid>
//                   <Button type="submit" variant="contained" color="primary">
//                     Send
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
// <ToastContainer position="top-right" autoClose={3000} />
//   </div>
// );
