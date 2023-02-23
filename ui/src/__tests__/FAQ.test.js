import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import FAQ from "../components/pages/FAQPage/FAQ";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // mock axios module


describe("Testing developer's FAQ page at /FAQ", () => {
    it("should display data on faq card", async () => {
        const mockData = [
            { _id: "1", question: "Question Test", answer: "Answer Test" },
        ];

        axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

        render(<FAQ />);

        const question = await screen.findByText("Question Test");
        const answer = await screen.findByText("Answer Test");

        expect(question).toBeInTheDocument();
        expect(answer).toBeInTheDocument();
    });
});
