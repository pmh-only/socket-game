/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (event, _mapData, playerData, solve) {
  if (event !== 'move') return

  const bool1 = playerData.cord.x === 28
  const bool2 = playerData.cord.y === 29
  if (bool1 && bool2) {
    solve()
  }
}

module.exports = fnc
