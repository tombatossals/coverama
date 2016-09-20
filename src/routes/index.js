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
    <Redirect from='/' to='/playlists' />
    <Route path='/' component={Layout}>
      <Route path='playlists' component={FrontPage} />
      <Route path='artists' component={FrontPage} />
      <Route path='albums' component={FrontPage} />
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
      <Route path='playlists/:playlistSlug' component={Playlist} />
      <Route path='playlists/:playlistSlug/artists/:artistSlug/tracks/:trackSlug' component={Track} />
      <Route path='artists/:artistSlug/albums/:albumSlug/tracks/:trackSlug' component={Track} />
      <Route path='artists/:artistSlug' component={Artist} />
      <Route path='artists/:artistSlug/albums/:albumSlug' component={Album} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
