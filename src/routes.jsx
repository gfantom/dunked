import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './App';
import AboutMe from './views/AboutMe.jsx';
import SiteInfo from './views/SiteInfo.jsx';
import Credits from './views/Credits.jsx';
import Redir404 from './views/Redir404-2.jsx';

module.exports = (
  <Route path="/" component={App}>
  //should I actually render component App in IndexRoute...
    <Route path="/AboutMe" component={AboutMe}/>
    <Route path="/SiteInfo" component={SiteInfo}/>
    <Route path="/Credits" component={Credits}/>
    <Route path="/404" component={Redir404}/>
    <Redirect from="*" to="/404" />
  </Route>
)