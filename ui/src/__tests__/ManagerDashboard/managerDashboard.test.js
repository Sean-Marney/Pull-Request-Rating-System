import React from "react";
import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../../components/pages/ManagerDashboard/ManagerDashboard";

jest.mock("axios");

describe("Testing manager dashboard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component with the expected data", () => {
    render(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Pending Pull Requests")).toBeInTheDocument();
    expect(screen.getByText("Claimed Rewards")).toBeInTheDocument();
    expect(screen.getByText("Top Developer")).toBeInTheDocument();
  });

  it("should fetch and display the number of pending pull requests", async () => {
    const mockNumberOfPendingPullRequests = 5;
    axios.get.mockResolvedValueOnce({ data: mockNumberOfPendingPullRequests });
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/management/dashboard/get-number-of-pending-pull-requests"
    );
  });

  it("should fetch and display the number of claimed rewards", async () => {
    const mockNumberOfClaimedRewards = 10;
    axios.get.mockResolvedValueOnce({ data: mockNumberOfClaimedRewards });
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/management/dashboard/get-number-of-claimed-rewards"
    );
  });

  it("should fetch and display the list of claimed rewards", async () => {
    const mockClaimedRewards = [
      { id: 1, name: "Reward 1" },
      { id: 2, name: "Reward 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockClaimedRewards });
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/management/dashboard/get-claimed-rewards"
    );
  });

  it("should fetch and display the top 3 developers", async () => {
    const mockTopDevelopers = [
      { id: 1, name: "Developer 1", total_stars: 10 },
      { id: 2, name: "Developer 2", total_stars: 8 },
      { id: 3, name: "Developer 3", total_stars: 6 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockTopDevelopers });
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/management/dashboard/get-top-developers"
    );
  });

  it("should fetch and display all developers", async () => {
    const mockAllDevelopers = [
      { id: 1, name: "Developer 1", total_stars: 10 },
      { id: 2, name: "Developer 2", total_stars: 8 },
      { id: 3, name: "Developer 3", total_stars: 6 },
      { id: 4, name: "Developer 4", total_stars: 12 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockAllDevelopers });
    render(<Dashboard />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/management/dashboard/get-all-developers"
    );
  });
});
