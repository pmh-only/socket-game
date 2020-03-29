function fnc (event, _mapData, playerData, solve) {
  if (event !== 'move') return

  /* Init */
  if (!playerData.map3) playerData.map3 = 0

  /* Add */
  playerData.map3++

  /* Check */
  if (playerData.map3 > 30) solve()
}

module.exports = fnc
