import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    minHeight: 325,
    padding: theme.spacing(4),
    margin: "0 auto",
    marginTop: theme.spacing(6),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
    border: "1px solid " + theme.palette.grey[400],
    borderRadius: theme.spacing(1),
    "&::before": { display: "none" },
    "&::after": { display: "none" },
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  error: {
    color: theme.palette.error.main,
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
    fontWeight: "bold",
  },
}));
