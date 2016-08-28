import React from 'react'
import { withMediaPlayer, withMediaProps, controls } from 'react-media-player'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import './styles.css'

const { CurrentTime, SeekBar, Duration, Volume } = controls

class AudioPlayer extends React.Component {
  render () {
    const { Player, media, tracks } = this.props
    if (tracks.length === 0) {
      return null
    }

    return (
      <div>
        {media.isLoading && <span>Loading...</span>}
        <div onClick={media.playPause}>
          {Player}
        </div>
        <nav className="media-controls">
          <PlayPause className="media-control media-control--play-pause" />
          <CurrentTime className="media-control media-control--current-time" />
          <SeekBar className="media-control media-control--volume-range" />
          <Duration className="media-control media-control--duration" />
          <MuteUnmute className="media-control media-control--mute-unmute" />
          <Volume className="media-control media-control--volume" />
        </nav>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  Player: React.PropTypes.object.isRequired,
  media: React.PropTypes.object.isRequired,
  tracks: React.PropTypes.array.isRequired
}

export default withMediaPlayer(withMediaProps(AudioPlayer), 'audio')
