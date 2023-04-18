const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID =
    "979537238086-j37jndnl6o3huoehtlga7v27vm5nfieg.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
    "1//04YGVXmWgFm8SCgYIARAAGAQSNwF-L9IrPY-MkdcMt9x7VTEpD5CuNgRBDnuQXvXAnXQ2fHco2rtV6kdZFw6B99GvgO3WFav1Hzs";

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

const getAccessTokenWrapper = () => {
    return oAuth2Client.getAccessToken();
};

module.exports = { sendEmail, getAccessTokenWrapper };

