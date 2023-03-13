import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageProfiles from "../../components/pages/Profile/Profile";


test("renders Profile component without errors", () => {
    render(<ManageProfiles />);
});

