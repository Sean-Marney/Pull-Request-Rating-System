import React, { useState } from "react";
import {
    Typography,
    InputLabel,
    Button,
    TextField,
    Card,
    CardContent,
  } from "@material-ui/core";
  import * as yup from "yup";
import { useStyles } from "../../styles/formStyle";

export default function AddQuestion() {
    const classes = useStyles();

    return (
        <div>
            <div>
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.title}>
                        <b>Ask a question</b>
                    </Typography>
                    <CardContent>
                        <form
                            // onSubmit={}
                            className={classes.formControl}
                        >
                            <div>
                                <InputLabel htmlFor="question">
                                how can we be of help?
                                </InputLabel>
                                <TextField
                                // onChange={updateCreateFormField}
                                // value={createForm.answer}
                                name="answer"
                                id="answer"
                                multiline
                                rows={3}
                                inputProps={{
                                    style: { textAlign: "left" },
                                }}
                                className={classes.input}
                                />
                                {/* {error.name && (
                                    <div className={classes.error}>
                                        {error.name}
                                    </div>
                                )} */}
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    // onClick={() =>
                                    //     navigate("")
                                    // }
                                    variant="contained"
                                    style={{ marginRight: "20px" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Send
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}