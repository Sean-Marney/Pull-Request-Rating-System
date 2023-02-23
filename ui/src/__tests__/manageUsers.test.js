import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageUsers from "../components/pages/ManageUsersPage/ManageUsers";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing Manageusers component", () => {
    it("should render the manage rewards table with data", async () => {
        const mockData = [
            {
                _id: "1",
                name: "John Doe",
                email: "johndoe@example.com",
                hasRole: "Manager",
            },
            {
                _id: "2",
                name: "Jane Doe",
                email: "janedoe@example.com",
                hasRole: "Manager",
            },
        ];

        axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

        await render(
            <MemoryRouter>
                <ManageUsers />
            </MemoryRouter>
        );

        const name1 = await screen.findByText("John Doe");
        const email1 = await screen.findByText("johndoe@example.com");
        const role1 = await screen.findByText("Manager");
        const name2 = await screen.findByText("Jane Doe");
        const email2 = await screen.findByText("janedoe@example.com");
        const role2 = await screen.findByText("Manager");

        expect(name1).toBeInTheDocument();
        expect(name2).toBeInTheDocument();
        expect(email1).toBeInTheDocument();
        expect(email2).toBeInTheDocument();
        expect(role1).toBeInTheDocument();
        expect(role2).toBeInTheDocument();
    });
});
