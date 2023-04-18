import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  select: {
    width: "170px",
    margin: "0px 20px",
    padding: "0px 6px",
    border: "0.5px solid black",
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    border: "1px solid black",
    width: "1000px",
    margin: 10,
    padding: "5px 5px",
  },
  ul: {
    margin: 0,
    padding: 0,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "300px",
  },
  selectWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "130px",
    fontFamily: "roboto",
  },
  button: {
    flexBasis: "45%",
  },
  positionElements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "80px",
    marginBottom: "10px",
  },
  paper: {
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  Container: {
    maxWidth: "90%",
    margin: "0 auto",
    overflow: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
