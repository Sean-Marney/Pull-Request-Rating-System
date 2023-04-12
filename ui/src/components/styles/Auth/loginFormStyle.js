import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "130px 0",
    },

    appBar: {
        backgroundColor: "black",
    },
}));
