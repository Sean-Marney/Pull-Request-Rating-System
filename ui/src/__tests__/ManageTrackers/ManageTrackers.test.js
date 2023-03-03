import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageTrackers from "../../components/pages/ManageTrackersPage/ManageTrackers";
import "@testing-library/jest-dom/extend-expect";

// Mock the axios module
jest.mock("axios");

// Begin describing the test suite
describe("Testing ManageTrackers component", () => {
    // Begin describing the individual test case
    it("should render the manage trackers table with data", async () => {
        // Create mock data to be returned by axios
        const mockData = [
            {
                _id: "1",
                name: "Design Patterns",
            },
            {
                _id: "2",
                name: "Readability",
            },
        ];

        // Mock the response of axios with the mock data
        axios.get.mockResolvedValue({ data: mockData });

        // Render the ManageUsers component within a MemoryRouter component
        await render(
            <MemoryRouter>
                <ManageTrackers />
            </MemoryRouter>
        );

        // Use screen.findByText() to find elements containing the specified text
        const name1 = await screen.findByText("Design Patterns");
        const name2 = await screen.findByText("Readability");

        // Assert that the elements containing the specified text are present in the DOM
        expect(name1).toBeInTheDocument();
        expect(name2).toBeInTheDocument();
    });
});
