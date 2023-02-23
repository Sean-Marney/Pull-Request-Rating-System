import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Rewards from "../components/pages/RewardsPage/Rewards";
import "@testing-library/jest-dom/extend-expect";
import { useCookies } from "react-cookie";

jest.mock("axios"); // mock axios module
jest.mock("react-cookie"); // mock useCookies hook

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
