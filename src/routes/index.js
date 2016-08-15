import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Login, Logout } from '../containers/User'
import Layout from '../containers/Layout'
import FrontPage from '../containers/FrontPage'
import Playlist from '../containers/Playlist'
import Track from '../containers/Track'
import Artist from '../containers/Artist'
import Album from '../containers/Album'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/playlists" />
    <Route path="/" component={Layout}>
      <Route path="playlists" component={FrontPage} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="playlist/:playlistSlug" component={Playlist} />
      <Route path="playlist/:playlistSlug/track/:trackSlug" component={Track} />
      <Route path="artist/:artistSlug/album/:albumSlug/track/:trackSlug" component={Track} />
      <Route path="artist/:artistSlug" component={Artist} />
      <Route path="artist/:artistSlug/album/:albumSlug" component={Album} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
