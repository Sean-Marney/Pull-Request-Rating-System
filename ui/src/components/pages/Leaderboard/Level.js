import React from "react";
import {
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import Grid from '@mui/material/Grid';

export class Level extends React.Component {

    render() {
        let image;
        let level = this.props.levelList.filter(item => item.value <= this.props.current).sort((a, b) => b.value - a.value)[0];
        if (level.name === "No Badge") {
            image = <div></div>;
        }else{
            const blob = new Blob([Int8Array.from(level.img.data.data)], {type: level.img.data.contentType });
            const imagsrc = window.URL.createObjectURL(blob);
            image = <img src={imagsrc} alt="badge" width="50" height="50" style ={{ "display": "block","marginLeft": "auto","marginRight": "auto"}}/>;
        }
        return (

            <Grid container spacing={4}>
            <Grid item>
              <div>
                {image}
              </div>

            </Grid>
                <Grid item style={{"text-align": "center"}}>
                {level.name}
                </Grid>
            </Grid>
        );
    }
}