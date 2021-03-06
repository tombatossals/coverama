import express from 'express'
import fs from 'fs'
import api from './backend/api'
import config from '../config'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import expressMonitor from 'express-status-monitor'
import { spotifyFetchData } from './lib/spotify'
import { dbInsert } from './lib/database'
import cors from 'cors'

const app = express()
app.use(expressMonitor())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

let index
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../build`))
  index = fs.readFileSync(`${__dirname}/../build/index.html`, 'utf8')
} else {
  app.get('/favicon.ico', proxy({target: `${config.clientProxy}`}))
  app.get('/static*', proxy({target: `${config.clientProxy}`}))
  // app.post('/sockjs-node*', proxy({target: `${config.clientProxy}`}))

  index = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css?family=Nunito|Roboto" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" sizes="180x180" href="./src/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="./src/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="./src/favicon-16x16.png" sizes="16x16">
        <link rel="mask-icon" href="./src/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="theme-color" content="#f5c20f">
        <title>Coverama</title>
      </head>
      <body>
        <div class="container">
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
