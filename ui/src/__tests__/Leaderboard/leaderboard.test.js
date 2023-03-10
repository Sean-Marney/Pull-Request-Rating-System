import React from "react";
import { render, waitFor,} from "@testing-library/react";
import Leaderboard from "../../components/pages/Leaderboard/Leaderboard";
import axios from "axios";
import '@testing-library/jest-dom';


jest.mock("axios");

test("renders leaderboard data", async () => {
  // Mock the API response
  const mockResponse = [
    { name: "Alice", totalStarsEarned: 3 },
    { name: "Bob", totalStarsEarned: 2 },
    { name: "Charlie", totalStarsEarned: 1 },
  ];
  axios.get.mockResolvedValue({ data: mockResponse });

  // Render the component
  const { getByText } = render(<Leaderboard />);

  // Wait for the API call to finish and the data to be displayed
  await waitFor(() => {
    // Check that the data is displayed correctly
    mockResponse.forEach((user) => {
      expect(getByText(user.name)).toBeInTheDocument();
      expect(getByText(user.totalStarsEarned.toString())).toBeInTheDocument();
    });
  });
});
