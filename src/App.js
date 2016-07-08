import React, { Component } from 'react';
import Layout from './Layout';
import Demo from './DemoOG.jsx';
import { Route, IndexRoute, browserHistory } from 'react-router'

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
      <div className="demo5">
      	<h1>Drag a bubble into the square</h1>
      	<Demo count="0" msg="bio" {...this.props} />
      	<Demo count="1" msg="site info" {...this.props} />
      	<Demo count="2" msg="credits" {...this.props} />
      	{this.props.children}
      </div>
    );
  }
}
