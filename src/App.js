import React, { Component } from "react";
import Layout from './Layout';
import Demo from './DemoOG.jsx';
import { Route, IndexRoute, browserHistory } from 'react-router';
import globalStore from "./stores/globalStore.jsx";
import HeaderOne from "./headerOne.jsx";

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dragging: globalStore.getDragging(),
    };
  }
  componentWillMount() {
    globalStore.on("change", this.updateDragging.bind(this));
  }
  updateDragging() {
    this.setState({
      dragging: globalStore.getDragging()
    });
  }
  render() {
    const { dragging } = this.state;
    var headline;
    switch( this.props.location.pathname.toLowerCase() ) {
      case "/":
      headline = "Drag a bubble"
        break;
      case "/aboutme":
        headline = "About me";
        break;
      case "/siteinfo":
        headline = "Site info";
        break;
      case "/credits":
       headline = "Acknowledgements";
    }
    var finalHeader = dragging ? "Drag here" : headline;
    return (
      <div className="demo5">
      	<HeaderOne>{finalHeader}</HeaderOne>
      	<Demo count="0" msg="bio" {...this.props} />
      	<Demo count="1" msg="site info" {...this.props} />
      	<Demo count="2" msg="credits" {...this.props} />
      	{this.props.children}
      </div>
    );
  }
}
