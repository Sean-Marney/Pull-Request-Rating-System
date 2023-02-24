const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
//Nodemailer code
//Currently only sending email though postman.
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'tinom101@outlook.com', //dummy email address
        pass: 'templejax12',
    },
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'tinmsipa2@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});
