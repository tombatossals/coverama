import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Login, Logout } from '../containers/User'
import Layout from '../containers/Layout'
import VideoSearch from '../components/VideoSearch'
// import Home from '../components/Home'
import PlayList from '../containers/PlayList'
import Track from '../containers/Track'
import requireAuth from '../containers/RequireAuth'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/home" />
    <Route path="/" component={Layout}>
      <Route path="home" component={requireAuth(PlayList)} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="video-search" component={requireAuth(VideoSearch)} />
      <Route path="playlist" component={requireAuth(PlayList)} />
      <Route path="track/:id" component={requireAuth(Track)} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
