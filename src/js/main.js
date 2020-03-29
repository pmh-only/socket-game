/* eslint-disable no-unused-vars */
/* global io render */

/**
 * @type {HTMLTableElement}
 */
const table = document.getElementsByClassName('rpoint')[0]
const title = document.getElementsByClassName('mapTitle')[0]
const container = document.getElementsByClassName('container')[0]
const query = new URLSearchParams(window.location.search)
const uid = query.get('uid')

const r0 = table.insertRow(0)
const r0c0 = r0.insertCell(0)

r0c0.innerText = 'Loading...'
document.title = 'Socket Game : ' + uid
r0c0.innerText = 'Got Unique ID : ' + uid

const socket = io()
r0c0.innerText = 'Request Auth : ' + uid
socket.emit('auth', uid, (err, data) => {
  if (err) r0c0.innerText = 'Auth Fail: ' + err
  else regists(data)
})

function regists (data) {
  r0c0.innerText = 'Auth Complete'
  if (!data) window.location.reload()
  else if (data.inited) render(data, socket)
  else init()
}

function init () {
  socket.emit('init', uid, (err, data) => {
    r0c0.innerText = 'Request Init : ' + uid
    if (err) r0c0.innerText = 'Init Fail: ' + err
    else render(data, socket)
  })
}
