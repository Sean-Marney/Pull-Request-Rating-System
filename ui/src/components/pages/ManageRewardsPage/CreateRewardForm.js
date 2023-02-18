import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateRewardForm from "../../../validations/createRewardForm";
const useStyles = makeStyles((theme) => ({
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
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

export default function CreateReward() {
    const classes = useStyles();
    const [createForm, setCreateForm] = useState({
        rewardName: "",
        starsRequired: "",
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const updateCreateFormField = (e) => {
        const { name, value } = e.target;

        setCreateForm({
            ...createForm, // Duplicates object
            [name]: value,
        });
    };

    const createReward = async (e) => {
        e.preventDefault(); // Prevents refresh after submit

        try {
            await validateCreateRewardForm.validate(createForm, {
                abortEarly: false,
            });
            // Create new reward
            await axios.post(
                "http://localhost:8000/management/rewards/create",
                createForm
            );

            navigate("/management/rewards"); // Redirects after reward is created
        } catch (error) {
            const validationErrors = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setError(validationErrors);
            }
        }
    };

    return (
        <div>
            <div>
                <Card className={classes.card}>
                    <Typography variant="h4">
                        <b>Create New Reward</b>
                    </Typography>
                    <CardContent>
                        <form onSubmit={createReward}>
                            <div>
                                <InputLabel htmlFor="rewardName">
                                    Reward Name
                                </InputLabel>
                                <Input
                                    onChange={updateCreateFormField}
                                    value={createForm.rewardName}
                                    name="rewardName"
                                    id="rewardName"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.rewardName && (
                                    <div style={{ color: "red" }}>
                                        {error.rewardName}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <InputLabel htmlFor="starsRequired">
                                    Stars Required
                                </InputLabel>
                                <Input
                                    onChange={updateCreateFormField}
                                    value={createForm.starsRequired}
                                    name="starsRequired"
                                    id="starsRequired"
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    className={classes.input}
                                />
                                {error.starsRequired && (
                                    <div style={{ color: "red" }}>
                                        {error.starsRequired}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={() =>
                                        navigate("/management/rewards")
                                    }
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    style={{ marginLeft: "30px" }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Create Reward
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
