import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageUsers from "../../components/pages/ManageUsers/ManageUsers";
import "@testing-library/jest-dom/extend-expect";

// Mock the axios module
jest.mock("axios");

// Begin describing the test suite
describe("Testing Manageusers component", () => {
  // Begin describing the individual test case
  it("should render the manage users table with data", async () => {
    // Create mock data to be returned by axios
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
        hasRole: "Developer",
      },
    ];

    // Mock the response of axios with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    // Render the ManageUsers component within a MemoryRouter component
    await render(
      <MemoryRouter>
        <ManageUsers />
      </MemoryRouter>
    );

    // Use screen.findByText() to find elements containing the specified text
    const name1 = await screen.findByText("John Doe");
    const email1 = await screen.findByText("johndoe@example.com");
    const role1 = await screen.findByText("Manager");
    const name2 = await screen.findByText("Jane Doe");
    const email2 = await screen.findByText("janedoe@example.com");
    const role2 = await screen.findByText("Developer");

    // Assert that the elements containing the specified text are present in the DOM
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(email1).toBeInTheDocument();
    expect(email2).toBeInTheDocument();
    expect(role1).toBeInTheDocument();
    expect(role2).toBeInTheDocument();
  });
});
