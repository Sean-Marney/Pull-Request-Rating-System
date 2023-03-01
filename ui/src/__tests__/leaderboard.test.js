import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Leaderboard from "../components/pages/Leaderboard/Leaderboard";


test("renders leaderboard component without errors", () => {
    render(<Leaderboard />);
});
