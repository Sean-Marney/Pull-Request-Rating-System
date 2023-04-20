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
      {
        _id: "1",
        name: "First Badge",
        value: "10",
        img: {
          data: {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            contentType: "image/png",
          },
        },
      },
      {
        _id: "2",
        name: "Second Badge",
        value: "20",
        img: {
          data: {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            contentType: "image/png",
          },
        },
      },
    ];

    axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    window.URL.createObjectURL = jest.fn();

    render(
      <MemoryRouter>
        <ManageBadges />
      </MemoryRouter>
    );

    const badgeName1 = await screen.findByText("First Badge");
    const badgeName2 = await screen.findByText("Second Badge");
    expect(badgeName1).toBeInTheDocument();
    expect(badgeName2).toBeInTheDocument();
    window.URL.createObjectURL.mockReset();
  });

  it("should call deleteBadge function when delete button is clicked", async () => {
    const mockData = [
      {
        _id: "1",
        name: "First Badge",
        value: "10",
        img: {
          data: {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            contentType: "image/png",
          },
        },
      },
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
      process.env.REACT_APP_API_ENDPOINT + "/management/badge/delete/1",
      { withCredentials: true }
    );
  });
});
