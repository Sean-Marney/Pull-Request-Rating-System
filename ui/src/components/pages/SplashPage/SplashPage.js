import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ManageProfiles() {
    return (
        <div>
            landing page
            <Button
                onClick={() => deleteUserByEmail(user.email)}
                startIcon={<DeleteIcon />}
                style={{ color: "red" }}
            >
                login
            </Button>

            <Button
                onClick={() => deleteUserByEmail(user.email)}
                startIcon={<DeleteIcon />}
                style={{ color: "red" }}
            >
                Register
            </Button>
        </div>
        );
}