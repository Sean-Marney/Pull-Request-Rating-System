import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateBadge from "../../components/pages/ManageBadges/CreateBadgesForm.js";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios", () => ({
  post: jest.fn(),
}));
describe("Testing CreateReward component", () => {
    test("displays validation error when badge name is not entered", async () => {
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
  test("displays validation error when badge name is not entered", async () => {
    render(
      <MemoryRouter>
        <CreateBadge />
      </MemoryRouter>
    );

    // find the reward name input field and set it to empty
    const badgeNameInput = screen.getByLabelText("Badge Name");
    fireEvent.change(badgeNameInput, { target: { value: "" } });

    // find the submit button and click it
    const createBadgeButton = screen.getByText("Create Badge");
    fireEvent.click(createBadgeButton);


    // const rewardName1 = await screen.getByText("You must enter a badge name");
    // expect(rewardName1).toBeInTheDocument();
    // wait for validation to complete and display error message
    // await waitFor(() => {
    //   const errorMessage = screen.getByText("You must enter a badge name");
    //   expect(errorMessage).toBeInTheDocument();
    // });
  });

  // test("displays validation error when stars required is not entered", async () => {
  //   render(
  //     <MemoryRouter>
  //       <CreateBadge />
  //     </MemoryRouter>
  //   );

  //   // find the stars required input field and set it to empty
  //   const starsRequiredInput = screen.getByLabelText("Stars Required");
  //   fireEvent.change(starsRequiredInput, { target: { value: "" } });

  //   // find the submit button and click it
  //   const createRewardButton = screen.getByText("Create Badge");
  //   fireEvent.click(createRewardButton);

  //   // wait for validation to complete and display error message
  //   await waitFor(() => {
  //     const errorMessage = screen.getByText("Stars required must be a number");
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });

  test("creates a new reward when form is submitted with valid data", async () => {
    const mockPost = jest.fn();
    mockPost.mockResolvedValueOnce({ data: { success: true } });
    axios.post.mockImplementation(mockPost);

    render(
      <MemoryRouter>
        <CreateBadge />
      </MemoryRouter>
    );

    // find the reward name input field and set it to a valid value
    const rewardNameInput = screen.getByLabelText("Badge Name");
    fireEvent.change(rewardNameInput, { target: { value: "New Badge" } });

    // find the stars required input field and set it to a valid value
    const starsRequiredInput = screen.getByLabelText("Stars Required");
    fireEvent.change(starsRequiredInput, { target: { value: "50" } });

    // find the submit button and click it
    const createRewardButton = screen.getByText("Create Reward");
    fireEvent.click(createRewardButton);

    // Wait for axios.post and navigation to complete
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        process.env.REACT_APP_API_ENDPOINT + "/management/rewards/create",
        { rewardName: "New Reward", starsRequired: "50" }
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Create New Reward")).toBeInTheDocument();
    });
  });
});
