import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import ManageFAQ from "../components/pages/ManageFAQPage/ManageFAQs";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module

describe("Testing ManageFAQs component", () => {
    it("should display data on the manage faqs table", async () => {
        const mockData = [
            { _id: "1", question: "Question Test", answer: "Answer Test" }
        ];

        axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

        render(
            <MemoryRouter>
                <ManageFAQ />
            </MemoryRouter>
        );

        const question = await screen.findByText("Question Test");
        const answer = await screen.findByText("Answer Test");

        expect(question ).toBeInTheDocument();
        expect(answer).toBeInTheDocument();
    });

    it("should call deleteFAQ function when delete button is clicked", async () => {
        const mockData = [
            { _id: "1", question: "Question Test", answer: "Answer Test" },
        ];

        axios.get.mockResolvedValue({ data: mockData });
        axios.delete.mockResolvedValue(); // mock the response of axios delete function

        render(
            <MemoryRouter>
                <ManageFAQ />
            </MemoryRouter>
        );

        const deleteButton = await screen.findByTitle("Delete faq", {
            exact: false,
        });

        deleteButton.click();

        expect(axios.delete).toHaveBeenCalledWith(
            "http://localhost:8000/management/manageFaqs/delete/1"
        );
    });
});
