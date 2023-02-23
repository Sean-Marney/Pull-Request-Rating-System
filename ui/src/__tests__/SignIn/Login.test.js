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

describe("SignUp component", () => {
    // Test that the sign in form renders with all expected inputs and a submit button
    test("renders sign up form", async () => {
        // Render the SignIn component within a MemoryRouter
        await render(
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
});
