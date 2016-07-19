import React, { Component } from "react";
import * as globalActions from "./actions/globalActions.jsx";
import globalStore from "./stores/globalStore.jsx";

export default class HeaderOne extends Component {
  constructor() {
    super();
      this.state={class:"blue",
      temp: false,
	};
  }
  componentWillMount() {
    globalStore.on("change", this.changeClass.bind(this));
  }
  changeClass() {
    if( globalStore.getDragging() && globalStore.getInBox() ) {
    	this.setState({class: "yellow"});
    }
    else if( globalStore.getDragging() && !globalStore.getInBox() ) {
    	this.setState({class: "red"});
    }
    else {
    	this.setState({class: ""});
    }
  }
  handleMouseOver() {
    globalActions.updateInBox(true);
  }
  handleMouseLeave() {
    globalActions.updateInBox(false);
  }
  render() {
  	const color = this.state.class;
    return (
      <h1 onMouseLeave={this.handleMouseLeave.bind(this)}
      onMouseEnter={this.handleMouseOver.bind(this)} className={color}>
        {this.props.children}
      </h1>
    );
  }
}