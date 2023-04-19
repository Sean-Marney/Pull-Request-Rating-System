import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "calc(100vh - 100px)",
    maxWidth: "90%",
    margin: "0 auto",
    overflow: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paper: {
    boxShadow: theme.shadows[5],
    borderRadius: "20px",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
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
    marginBottom: theme.spacing(2),
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
}));
