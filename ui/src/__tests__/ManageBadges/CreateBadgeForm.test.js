import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import CreateBadge from "../../components/pages/ManageBadges/CreateBadgesForm.js";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios", () => ({
  post: jest.fn(),
}));
describe("Testing CreateReward component", () => {
    test("displays basic information on the form", async () => {
    render(
      <MemoryRouter>
        <CreateBadge />
      </MemoryRouter>
    );
    const rewardName1 = await screen.getByText("Badge Name");
    expect(rewardName1).toBeInTheDocument();
    const rewardName2 = await screen.getByText("Stars Required");
    expect(rewardName2).toBeInTheDocument();
    const rewardName3 = await screen.getByText("Image");
    expect(rewardName3).toBeInTheDocument();
  });

  test("displays validation error when image hasn't been selected", async () => {
    render(
      <MemoryRouter>
        <CreateBadge />
      </MemoryRouter>
    );

    // find the submit button and click it
    const createRewardButton = screen.getByText("Create Badge");
    fireEvent.click(createRewardButton);

    // wait for validation to complete and display error message
    await waitFor(() => {
      const errorMessage = screen.getByText("Invalid File Type or Too Large. Only PNG, JPEG are allowed");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
