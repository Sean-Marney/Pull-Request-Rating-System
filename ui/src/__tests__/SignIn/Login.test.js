import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "../../components/pages/signIn/Login";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the useNavigate hook from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Login component", () => {

    // Test that the sign in form renders with all expected inputs and a submit button
    test("renders login form", async () => {

        // Render the SignIn component within a MemoryRouter
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Get each input field by its associated label text
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        // Get the submit button by its role and name attribute
        const submitButton = screen.getByRole("button", { name: /sign in/i });

        // Assert that all input fields and the submit button are present in the document
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    // Test that validation errors are displayed when the form is submitted without input values
    test("displays validation errors on submit", async () => {

        // Render the Sign In component within a MemoryRouter
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        // Get the submit button by its role and name attribute
        const submitButton = screen.getByRole("button", { name: /sign in/i });

        // Simulate a click on the submit button to trigger form submission without input values
        fireEvent.click(submitButton);

        // Get each error message by its associated text
        const emailError = await screen.findByText("Email is required");
        const passwordError = await screen.findByText(
            "Password is required"
        );

        // Assert that all error messages are present in the document
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });
});
