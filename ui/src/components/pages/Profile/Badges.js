import React from "react";
import {
    Typography, Box
  } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
export class Badges extends React.Component {
  render() {
    let users_level = this.props.level;
    console.log(users_level);
    let value = 1;  
    let list = [];
    if (users_level  > 0){
      console.log("here");
      while (users_level >= value && value <= 20){
        let level = this.props.listOfLevels.find(item => item.level == value)
        let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value} Stars</em></React.Fragment>
        list.push(<Tooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="100" height="100"/></Tooltip>);
        value = value + 1;
      }
    }
    // if (users_level < 20){
    //     let level = this.props.listOfLevels.find(item => item.level == value)
    //     let title =  <React.Fragment><Typography color="inherit">Next Badge</Typography><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
    //     list.push(<Tooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)"}}/></Tooltip>);
    // }
    while (value <= 20){
      let level = this.props.listOfLevels.find(item => item.level == value)
      let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
      list.push(<Tooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="100" height="100" style={{filter:"grayscale(100%)"}}/></Tooltip>);
      value = value + 1;
    }
    return (
            <Box>
            <Box sx={{ pb: 3, width: '75%'}}>
              <Typography variant="h4"><b>Badges</b></Typography>
              <Box sx={{ typography: 'body2', color: 'text.secondary'}}><Typography>Unlock new badges when you earn stars for your Pull Requests</Typography></Box>
              
              <br></br>
            </Box>
            <div style ={{"background-color": "#E6E6E6"}}>{list}</div>
            </Box>
    );
  }
}
