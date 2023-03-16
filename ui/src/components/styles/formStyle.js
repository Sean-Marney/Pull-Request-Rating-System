import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    minHeight: 325,
    padding: "20px 5px",
    margin: "0 auto",
    marginTop: theme.spacing(10),
    boxShadow: theme.shadows[20],
    borderRadius: "20px",
  },
  input: {
    padding: "5px 5px",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));
