import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FAQList(){
    // const classes = useStyles();
    const [questions, setQuestions] = useState([null]);

    useEffect(() => {
        getFaqs();
    }, []);

    const getFaqs = async () => {
        // Get rewards
        const res = await axios.get("http://localhost:8000/management/manageFaqs");

        // Set to state
        setQuestions(res.data);
    };

    return(
        <div className="FAQList">
            <h1>FAQ List</h1>
        </div>
    );
}
