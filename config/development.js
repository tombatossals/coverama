module.exports = {
  express: {
    host: '127.0.0.1',
    port: 5000,
    ssl: {
      cert: 'config/horizon-cert.pem',
      key: 'config/horizon-key.pem'
    }
  },
  clientProxy: 'http://127.0.0.1:3000',
  spotify: {
    url: 'https://accounts.spotify.com/api/token',
    clientID: 'e232969c851e4ce291f3956b8544ac22',
    clientSecret: 'aac252f97b1a480b830ffe1b9d46673b'
  },
  rethinkdb: {
    port: 28015,
    host: 'localhost',
    db: 'playlists'
  },
  horizon: {
    project_name: 'playlists',
    permissions: false,
    auto_create_collection: true,
    auto_create_index: true,
    auth: {
      token_secret: 'superSecret',
      allow_anonymous: true,
      allow_unauthenticated: true
    }
  },
  providers: {
    facebook: {
      id: '1495421584065697'
    },
    github: {
      path: 'github',
      id: '1cc2775bffaa43783ff8',
      secret: '7477913dfb02abdf2a48d3ea563b2c39a40e8b15'
    },
    google: {
      path: 'google',
      id: '356033183423-d62p87525sc0017d2ardl6k1g9u87djj.apps.googleusercontent.com',
      secret: 'U5z9SBngb3JTqSXpRApOqMkt'
    }
  }
}
