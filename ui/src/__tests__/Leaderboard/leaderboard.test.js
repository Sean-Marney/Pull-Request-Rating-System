import React from "react";
import { render, waitFor,screen} from "@testing-library/react";
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
  render(<Leaderboard />);

    // Check that the data is displayed correctly
    mockResponse.forEach(async (user) => {
      const name = await screen.findByText(user.name);
      expect(name).toBeInTheDocument();
      const starsEarnt = await screen.findByText(user.totalStarsEarned);
      expect(starsEarnt).toBeInTheDocument();
    });
});
