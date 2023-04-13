import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageBadges from "../../components/pages/ManageBadges/ManageBadges";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing ManageBadges component", () => {
  it("should render the manage badges table with data", async () => {
    const mockData = [
      { _id: "1", name: "First Reward", value: "10", img : {data: {data: [1,2,3,4,5,6,7,8,9,10], contentType: "image/png"}}},
      { _id: "2", name: "Second Reward", value: "20", img : {data: {data: [1,2,3,4,5,6,7,8,9,10], contentType: "image/png"}}},
    ];

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    window.URL.createObjectURL = jest.fn();

    render(
      <MemoryRouter>
        <ManageBadges />
      </MemoryRouter>
    );

    const rewardName1 = await screen.findByText("First Reward");
    const rewardName2 = await screen.findByText("Second Reward");
    expect(rewardName1).toBeInTheDocument();
    expect(rewardName2).toBeInTheDocument();
    window.URL.createObjectURL.mockReset();
  });

  it("should call deleteReward function when delete button is clicked", async () => {
    const mockData = [
      { _id: "1", name: "First Reward", value: "10", img : {data: {data: [1,2,3,4,5,6,7,8,9,10], contentType: "image/png"}}},
    ];

    axios.get.mockResolvedValue({ data: mockData });
    axios.delete.mockResolvedValue(); // mock the response of axios delete function
    window.URL.createObjectURL = jest.fn();

    render(
      <MemoryRouter>
        <ManageBadges />
      </MemoryRouter>
    );

    const deleteBadge = await screen.findByTitle("Delete Badge", {
      exact: false,
    });

    deleteBadge.click();

    expect(axios.delete).toHaveBeenCalledWith(
      process.env.REACT_APP_API_ENDPOINT + "/management/badge/delete/1"
    );
  });
});
