const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID =
    "756325392326-fade03emr8dot73dao9v90up5sm42tnk.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
    "1//04TPMWXf1b9msCgYIARAAGAQSNwF-L9IrijgFVnb7EJ7gFNj8EYpqomCWQhQ-oYYwNEI3Huz1q53K36-9zWWLil4xYupY-2ev7Jg";

const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(mailOptions) {
    try {
        // Get access token from the OAuth2 client
        const accessToken = await oAuth2Client.getAccessToken();

        // Create a nodemailer transport using Gmail and OAuth2 credentials
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "team7largeteamproject@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token || "",
                accessType: "OFFLINE",
            },
        });

        // Send the email with the provided mailOptions
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${mailOptions.to}`);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

module.exports = sendEmail;
