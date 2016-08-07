import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Login, Logout } from '../containers/User'
import Layout from '../containers/Layout'
import PlayLists from '../containers/PlayLists'
import PlayList from '../containers/PlayList'
import Track from '../containers/Track'
import Artist from '../containers/Artist'
import Album from '../containers/Album'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/playlists" />
    <Route path="/" component={Layout}>
      <Route path="playlists" component={PlayLists} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="playlist/:playlistId" component={PlayList} />
      <Route path="playlist/:playlistId/track/:trackId" component={Track} />
      <Route path="artist/:artistId" component={Artist} />
      <Route path="artist/:artistId/album/:albumId" component={Album} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
