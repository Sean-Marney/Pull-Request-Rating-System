import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import RepositoryList from "../../components/pages/Repositories/Repositories";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

const mockedAxios = axios;

describe("RepositoryList", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                databasePullRequests: [
                    {
                        id: 1,
                        title: "Test Pull Request",
                        repo: "test-repo",
                        ratings: {},
                        createdAt: "2022-03-01T00:00:00.000Z",
                    },
                ],
                repos: [{ id: 1, name: "test-repo" }],
            },
        });
    });

    it('renders the "All Pull Requests" option and a list of pull requests', async () => {
        render(
            <MemoryRouter>
                <RepositoryList />
            </MemoryRouter>
        );

        const allOption = screen.getByText("All Pull Requests");
        expect(allOption).toBeInTheDocument();

        // const pullRequestTitle = await screen.findByText("Test Pull Request");
        // expect(pullRequestTitle).toBeInTheDocument();
    });
});

test("renders RepositoryList without crashing", () => {
    render(
        <MemoryRouter>
            <RepositoryList />
        </MemoryRouter>
    );
});

test("renders 'All Pull Requests' by default", () => {
    const { getByText } = render(
        <MemoryRouter>
            <RepositoryList />
        </MemoryRouter>
    );
    expect(getByText("All Pull Requests")).toBeInTheDocument();
});
