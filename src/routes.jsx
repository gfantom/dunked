import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App';
import AboutMe from './views/AboutMe.jsx';
import SiteInfo from './views/SiteInfo.jsx';
import Credits from './views/Credits.jsx';

module.exports = (
  <Route path="/" component={App}>
    <Route path="/AboutMe" component={AboutMe}/>
    <Route path="/SiteInfo" component={SiteInfo}/>
    <Route path="/Credits" component={Credits}/>
  </Route>
)