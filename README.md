# Gamification System

  

## Table of Contents

- [Getting Started](#getting-started)

- [Clone Repository](#clone-repository)

- [Installation](#installation)

- [Documentation](#documentation)

- [Deployment](#deployment)

- [GitLab CI/CD Pipeline Setup Instructions](#pipeline)

  
  

## Getting started


### Clone Repository

  

Clone the repository:

```

git clone https://git.cardiff.ac.uk/c1986023/team7_gamificationsystem.git

```

  

**Read the next section to learn how to install the required NPM packages**

  

### Installation

  
- To setup your machine to work on the server(api), consult to the `README.md` in `/api` directory.

- To setup your machine to work on the user interface(ui), consult to the `README.md` in `/ui` directory.


### Deployment

- The website is deployed using AWS
- The link is http://pullmaster.io-react.s3-website.eu-north-1.amazonaws.com
- The code is deployed every time code is committed to the main branch


### GitLab CI/CD Pipeline Setup Instructions

This guide will help you set up the GitLab CI/CD pipeline defined in the .gitlab-ci.yml file for this project. The pipeline consists of two stages, "Builds" and "Unit Tests", and is executed using the Docker image node:16.15.0.

**Prerequisites:**
- Make sure you have a GitLab account and access to the project repository
- Install Git and Docker on your local machine

**Instructions:**
- After cloning the project to the machine 
- Set up the GitLab runner on your local machine following the official GitLab documentation https://docs.gitlab.com/runner/install/

- Register the GitLab runner for the project repository. Follow the official GitLab documentation for instructions https://docs.gitlab.com/runner/register/

- Once the GitLab runner is registered and running, it should automatically pick up the .gitlab-ci.yml file from the project repository and execute the pipeline when you push a commit to the default branch or create a merge request

- To trigger the pipeline manually, push a new commit to the default branch or create a merge request:

```
git checkout <branch>
git add .
git commit -m "Trigger pipeline"
git push origin <branch>

```

- Replace <branch> with the name of the branch you want to push the commit to 
- Visit the project's CI/CD Pipelines page on GitLab to view the pipeline's progress and logs https://gitlab.com/<your-gitlab-username>/<project-name>/-/pipelines
- Replace <your-gitlab-username> with your GitLab username and <project-name> with the name of the project repository
- Once the pipeline is completed, the build artifacts will be available under the "Job artifacts" section on the pipeline details page

### Debugging

- If the pipeline fails or you encounter issues, you can:
- Check the logs of the GitLab runner to get more information about the error
- Modify the .gitlab-ci.yml file to include more debugging information (such as printing the current directory using pwd or listing files using ls)
- Ensure that you have the latest versions of Git and Docker installed on your local machine
- Verify that the GitLab runner is running and registered correctly
- For more information on GitLab CI/CD, consult the official GitLab CI/CD documentation https://docs.gitlab.com/ee/ci/README.html