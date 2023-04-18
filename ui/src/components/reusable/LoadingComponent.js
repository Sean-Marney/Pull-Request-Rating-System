import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoadingComponent() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "500px",
                width: "1000px",
            }}
        >
            <CircularProgress />
        </div>
    );
}

export default LoadingComponent;
