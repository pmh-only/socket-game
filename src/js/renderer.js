/* global r0c0 table title container hljs */
// eslint-disable-next-line no-unused-vars
function render (data, socket) {
  if (data.sid !== socket.id) return
  socket.emit('map', data.uid, data.map, (err, mapData) => {
    if (err) r0c0.innerText = 'Render Fail : ' + err

    socket.emit('player', data.uid, (err2, playerData) => {
      if (err2) title.innerText = playerData.map + '. ' + mapData.name + ' [Error: ' + err2 + ']'
      _render(mapData, playerData)
    })

    document.addEventListener('keydown', (e) => {
      socket.emit('move', data.uid, e.keyCode, (err2) => {
        if (err2) title.innerText = data.map + '. ' + mapData.name + ' [Error: ' + err2 + ']'
        socket.emit('player', data.uid, (err3, playerData) => {
          if (err3) title.innerText = playerData.map + '. ' + mapData.name + ' [Error: ' + err3 + ']'
          socket.emit('map', data.uid, playerData.map, (err4, mapData2) => {
            if (err4) title.innerText = playerData.map + '. ' + mapData2.name + ' [Error: ' + err4 + ']'
            _render(mapData2, playerData)
          })
        })
      })
    })
  })
}

function _render (mapData, playerData) {
  title.innerText = playerData.map + '. ' + mapData.name
  clearTable()

  for (let i = 0; i < mapData.width; i++) {
    const row = table.insertRow(i)
    for (let j = 0; j < mapData.height; j++) {
      const cell = row.insertCell(j)

      let fill = 0
      if (!mapData.fills[i]) fill = 0
      else if (!mapData.fills[i][j]) fill = 0
      else fill = mapData.fills[i][j]

      switch (fill) {
        case 0: {
          cell.style.backgroundColor = 'white'
          break
        }

        case 2: {
          cell.style.backgroundColor = 'skyblue'
          break
        }

        case 1:
        default: {
          cell.style.backgroundColor = 'black'
        }
      }

      if (fill < 0) {
        cell.style.backgroundColor = 'pink'
        if (i === playerData.cord.x && j === playerData.cord.y) {
          if (mapData.ments) {
            const f = fill * -1 - 1
            if (mapData.ments[f]) {
              document.getElementsByClassName('ment')[0].innerHTML = mapData.ments[f]
              container.style.opacity = '0.6'
            }
          }
        }
      } else if (fill === 2) {
        if (i === playerData.cord.x && j === playerData.cord.y) {
          document.getElementsByClassName('ment')[0].innerHTML =
            '<code class="code">' + mapData.scriptRaw.split('\n').join('<br/>').split(' ').join('&nbsp;') + '</code>'
          container.style.opacity = '0.6'
          hljs.highlightBlock(document.getElementsByClassName('code')[0])
        }
      } else {
        if (i === playerData.cord.x && j === playerData.cord.y) {
          document.getElementsByClassName('ment')[0].innerHTML = ''
          container.style.opacity = '1'
        }
      }

      if (i === playerData.cord.x && j === playerData.cord.y) cell.style.backgroundColor = 'gold'

      if (playerData.mark[playerData.map]) {
        const mark = playerData.mark[playerData.map].find((v) => {
          if (!v) return false
          return v.x === i && v.y === j
        })

        if (mark) cell.style.borderColor = '#FF0000A0'
        else cell.style.borderColor = '#00000010'
      }
    }
  }
}

function clearTable () {
  table.innerHTML = ''
}
