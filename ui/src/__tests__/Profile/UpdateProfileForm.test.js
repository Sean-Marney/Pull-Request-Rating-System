import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import UpdateProfile from "../components/pages/ManageProfile/updateProfileForm";
jest.mock("axios"); // mock axios module

describe("Testing ManageRewards component", () => {
    test("renders update profile form", async () =>{
        await render(
            <MemoryRouter>
                <UpdateProfile />
            </MemoryRouter>
        );

         // Find form input fields and submit button by their associated label or text content
         const nameInput = screen.getByLabelText("Name");
         const emailInput = screen.getByLabelText("Email");
         const bioInput = screen.getByLabelText("Bio")
         const updateButton = screen.getByText("Update Profile");
 
         // Assert that all necessary form elements are present in the rendered component
         expect(nameInput).toBeInTheDocument();
         expect(emailInput).toBeInTheDocument();
         expect(bioInput).toBeInTheDocument();
         expect(updateButton).toBeInTheDocument();

    });
});