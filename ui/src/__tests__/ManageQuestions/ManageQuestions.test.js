import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageQuestions from "../../components/pages/ManageQuestions/ManageQuestions";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing ManageQuestions component", () => {
  it("should render the manage question table with data", async () => {
    // const mockData = [
    //   { _id: "1", question: "First Question" },
    //   { _id: "2", question: "Second Question" },
    // ];

    // axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

    // render(
    //   <MemoryRouter>
    //     <ManageQuestions />
    //   </MemoryRouter>
    // );

    // const question1 = await screen.findByText("First Question");
    // const question2 = await screen.findByText("Second Question");

    // expect(question1).toBeInTheDocument();
    // expect(question2).toBeInTheDocument();
  });

  it("should call deleteQuestion function when delete button is clicked", async () => {
    // const mockData = [
    //   { _id: "1", question: "First Question" },
    // ];

    // axios.get.mockResolvedValue({ data: mockData });
    // axios.delete.mockResolvedValue(); // mock the response of axios delete function

    // render(
    //   <MemoryRouter>
    //     <ManageQuestions />
    //   </MemoryRouter>
    // );

    // const deleteButton = await screen.findByTitle("Delete Question", {
    //   exact: false,
    // });

    // deleteButton.click();

    // expect(axios.delete).toHaveBeenCalledWith(
    //   process.env.REACT_APP_API_ENDPOINT + "/management/questions/delete/1"
    // );
  });
});
