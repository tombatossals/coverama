import express from 'express'
import fs from 'fs'
import api from './backend/api'
import config from '../config'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import { spotifyFetchData } from './lib/spotify'
import {
  dbInsert,
  getTables
} from './lib/database'

const app = express()
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React App</title>
        <link rel="shortcut icon" href="/favicon.ico">
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/static/js/bundle.js"></script>
      </body>
    </html>`
}

app.post('/api/collect', (req, res) =>
  getTables().then(tables =>
    spotifyFetchData(req.body, config.spotify).then(data =>
      dbInsert(data, tables[req.body.table]).then(data => res.json(data))
    ).catch(err => console.log(err))
  .catch(err => console.log(err))))

app.use('/', (req, res) => res.status(200).send(index))
api.run(app)
