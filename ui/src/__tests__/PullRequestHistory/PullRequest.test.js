import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PullRequestHistory } from "../../components/pages/History/PullRequestHistory";
import { Ratings } from "../../components/pages/History/Ratings";
test("Displaying Pull Request", () => {
    render(
        <PullRequestHistory
            key={"Request 1"}
            pullRequest={{
                id: 1,
                date: "02/14/2023 17:38",
                url: "www.gitlab.co.uk",
                git_id: "1",
                rating_complete: true,
                title: "Title",
                ratings: { overall: 15 },
            }}
        />
    );
    const title = screen.getByText("No Title");
    const rating = screen.getByText("15");
    const git_rating = screen.getByText('View in GitHub');
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(git_rating).toBeInTheDocument();
});
test("Displaying Unrated Pull Request", () => {
    render(
        <PullRequestHistory
            key={"Request 1"}
            pullRequest={{
                id: 1,
                date: "02/14/2023 17:38",
                url: "www.gitlab.co.uk",
                git_id: "1",
                rating_complete: false,
                title: "Title",
            }}
        />
    );
    const title = screen.getByText("Title");
    const rating = screen.getByText('Pending rating');
    const git_rating = screen.getByText('View in GitHub');
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(git_rating).toBeInTheDocument();
})
test('Displaying Ratings', () => {
    let testRatings = {overall:15, quality:5} 
    let testRated = true
    render(<Ratings ratings= {testRatings} rated={testRated}/>);
    const title = screen.getByText("Ratings");
    const category = screen.getByText("Quality");
    expect(category).toBeInTheDocument();
    expect(title).toBeInTheDocument();
})
