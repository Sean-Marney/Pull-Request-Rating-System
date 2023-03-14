import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import DeveloperDashboard from "../../components/pages/DeveloperDashboard/DeveloperDashboard";
import "@testing-library/jest-dom";

// Mocking axios module
jest.mock("axios");

describe("Testing developer dashboard component", () => {
  // Mocking user
  const user = {
    _id: "12345",
    name: "Test",
    email: "test@example.com",
    stars: 10,
    totalStarsEarned: 20,
    git_username: "test123",
  };

  // Mocking axios response
  axios.get.mockResolvedValue({ data: user });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return the expected data on the page", async () => {
    // Rendering dashboard
    render(<DeveloperDashboard />);

    // Checking the expected data is on the page
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Current Star Count")).toBeInTheDocument();
    expect(screen.getByText("Total Stars Achieved")).toBeInTheDocument();
    expect(screen.getByText("Latest Pull Request")).toBeInTheDocument();
  });
});
