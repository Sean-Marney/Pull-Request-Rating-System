import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../../components/pages/signIn/Register";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the useNavigate hook from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

describe("SignUp component", () => {

    // Test that the sign up form renders with all expected inputs and a submit button
    test("renders sign up form", async () => {
        // Render the SignUp component within a MemoryRouter
         render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Get each input field by its associated label text
        const nameInput = screen.getByLabelText("Name");
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");

        // Get the submit button by its role and name attribute
        const submitButton = screen.getByRole("button", { name: /sign up/i });

        // Assert that all input fields and the submit button are present in the document
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    // Test that validation errors are displayed when the form is submitted without input values
    test("displays validation errors on submit", async () => {
        
        // Render the SignUp component within a MemoryRouter
         render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        // Get the submit button by its role and name attribute
        const submitButton = screen.getByRole("button", { name: /sign up/i });

        // Simulate a click on the submit button to trigger form submission without input values
        fireEvent.click(submitButton);

        // Get each error message by its associated text
        const nameError = await screen.findByText(
            "Please enter your full name"
        );
        const emailError = await screen.findByText("Please enter your email");
        const passwordError = await screen.findByText(
            "Password must be at least 8 characters long"
        );
        const confirmPasswordError = await screen.findByText(
            "Confirm Password is required"
        );

        // Assert that all error messages are present in the document
        expect(nameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
        expect(confirmPasswordError).toBeInTheDocument();
    });
});
