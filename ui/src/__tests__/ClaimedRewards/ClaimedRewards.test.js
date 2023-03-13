import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ClaimedRewards from "../../components/pages/ClaimedRewards/ClaimedRewards";
import ArchivedRewards from "../../components/pages/ClaimedRewards/ArchivedRewards";
import "@testing-library/jest-dom";

// Mocking the toastify import because jest couldn't parse the syntax - this mock is unrelated to the tests
jest.mock("react-toastify/dist/ReactToastify.css", () => ({
  __esModule: true,
  default: "",
}));

// Mocking axios module
jest.mock("axios");

describe("Testing ClaimedRewards component", () => {
  it("should render the claimed rewards table with the expected mock data", async () => {
    // Creating mock data for a claimed reward
    const mockData = [
      {
        _id: "1",
        reward_name: "Sample Reward 1",
        user_email: "test1@example.com",
        date_claimed: "2022-01-01",
        archived: false,
      },
    ];

    // Mocking axios response
    axios.get.mockResolvedValue({ data: mockData });

    // Rendering Claimed Rewards page
    render(
      <MemoryRouter>
        <ClaimedRewards />
      </MemoryRouter>
    );

    expect(screen.getByText("Claimed Rewards")).toBeInTheDocument();

    // Finding mock data that was test rendered on the page
    const rewardName = await screen.findByText("Sample Reward 1");
    const userEmail = await screen.findByText("test1@example.com");
    const date_claimed = await screen.findByText("2022-01-01");

    // Expect that the correct data was rendered on the page
    expect(rewardName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(date_claimed).toBeInTheDocument();
  });
});

describe("Testing ArchivedRewards component", () => {
  it("should render the claimed rewards table with the expected mock data", async () => {
    // Creating mock data for a claimed reward
    const mockData = [
      {
        _id: "1",
        reward_name: "Sample Reward 2",
        user_email: "test2@example.com",
        date_claimed: "2022-01-01",
        archived: true,
      },
    ];

    // Mocking axios response
    axios.get.mockResolvedValue({ data: mockData });

    // Rendering Claimed Rewards page
    render(
      <MemoryRouter>
        <ArchivedRewards />
      </MemoryRouter>
    );

    expect(screen.getByText("Archived Rewards")).toBeInTheDocument();

    // Finding mock data that was test rendered on the page
    const rewardName = await screen.findByText("Sample Reward 2");
    const userEmail = await screen.findByText("test2@example.com");
    const date_claimed = await screen.findByText("2022-01-01");

    // Expect that the correct data was rendered on the page
    expect(rewardName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(date_claimed).toBeInTheDocument();

    // Expect that the reward is archived
    const archivedReward = mockData[0];
    expect(archivedReward).toHaveProperty("archived", true);
  });
});
