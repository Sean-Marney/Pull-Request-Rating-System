import { render, screen } from "@testing-library/react";
import React from "react";
import UpdateUser from "../../components/pages/ManageUsersPage/UpdateUserForm";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("UpdateUser component", () => {
    test("renders update user form", async () => {
        
        // Render the UpdateUser component inside a MemoryRouter for testing purposes
        await render(
            <MemoryRouter>
                <UpdateUser />
            </MemoryRouter>
        );

        // Find form input fields and submit button by their associated label or text content
        const userNameInput = screen.getByLabelText("User Name");
        const emailInput = screen.getByLabelText("Email");
        const updateButton = screen.getByText("Update User");

        // Assert that all necessary form elements are present in the rendered component
        expect(userNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(updateButton).toBeInTheDocument();
    });
});
