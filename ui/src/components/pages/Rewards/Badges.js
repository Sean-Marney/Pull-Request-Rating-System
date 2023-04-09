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
      console.log(this.props);
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
      let users_badge;
        if (this.props.level === 0){
          users_badge = "You have not earned any badges yet";
        } else{
          users_badge = "Your current level is " + this.props.levelList.find(item => item.level === this.props.level).name;
        }
        // let users_badge = this.props.levelList.find(item => item.level == this.props.level).name;
        let users_level = this.props.level;
        let value = 1;  
        let list = [];
        if (users_level  > 0){
          while (users_level >= value && value <= 20){
            let level = this.props.levelList.find(item => item.level === value)
            let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value} Stars</em></React.Fragment>
            list.push(<Grid item xs={2}  key={value} style ={{"backgroundColor": "#E6E6E6"}}><LightTooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125" style ={{ "display": "block","marginLeft": "auto","marginRight": "auto"}}/></LightTooltip></Grid>);
            value = value + 1;
          }
        }
        while (value <= 20){
          let level = this.props.levelList.find(item => item.level === value)
          let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
          list.push(<Grid item xs={2} key={value} style ={{"backgroundColor": "#E6E6E6"}}><LightTooltip title={title} wrapper="span"><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)", "display": "block","marginLeft": "auto","marginRight": "auto"}}/></LightTooltip></Grid>);
          value = value + 1;
        }
        const classes = this.props.style;

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