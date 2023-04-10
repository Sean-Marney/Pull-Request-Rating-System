import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    ratingContainer: {
        marginBottom: theme.spacing(2),
        width: "400px",
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        backgroundColor: "white",
        position: "relative",
    },
    ratingTitle: {
        width: "30%",
        paddingRight: theme.spacing(1),
        textAlign: "right",
    },
    ratingValue: {
        width: "70%",
        paddingLeft: theme.spacing(1),
    },
    Rating: {
        display: "flex",
        flexWrap: "wrap",
    },
    listItemAvatar: {
        marginRight: theme.spacing(2),
    },
}));
