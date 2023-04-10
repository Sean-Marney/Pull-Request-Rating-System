// Import necessary modules and components for testing
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "../../components/pages/signIn/ForgotPassword";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

let navigate;

// Reset the navigate mock function and mock console error before each test
beforeEach(() => {
    navigate = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.clearAllMocks();
});

// Restore all mocks after testing
afterAll(() => {
    jest.restoreAllMocks();
});

// Test suite for ForgotPassword component
describe("ForgotPassword component", () => {
    // Mock useAxiosInstance custom hook to avoid making real API calls
    jest.mock("../../../src/useAxiosInstance", () => ({
        __esModule: true,
        default: jest.fn(),
    }));

    // Test if the ForgotPassword component renders without crashing
    it("renders Forgot password component without crashing", () => {
        // Render the component wrapped with MemoryRouter
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        // Check if the heading "Forgot Password" is present in the document
        const pageHeading = screen.getByText("Forgot Password");
        expect(pageHeading).toBeInTheDocument();
    });

    // Test if the email input value is updated correctly
    it("updates email input value correctly", () => {
        // Render the ForgotPassword component
        render(<ForgotPassword />);

        // Select the email input field
        const emailInput = screen.getByLabelText("Email");

        // Simulate user input
        userEvent.type(emailInput, "test@example.com");

        // Verify if the input value has been updated to the expected value
        expect(emailInput.value).toBe("test@example.com");
    });
});