import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateUser from "../../components/pages/ManageUsers/CreateUserForm";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe("Testing CreateUser component", () => {
    test("displays validation error when user name is not entered", async () => {
        render(
            <MemoryRouter>
                <CreateUser />
            </MemoryRouter>
        );

        // find the user name input field and set it to empty
        const userNameInput = screen.getByLabelText("Name");
        fireEvent.change(userNameInput, { target: { value: "" } });

        // find the submit button and click it
        const createUserButton = screen.getByText("Create User");
        fireEvent.click(createUserButton);

        // wait for validation to complete and display error message
        await waitFor(() => {
            const errorMessage = screen.getByText(
                "Please enter your full name"
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("displays validation error when email required is not entered", async () => {
        render(
            <MemoryRouter>
                <CreateUser />
            </MemoryRouter>
        );

        // find the email required input field and set it to empty
        const emailRequiredInput = screen.getByLabelText("Email");
        fireEvent.change(emailRequiredInput, { target: { value: "" } });

        // find the submit button and click it
        const createUserButton = screen.getByText("Create User");
        fireEvent.click(createUserButton);

        // wait for validation to complete and display error message
        await waitFor(() => {
            const errorMessage = screen.getByText("Please provide your email");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("displays validation error when password required is not entered", async () => {
        render(
            <MemoryRouter>
                <CreateUser />
            </MemoryRouter>
        );

        // find the password required input field and set it to empty
        const passwordRequiredInput = screen.getByLabelText("Password");
        fireEvent.change(passwordRequiredInput, { target: { value: "" } });

        // find the submit button and click it
        const createUserButton = screen.getByText("Create User");
        fireEvent.click(createUserButton);

        // wait for validation to complete and display error message
        await waitFor(() => {
            const errorMessage = screen.getByText("Please provide a password");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("creates a new user when form is submitted with valid data", async () => {
        const mockPost = jest.fn();
        mockPost.mockResolvedValueOnce({ data: { success: true } });
        axios.post.mockImplementation(mockPost);

        render(
            <MemoryRouter>
                <CreateUser />
            </MemoryRouter>
        );

        // find the user name input field and set it to a valid value
        const userNameInput = screen.getByLabelText("Name");
        fireEvent.change(userNameInput, { target: { value: "Joe An" } });

        // find the email required input field and set it to a valid value
        const emailRequiredInput = screen.getByLabelText("Email");
        fireEvent.change(emailRequiredInput, {
            target: { value: "joe@gmail.com" },
        });

        // find the password required input field and set it to a valid value
        const passwordRequiredInput = screen.getByLabelText("Password");
        fireEvent.change(passwordRequiredInput, {
            target: { value: "Password%1" },
        });

        // find the password required input field and set it to a valid value
        const githubUsernameRequiredInput =
            screen.getByLabelText("GitHub Username");
        fireEvent.change(githubUsernameRequiredInput, {
            target: { value: "JoeAn" },
        });

        // find the submit button and click it
        const createUserButton = screen.getByText("Create User");
        fireEvent.click(createUserButton);

        // Wait for axios.post and navigation to complete
        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith(
                "http://localhost:8000/management/users/create",
                {
                    name: "Joe An",
                    email: "joe@gmail.com",
                    password: "Password%1",
                    git_username: "JoeAn"
                }
            );
        });

        await waitFor(() => {
            expect(screen.getByText("Create New User")).toBeInTheDocument();
        });
    });
});
