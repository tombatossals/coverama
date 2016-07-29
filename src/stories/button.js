import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

storiesOf('Buttons', module)
  .addDecorator(story => (
    <div style={styles.center}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {story()}
      </MuiThemeProvider>
    </div>
  ))
  .add('Raised button', () => (
    <div>
      <RaisedButton style={styles.button} label="Default" onClick={action('click')} />
      <RaisedButton
        style={styles.button}
        primary
        label="Primary"
        onClick={action('click')} />
      <RaisedButton
        style={styles.button}
        secondary
        label="Secondary"
        onClick={action('click')} />
      <RaisedButton
        style={styles.button}
        disabled
        label="Disabled"
        onClick={action('click')} />
    </div>
  ))
