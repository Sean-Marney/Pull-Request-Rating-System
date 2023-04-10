// Import necessary modules and components for testing
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OTPVerification from "../../components/pages/Auth/VerifyOtp";

// Mock useAxiosInstance custom hook to avoid making real API calls
jest.mock("../../../src/useAxiosInstance", () => ({
    __esModule: true,
    default: () => ({ request: jest.fn() }),
}));

// Mock react-router-dom hooks to control navigation behavior in tests
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ state: { modalEmail: "test@example.com" } }),
}));

// Test suite for OTPVerification component
describe("OTPVerification component", () => {
    // Test if the OTPVerification component renders correctly
    test("renders the component", () => {
        // Render the component wrapped with MemoryRouter
        render(
            <MemoryRouter>
                <OTPVerification />
            </MemoryRouter>
        );

        // Check if the expected texts are present in the document
        expect(screen.getByText(/PullMaster.io/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Security Code Verification/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Please enter the 6-digit verification code/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Resend Code/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
        expect(screen.getByText(/Verify/i)).toBeInTheDocument();
    });
});
