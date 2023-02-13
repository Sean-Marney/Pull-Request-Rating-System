import React from "react";

export class PullRequestItem extends React.Component {
  render() {
    return (
        <div>
            <p>13/02/2023 17:34</p>
            <h1>Solved Navbar Bug</h1>
            <a href={this.props.pullRequest.url}>#{this.props.pullRequest._id}</a>
            <h3>{this.props.pullRequest.ratings.overall} Stars</h3>
        </div>
    );
  }
}
