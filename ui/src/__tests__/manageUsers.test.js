import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageUsers from "../components/pages/ManageUsersPage/ManageUsers";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing ManageUsers component", () => {
    it("should render the manage users table with data", async () => {
        const mockData = [
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
                hasRole: "Developer",
            },
        ];

        axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

        render(
            <MemoryRouter>
                <ManageUsers />
            </MemoryRouter>
        );

        const user1 = await screen.findByText("Martin Dawes");
        const email1 = await screen.findByText("martin@gmail.com");
        const password1 = await screen.findByText("12345");

        expect(user1).toBeInTheDocument();
        expect(email1).toBeInTheDocument();
        expect(password1).toBeInTheDocument();
    });

    it("should call deleteUserfunction when delete button is clicked", async () => {
        const mockData = [
            {
                _id: "1",
                name: "Martin Dawes",
                email: "martin@gmail.com",
                password: "12345",
            },
        ];

        axios.get.mockResolvedValue({ data: mockData });
        axios.delete.mockResolvedValue(); // mock the response of axios delete function

        render(
            <MemoryRouter>
                <ManageUsers />
            </MemoryRouter>
        );

        const deleteButton = await screen.findByTitle("Delete User", {
            exact: false,
        });

        deleteButton.click();

        expect(axios.delete).toHaveBeenCalledWith(
            "http://localhost:8000/management/users/delete/1"
        );
    });
});
