import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tableContainer: {
        // height: "calc(100vh - 100px)",
        maxWidth: "90%",
        margin: "0 auto",
        overflow: "auto",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    paper: {
        boxShadow: theme.shadows[3],
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        background: "#ffffff",
    },
    tableHeaders: {
        fontSize: "1.25rem",
        textAlign: "center",
        fontWeight: "bold",
    },
    tableContent: {
        fontSize: "1rem",
        textAlign: "center",
    },
    title: {
        margin: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    starCountBox: {
        textAlign: "center",
        fontSize: "1rem",
        color: "#b31010",
        border: "1px solid",
        width: 250,
        borderColor: theme.palette.grey[400],
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[100],
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    editButton: {
        color: "blue",
    },
    deleteButton: {
        color: "red",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: 300,
        maxWidth: 500,
        borderRadius: 4,
        textAlign: "center",
    },
    modalTitle: {
        fontWeight: "bold",
        marginBottom: theme.spacing(2),
        color: "red",
    },
    modalMessage: {
        marginBottom: theme.spacing(4),
    },
    modalButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalButton: {
        margin: theme.spacing(1),
    },
}));
