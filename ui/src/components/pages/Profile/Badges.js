import React from "react";
import {
    Typography
  } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
export class Badges extends React.Component {
  render() {
    let users_level = this.props.level;
    // let users_level = 5;
    let value = 1;  
    let list = [];
    // if (users_level == 0){
    //     list.push(<img src={require(`../../../images/1.PNG`)} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)"}}/>);
    // }
    while (users_level >= value && value <= 10){
        let level = this.props.listOfLevels.find(item => item.level == value)
        let title =  <React.Fragment><Typography color="inherit">{level.name}</Typography><em>{level.value} Stars</em></React.Fragment>
        list.push(<Tooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125"/></Tooltip>);
        value = value + 1;
    }
    if (users_level < 10){
        console.log(value);
        let level = this.props.listOfLevels.find(item => item.level == value)
        let title =  <React.Fragment><Typography color="inherit">Next Badge</Typography><Typography color="inherit">{level.name}</Typography><em>{level.value - this.props.current} Stars Away</em></React.Fragment>
        list.push(<Tooltip title={title}><img src={require(`../../../images/${value}.PNG`)} alt="badge" width="125" height="125" style={{filter:"grayscale(100%)"}}/></Tooltip>);
    }
    return (
        <div>
            <Typography variant="h4"><b>Badges</b></Typography>
            <div>{list}</div>
        </div>
    );
  }
}
