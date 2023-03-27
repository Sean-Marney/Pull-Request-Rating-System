const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'tinom101@outlook.com', //dummy email address
        pass: 'templejax12',
    },
});


exports.sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'tinmsipa2@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nMessage: ${message}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error sending email');
    }
};
