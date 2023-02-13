import React from "react";

export class PullRequestItem extends React.Component {
  render() {
    return (
        <div>
            <h1>Solved Navbar Bug</h1>
            <a href={this.props.pullRequest.url}>#{this.props.pullRequest._id}</a>
        </div>
    );
  }
}
