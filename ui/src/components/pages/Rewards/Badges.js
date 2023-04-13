import React from "react";
import {
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export class Badges extends React.Component {

    render() {
      let earned_badges = this.props.levelList.filter(item => item.value <= this.props.current);
      let too_earn_badges = this.props.levelList.filter(item => item.value > this.props.current);


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
      let list = [];
      let index = 0;
      let users_badge ;
      if (earned_badges.length === 0){
        users_badge = "You have not earned any badges yet";
      }else{
        users_badge = "Your badge is " + (earned_badges[earned_badges.length - 1].name);
        while (index < earned_badges.length){
          let level = earned_badges[index];
          let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value} Stars</em></React.Fragment>
          list.push(<Grid item xs={2}  key={level.value} style ={{"backgroundColor": "#E6E6E6"}}><LightTooltip title={title}><img src={level.photo} alt="badge" width="125" height="125" style ={{ "display": "block","marginLeft": "auto","marginRight": "auto"}}/></LightTooltip></Grid>);
          // list.push(<Grid item xs={2}  key={level.value} style ={{"backgroundColor": "#E6E6E6"}}><LightTooltip title={title}><LocalPoliceIcon /></LightTooltip></Grid>);
          index = index + 1;
        }
      index = 0;
      }





      while (index < too_earn_badges.length){
          let level = too_earn_badges[index];
          let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
          list.push(<Grid item xs={2} key={level.value} style ={{"backgroundColor": "#E6E6E6"}}><LightTooltip title={title} wrapper="span"><img src={level.photo} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)", "display": "block","marginLeft": "auto","marginRight": "auto"}}/></LightTooltip></Grid>);
          index = index + 1;
      }
        const classes = this.props.style;
        console.log(classes);
        return (
                 <Box className={classes.tableContainer} component="span">
                        <Paper className={classes.paper}>
                            <Typography variant="h4" component='div'>
                            <b>Badges</b>
                            </Typography>
                            <Box sx={{ typography: 'body2', color: 'text.secondary'}} component='div'><Typography>Unlock new badges when you earn stars for your Pull Requests</Typography></Box>
                            <Box>
                                <Typography className={classes.starCountBox} component='div'> 
                                 <b>{users_badge}</b>
                                </Typography>
                            </Box>
                            <Box>
                                <Grid container columns={10} spacing={0} alignItems="center" justifyContent="center" style ={{ borderRadius: '20px'}} >
                                    {list}
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
        );
    }
}