import React from 'react'
import { storiesOf } from '@kadira/storybook'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import styles from './styles'
import { AsyncStatus } from '../lib/constants'

storiesOf('Header Menu', module)
  .addDecorator(story => (
    <div style={styles.centerBlack}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {story()}
      </MuiThemeProvider>
    </div>
  ))
  .add('Anonymous User', () => {
    const auth = {
      status: AsyncStatus.FAILED
    }
    const onNavigationChange = () => {
    }

    return (
      <Header auth={auth} onNavigationChange={onNavigationChange} />
    )
  })
  .add('Authenticated User', () => {
    const auth = {
      status: AsyncStatus.SUCCESS
    }

    const onNavigationChange = () => {
    }
    return (
      <Header auth={auth} onNavigationChange={onNavigationChange} />
    )
  })
