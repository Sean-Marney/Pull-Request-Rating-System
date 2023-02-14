import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios"; // mock axios
import Rewards from "../components/RewardsPage/Rewards";

jest.mock("axios"); // mock axios module

describe("Rewards", () => {
  it("should render the rewards table with data", async () => {
    const mockData = [
      { _id: "1", rewardName: "First Reward", starsRequired: "10" },
      { _id: "2", rewardName: "Second Reward", starsRequired: "20" },
    ];

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    render(<Rewards />);

    const rewardName1 = await screen.findByText("First Reward");
    const rewardName2 = await screen.findByText("Second Reward");
    const starsRequired1 = await screen.findByText("10");
    const starsRequired2 = await screen.findByText("20");

    expect(rewardName1).toBeInTheDocument();
    expect(rewardName2).toBeInTheDocument();
    expect(starsRequired1).toBeInTheDocument();
    expect(starsRequired2).toBeInTheDocument();
  });
});
