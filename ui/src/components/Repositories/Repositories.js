import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import axios from "axios";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const response = await axios.get("http://localhost:8000/repositories");
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
        <b>Repositories</b>
      </Typography>
      <List>
        {repositories &&
          repositories.map((repository) => (
            <ListItem
              key={repository.id}
              button
              component="a"
              href={`https://github.com/${repository.full_name}`}
              target="_blank"
              rel="noreferrer"
            >
              <ListItemText
                primary={repository.name}
                secondary={repository.description}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default RepositoryList;
