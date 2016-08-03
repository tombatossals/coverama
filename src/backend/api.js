import horizon from '@horizon/server'
import config from '../../config'
import fs from 'fs'
import https from 'https'

const run = (app) => {
  const port = config.express.port
  let server

  if (config.ssl && config.express.hasOwnProperty('ssl')) {
    let options = {
      key: fs.readFileSync(config.express.ssl.key),
      cert: fs.readFileSync(config.express.ssl.cert)
    }
    server = https.createServer(options, app)
  } else {
    server = app
  }

  const httpserver = server.listen(port, err => {
    if (err) {
      console.log(err)
    }
    console.log('Listening on port ' + port)
  })

  const hserver = horizon(httpserver, config.horizon)
  if (config.ssl) {
    if (config.providers.github) {
      hserver.add_auth_provider(horizon.auth.github, config.providers.github)
    }

    if (config.providers.google) {
      hserver.add_auth_provider(horizon.auth.google, config.providers.google)
    }
  }
}

export default {
  run
}
