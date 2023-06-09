import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageRewards from "../../components/pages/ManageRewards/ManageRewards";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing ManageRewards component", () => {
  it("should render the manage rewards table with data", async () => {
    const mockData = [
      { _id: "1", rewardName: "First Reward", starsRequired: "10" },
      { _id: "2", rewardName: "Second Reward", starsRequired: "20" },
    ];

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    render(
      <MemoryRouter>
        <ManageRewards />
      </MemoryRouter>
    );

    const rewardName1 = await screen.findByText("First Reward");
    const rewardName2 = await screen.findByText("Second Reward");
    const starsRequired1 = await screen.findByText("10");
    const starsRequired2 = await screen.findByText("20");

    expect(rewardName1).toBeInTheDocument();
    expect(rewardName2).toBeInTheDocument();
    expect(starsRequired1).toBeInTheDocument();
    expect(starsRequired2).toBeInTheDocument();
  });

  it("should call deleteReward function when delete button is clicked", async () => {
    const mockData = [
      { _id: "1", rewardName: "First Reward", starsRequired: "10" },
    ];

    axios.get.mockResolvedValue({ data: mockData });
    axios.delete.mockResolvedValue(); // mock the response of axios delete function

    render(
      <MemoryRouter>
        <ManageRewards />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByTitle("Delete Reward", {
      exact: false,
    });

    deleteButton.click();

    expect(axios.delete).toHaveBeenCalledWith(
      process.env.REACT_APP_API_ENDPOINT + "/management/rewards/delete/1",
      { withCredentials: true }
    );
  });
});
