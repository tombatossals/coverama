import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Login, Logout } from '../containers/User'
import Layout from '../containers/Layout'
// import Home from '../components/Home'
import PlayList from '../containers/PlayList'
import Track from '../containers/Track'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/home" />
    <Route path="/" component={Layout}>
      <Route path="home" component={PlayList} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="playlist" component={PlayList} />
      <Route path="track/:id" component={Track} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
