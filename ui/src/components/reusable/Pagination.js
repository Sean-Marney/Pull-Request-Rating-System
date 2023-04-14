import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";

export default function Pagination({ handlePageClick }) {
  return (
    <Stack direction="row" justifyContent="center">
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 40,
          width: 300,
        }}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handlePageClick}
      >
        Load More
      </Button>
    </Stack>
  );
}
