import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTracker from "../../components/pages/ManageTrackersPage/CreateTrackerForm";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe("Testing CreateTracker component", () => {
    test("displays validation error when tracker name is not entered", async () => {
        render(
            <MemoryRouter>
                <CreateTracker />
            </MemoryRouter>
        );

        // find the tracker name input field and set it to empty
        const trackerNameInput = screen.getByLabelText("Tracker Name");
        fireEvent.change(trackerNameInput, { target: { value: "" } });

        // find the submit button and click it
        const createTrackerButton = screen.getByText("Create Tracker");
        fireEvent.click(createTrackerButton);

        // wait for validation to complete and display error message
        await waitFor(() => {
            const errorMessage = screen.getByText(
                "Please enter the tracker name"
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("creates a new tracker when form is submitted with valid data", async () => {
        const mockPost = jest.fn();
        mockPost.mockResolvedValueOnce({ data: { success: true } });
        axios.post.mockImplementation(mockPost);

        render(
            <MemoryRouter>
                <CreateTracker />
            </MemoryRouter>
        );

        // find the tracker name input field and set it to a valid value
        const trackerNameInput = screen.getByLabelText("Tracker Name");
        fireEvent.change(trackerNameInput, { target: { value: "Readability" } });

        // find the submit button and click it
        const createTrackerButton = screen.getByText("Create Tracker");
        fireEvent.click(createTrackerButton);

        // Wait for axios.post and navigation to complete
        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith(
                "http://localhost:8000/management/trackers/create",
                {
                    name: "Readability",
                }
            );
        });

        await waitFor(() => {
            expect(screen.getByText("Create New Tracker")).toBeInTheDocument();
        });
    });
});
