import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import ClaimIcon from "@material-ui/icons/Redeem";
import { useCookies } from "react-cookie";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "../../styles/tableStyle";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export class Badges extends React.Component {

    render() {
      const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));
        let users_badge = this.props.levelList.find(item => item.level == this.props.level).name;
        let users_level = this.props.level;
        let value = 1;  
        let list = [];
        if (users_level  > 0){
          while (users_level >= value && value <= 20){
            let level = this.props.levelList.find(item => item.level == value)
            let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value} Stars</em></React.Fragment>
            list.push(<Grid item xs={2} style={{"align-items": "center"}}><LightTooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125"/></LightTooltip></Grid>);
            value = value + 1;
          }
        }
        while (value <= 20){
          let level = this.props.levelList.find(item => item.level == value)
          let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
          list.push(<Grid item xs={2}  style ={{"background-color": "#E6E6E6"}}><Box justify="center" alignItems="center"><LightTooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)", "align-items": "center", "text-align": "center"}}/></LightTooltip></Box></Grid>);
          value = value + 1;
        }
        const classes = this.props.style;

        return (
            <div>
                 <div className={classes.tableContainer}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4">
                            <b>Badges</b>
                            </Typography>
                            <Box>
                                <Typography className={classes.starCountBox}>
                                 <b>Your current level is {users_badge}</b>
                                </Typography>
                            </Box>
                            <Box>
                                <Grid container columns={10} justifyContent="space-evenly" justify="center" alignItems="center" style ={{ borderRadius: '20px'}} >
                                    {list}
                                </Grid>
                            </Box>
                        </Paper>
                    </div>
            </div>
        );
    }
}