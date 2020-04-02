/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (event, _mapData, playerData, solve) {
  if (event !== 'move') return

  /* Init */
  if (!playerData.map4) playerData.map4 = { sw: false, count: 0 }

  /* alias */
  const sw = playerData.map4.sw
  const x = playerData.cord.x
  const y = playerData.cord.y

  /* Add */
  if (sw && x === 1 && y === 1) {
    playerData.map4.count++
    playerData.map4.sw = false
  }

  if (!sw && x === 3 && y === 3) {
    playerData.map4.count++
    playerData.map4.sw = true
  }

  /* Check */
  if (playerData.map4.count > 10) solve()
}

module.exports = fnc
