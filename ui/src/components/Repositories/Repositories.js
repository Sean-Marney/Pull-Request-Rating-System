import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Select,
  Typography,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState("");
  const [pullRequests, setPullRequests] = useState([]);

  const getPullRequests = async (repositoryName) => {
    const token = "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"; // replace with your own GitHub token
    const headers = {
      Authorization: `Token ${token}`,
      "User-Agent": "mern-github-app",
    };

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repositoryName}/pulls`,
        { headers }
      );
      setPullRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepositoryChange = (event) => {
    setSelectedRepository(event.target.value);
    getPullRequests(event.target.value);
  };

  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await axios.get(
          "http://localhost:8000/management/repositories"
        );
        setRepositories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getRepositories();
  }, []);

  return (
    <div>
      <Typography variant="h4">
        <b>Pending Pull Requests</b>
      </Typography>
      <Select value={selectedRepository} onChange={handleRepositoryChange}>
        <MenuItem value="" disabled>
          Select a repository
        </MenuItem>

        {repositories.map((repository) => (
          <MenuItem key={repository.id} value={repository.full_name}>
            {repository.name}
          </MenuItem>
        ))}
      </Select>
      {pullRequests.length > 0 && (
        <List>
          {pullRequests.map((pullRequest) => (
            <ListItem key={pullRequest.id}>
              <ListItemText
                primary={pullRequest.title}
                secondary={`#${pullRequest.number} opened by ${pullRequest.user.login}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RepositoryList;
