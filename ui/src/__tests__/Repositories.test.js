import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import RepositoryList from "./../components/pages/Repositories/Repositories";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("RepositoryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("it renders without errors", () => {
    render(<RepositoryList />);
    expect(screen.getByText("Pull Requests")).toBeInTheDocument();
  });
});
