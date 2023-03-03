import { render, screen } from "@testing-library/react";
import React from "react";
import UpdateTracker from "../../components/pages/ManageTrackersPage/UpdateTrackerForm";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("UpdateTracker component", () => {
    test("renders update tracker form", async () => {
        // Render the UpdateTracker component inside a MemoryRouter for testing purposes
        await render(
            <MemoryRouter>
                <UpdateTracker />
            </MemoryRouter>
        );

        // Find form input fields and submit button by their associated label or text content
        const trackerNameInput = screen.getByLabelText("Tracker Name");
        const updateButton = screen.getByText("Update Tracker");

        // Assert that all necessary form elements are present in the rendered component
        expect(trackerNameInput).toBeInTheDocument();
        expect(updateButton).toBeInTheDocument();
    });
});
