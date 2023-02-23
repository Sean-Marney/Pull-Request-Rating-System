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
            { _id: "2", question: "Question Test 2", answer: "Answer Test 2" },
        ];

        axios.get.mockResolvedValue({ data: mockData }); // mock the response of axios

        render(<FAQ />);

        const question = await screen.findByText("Question Test");
        const question2 = await screen.findByText("Question Test2");
        const answer = await screen.findByText("Answer Test");
        const answer2 = await screen.findByText("Answer Test2");

        expect(question).toBeInTheDocument();
        expect(question2).toBeInTheDocument();
        expect(answer).toBeInTheDocument();
        expect(answer2).toBeInTheDocument();
    });
});
