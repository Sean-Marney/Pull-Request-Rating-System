// Import necessary modules and components for testing
import * as React from "react";
import { render, screen } from "@testing-library/react";
import ResetPassword from "../../components/pages/signIn/ResetPassword";
import { MemoryRouter } from "react-router-dom";
import useAxiosInstance from "../../../src/useAxiosInstance";
import "@testing-library/jest-dom";

// Mock useAxiosInstance custom hook to avoid making real API calls
jest.mock("../../../src/useAxiosInstance", () => jest.fn());

// Test suite for ResetPassword component
describe("ResetPassword component", () => {
    
    // Set up a mock implementation of useAxiosInstance before each test
    beforeEach(() => {
        useAxiosInstance.mockReturnValue({
            request: jest.fn(),
        });
    });

    // Test if the ResetPassword component renders correctly
    test("renders the component", () => {
        // Render the component wrapped with MemoryRouter
        render(
            <MemoryRouter>
                <ResetPassword />
            </MemoryRouter>
        );

        // Check if the title "Choose a new password" is present in the document
        const resetPasswordTitle = screen.getByText("Choose a new password");
        expect(resetPasswordTitle).toBeInTheDocument();
    });
});