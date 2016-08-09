import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router'
import './styles.css'

export default () => (
  <div className="header">
    <Link to="/"><Logo>Spotify Playlists</Logo></Link>
  </div>
)
