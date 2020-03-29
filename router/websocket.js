/* eslint-disable standard/no-callback-literal */
/**
 * @type {null}
 */
const _ = null
const maps = require('./maps')
const sha256 = require('sha256')

/**
 * @param {import('socket.io').Server} app
 * @param {import('./sessions')} session
 */
function fnc (app, session) {
  app.on('connect', (socket) => {
    socket.on('auth', (uid, cb) => {
      const ip = socket.request.connection.remoteAddress
      const requestAt = new Date()

      if (typeof uid !== 'string') return
      if (typeof cb !== 'function') return
      const query = session.get(uid)
      if (!query) return cb('Not vaild uid')
      else if (query.ip !== sha256(ip)) return cb('Not vaild request')
      else return cb(_, { inited: !!query.data.inited, requestAt, responceAt: new Date(), uid, sid: socket.id, map: query.data.map })
    })

    socket.on('init', (uid, cb) => {
      const requestAt = new Date()

      if (typeof uid !== 'string') return
      if (typeof cb !== 'function') return

      const query = session.get(uid)
      if (!query) return cb('Not vaild uid')
      session.init(uid)
      return cb(_, { inited: !!query.data.inited, requestAt, responceAt: new Date(), uid, sid: socket.id, map: query.data.map })
    })

    socket.on('map', (uid, map, cb) => {
      if (typeof uid !== 'string') return
      if (typeof map !== 'number') return
      if (typeof cb !== 'function') return

      const query = session.get(uid)
      if (!query) return cb('Not vaild uid')
      if (query.data.map !== map) return cb('Not vaild request')

      const mp = maps[map]
      if (!mp) return cb('Not vaild map')

      if (!query.data.cord) {
        query.data.cord = { x: maps[map].spawn[0], y: maps[map].spawn[1] }
      }
      session.push(uid, query.data)

      return cb(_, mp)
    })

    socket.on('player', (uid, cb) => {
      if (typeof uid !== 'string') return
      if (typeof cb !== 'function') return

      const query = session.get(uid)
      if (!query) return cb('Not vaild uid')
      return cb(_, query.data)
    })

    socket.on('move', (uid, key, cb) => {
      if (typeof uid !== 'string') return
      if (typeof key !== 'number') return
      if (typeof cb !== 'function') return

      const query = session.get(uid)
      if (!query) return

      function solve () {
        session.solve(uid)
        const map2 = maps[query.data.map]
        if (map2) query.data.cord = { x: map2.spawn[0], y: map2.spawn[1] }
        session.push(uid, query.data)
      }

      const map = maps[query.data.map]
      if (!map) return

      if (map.script) {
        map.script('move', map, query.data, solve)
      }

      if (!query.data.cord) {
        query.data.cord = { x: map.spawn[0], y: map.spawn[1] }
      }

      let x = query.data.cord.x
      let y = query.data.cord.y

      switch (key) {
        case 87:
        case 38: {
          if (query.data.cord.x > 0) x = query.data.cord.x - 1
          break
        }

        case 68:
        case 39: {
          if (query.data.cord.y < map.width - 1) y = query.data.cord.y + 1
          break
        }

        case 83:
        case 40: {
          if (query.data.cord.x < map.height - 1) x = query.data.cord.x + 1
          break
        }

        case 65:
        case 37: {
          if (query.data.cord.y > 0) y = query.data.cord.y - 1
          break
        }
      }

      if (map.fills[x]) {
        if (map.fills[x][y] === 1) return cb(_)
      }
      query.data.cord = { x, y }
      session.push(uid, query.data)
      return cb(_)
    })
  })
}

module.exports = fnc
