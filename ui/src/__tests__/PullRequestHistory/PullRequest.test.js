import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PullRequestItem } from "../../components/PullRequestHistory/PullRequestItem";
test('Displaying Pull Request', () => {
    render(<PullRequestItem key={'Request 1'} pullRequest = {{"id": 1,"date":"02/14/2023 17:38","url": 'www.gitlab.co.uk',"git_id": '1',"rating_complete": true, "title":"Title" ,"ratings": {"overall":15}}}/>);
    const title = screen.getByText("Title");
    const rating = screen.getByText('15');
    const git_rating = screen.getByText('#1');
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(git_rating).toBeInTheDocument();
})
test('Displaying Unrated Pull Request', () => {
    render(<PullRequestItem key={'Request 1'} pullRequest = {{"id": 1,"date":"02/14/2023 17:38","url": 'www.gitlab.co.uk',"git_id": '1',"rating_complete": false, "title":"Title"}}/>);
    const title = screen.getByText("Title");
    const rating = screen.getByText('Pending rating');
    const git_rating = screen.getByText('#1');
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(git_rating).toBeInTheDocument();
})