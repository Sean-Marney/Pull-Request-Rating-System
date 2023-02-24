// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import CreateFAQ from "../components/pages/ManageFAQPage/CreateFAQForm";
// import { MemoryRouter } from "react-router-dom";
// import "@testing-library/jest-dom/extend-expect";
// import axios from "axios";

// jest.mock("axios", () => ({
//     post: jest.fn(),
// }));

// describe("Testing CreateFaq component", () => {
//     test("displays validation error when faq question is not entered", async () => {
//         render(
//             <MemoryRouter>
//                 <CreateFAQ />
//             </MemoryRouter>
//         );

//         // find the faq question input field and set it to empty
//         const questionInput = screen.getByLabelText("Question");
//         fireEvent.change(questionInput, { target: { value: "" } });

//         // find the submit button and click it
//         const createFaqButton = screen.getByText("Create Faq");
//         fireEvent.click(createFaqButton);

//         // wait for validation to complete and display error message
//         await waitFor(() => {
//             const errorMessage = screen.getByText("You must enter a question");
//             expect(errorMessage).toBeInTheDocument();
//         });
//     });

//     test("displays validation error when an answer is not entered", async () => {
//         render(
//             <MemoryRouter>
//                 <CreateFAQ />
//             </MemoryRouter>
//         );

//         // find the answer input field and set it to empty
//         const answerInput = screen.getByLabelText("Answer");
//         fireEvent.change(answerInput, { target: { value: "" } });

//         // find the submit button and click it
//         const createFaqButton = screen.getByText("Create Faq");
//         fireEvent.click(createFaqButton);

//         // wait for validation to complete and display error message
//         await waitFor(() => {
//             const errorMessage = screen.getByText(
//                 "You must enter an answer"
//             );
//             expect(errorMessage).toBeInTheDocument();
//         });
//     });

//     test("creates a new faq when form is submitted with valid data", async () => {
//         const mockPost = jest.fn();
//         mockPost.mockResolvedValueOnce({ data: { success: true } });
//         axios.post.mockImplementation(mockPost);

//         render(
//             <MemoryRouter>
//                 <CreateFAQ />
//             </MemoryRouter>
//         );

//         // find the faq name input field and set it to a valid value
//         const questionInput = screen.getByLabelText("Question");
//         fireEvent.change(questionInput, { target: { value: "New Question" } });

//         // find the stars required input field and set it to a valid value
//         const answerInput = screen.getByLabelText("Answer");
//         fireEvent.change(answerInput, { target: { value: "New Answer" } });

//         // find the submit button and click it
//         const createFaqButton = screen.getByText("Create faq");
//         fireEvent.click(createFaqButton);

//         // Wait for axios.post and navigation to complete
//         await waitFor(() => {
//             expect(mockPost).toHaveBeenCalledWith(
//                 "http://localhost:8000/management/manageFaqs/create",
//                 { question: "New Question", answer: "New Answer" }
//             );
//         });

//         await waitFor(() => {
//             expect(screen.getByText("Create New FAQ")).toBeInTheDocument();
//         });
//     });
// });
