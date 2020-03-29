/**
 * @typedef {{ip: String, uid: String, data: data}} session
 * @typedef {{inited: boolean, name: String, map: Number, cord: { x: Number, y: Number }}} data
 */

/**
 * @type {null}
 */
const _ = null
const uuid = require('uuid').v4
const sha256 = require('sha256')
const crypto = require('crypto-random-string')
const { writeFileSync } = require('fs')

/**
 * @type {session[]}
 */
const sessions = require('../data/sessions.json')
const defaultData = (ip) => { return { ip: sha256(ip), uid: uuid(), data: { inited: false }, solve } }
const save = () => writeFileSync('data/sessions.json', JSON.stringify(sessions, _, 2))
const checkData = (ip, uid) => sessions.find((s) => s.ip === sha256(ip || 'null') || s.uid === uid)
const checkDataIndex = (ip, uid) => sessions.findIndex((s) => s.ip === ip || s.uid === uid)

setInterval(save, 2000)

/**
 * @param {String} ip
 * @returns {session}
 */
function regist (ip) {
  if (!checkData(ip)) sessions.push(defaultData(ip))
  return checkData(ip)
}

/**
 * @param {String} uid
 * @returns {session}
 */
function get (uid) {
  return checkData(_, uid)
}

/**
 * @param {String} uid
 * @param {data} data
 */
function push (uid, data) {
  if (!checkData(_, uid)) return
  sessions[checkDataIndex(_, uid)].data = data
}

/**
 * @param {String} uid
 */
function init (uid) {
  if (!checkData(_, uid)) return
  if (checkData(_, uid).data.inited) return
  push(uid, { inited: true, name: 'Guest #' + crypto({ length: 5 }), createdAt: new Date(), map: 0, player: null })
}

/**
 * @param {String} uid
 */
function solve (uid) {
  if (!checkData(_, uid)) return
  if (!checkData(_, uid).data.inited) return
  const player = checkData(_, uid)
  player.data.map++
  player.data.cord = null
  push(uid, player.data)
}

module.exports = { regist, get, push, init, solve }
