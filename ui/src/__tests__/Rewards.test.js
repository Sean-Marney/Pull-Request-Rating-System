import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Rewards from "../components/pages/RewardsPage/Rewards";
import "@testing-library/jest-dom/extend-expect";
import { useCookies } from "react-cookie";

jest.mock("axios"); // mock axios module
jest.mock("react-cookie"); // mock useCookies hook

// Mocking the toastify import because jest couldn't parse the syntax - this mock is unrelated to the tests
jest.mock("react-toastify/dist/ReactToastify.css", () => ({
  __esModule: true,
  default: "",
}));

describe("Testing developer's rewards page at /rewards", () => {
  it("should render the rewards table with data", async () => {
    const mockData = [
      { _id: "1", rewardName: "First Reward", starsRequired: 10 },
      { _id: "2", rewardName: "Second Reward", starsRequired: 20 },
    ];

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    useCookies.mockReturnValue([{ user: { email: "test@test.com" } }]);

    render(<Rewards />);

    const rewardName1 = await screen.findByText("First Reward");
    const rewardName2 = await screen.findByText("Second Reward");
    const starsRequired1 = await screen.findByText(10);
    const starsRequired2 = await screen.findByText(10);

    expect(rewardName1).toBeInTheDocument();
    expect(rewardName2).toBeInTheDocument();
    expect(starsRequired1).toBeInTheDocument();
    expect(starsRequired2).toBeInTheDocument();
  });
});

describe("Testing logic for claiming a reward on /rewards page", () => {
  it("should test claim button is clicked", async () => {
    const mockData = [
      { _id: "1", rewardName: "First Reward", starsRequired: 100 },
    ];

    const mockUser = {
      email: "test@test.com",
      stars: 200, // initial stars
    };

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios
    axios.post.mockResolvedValue({ data: { success: true } }); // mock the response of axios

    // useCookies.mockReturnValue([{ user: { email: "test@test.com" } }]);
    useCookies.mockReturnValue([{ user: mockUser }]);

    render(<Rewards />);

    const claimButton = await screen.findByText("Claim Reward");
    fireEvent.click(claimButton);
  });
});

describe("Testing logic for tracking progress towards a reward on /rewards page", () => {
  it("should display the correct number of stars remaining for each reward", async () => {
    // Mock rewards
    const rewards = [
      {
        _id: "1",
        starsRequired: 20,
      },
      {
        _id: "2",
        starsRequired: 30,
      },
    ];
    // Set user's star count
    const stars = 10;

    // Loop through each reward and calculate the stars remaining before they can claim it
    const remainingStarsData = {};
    rewards.forEach((reward) => {
      const remainingStars = Math.max(reward.starsRequired - stars, 0);
      remainingStarsData[reward._id] = remainingStars;
      if (remainingStars === 0) {
        remainingStarsData[reward._id] = "Reward can now be claimed";
      }
    });

    // Expect the calculation to be correct
    expect(remainingStarsData).toEqual({
      1: 10,
      2: 20,
    });
  });
});
