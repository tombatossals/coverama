import express from 'express'
import fs from 'fs'
import api from './backend/api'
import config from '../config'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import expressMonitor from 'express-status-monitor'
import { spotifyFetchData } from './lib/spotify'
import { dbInsert } from './lib/database'

const app = express()
app.use(expressMonitor())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let index
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../build`))
  index = fs.readFileSync(`${__dirname}/../build/index.html`, 'utf8')
} else {
  app.get('/favicon.ico', proxy({target: `${config.clientProxy}`}))
  app.get('/static*', proxy({target: `${config.clientProxy}`}))
  app.post('/sockjs-node*', proxy({target: `${config.clientProxy}`}))

  index = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css?family=Nunito|Roboto" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Playlists</title>
        <link rel="shortcut icon" href="/favicon.ico">
      </head>
      <body>
        <div class="content">
          <div class="overlay"></div>
          <div id="root"></div>
        </div>
        <script type="text/javascript" src="/static/js/bundle.js"></script>
      </body>
    </html>`
}

app.post('/api/collect', (req, res) =>
  spotifyFetchData(req.body, config.spotify).then(data =>
    dbInsert(data, req.body.table).then(data =>
      res.json(data)).catch(err => res.status(500).send(err.message))
    ).catch(err => res.status(500).send(err.message))
  .catch(err => res.status(500).send(err.message)))

app.use('/', (req, res) => res.status(200).send(index))
api.run(app)
