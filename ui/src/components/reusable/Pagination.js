import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";

export default function Pagination({
  visible,
  handlePageClick,
  handlePageBack,
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 40,
        }}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handlePageClick}
      >
        Load More
      </Button>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 40,
        }}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handlePageBack}
        disabled={visible <= 5}
      >
        Load Less
      </Button>
    </Stack>
  );
}
