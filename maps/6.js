/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (_event, _mapData, playerData, solve) {
  const filter = (m) => (m.x + m.y) % 2 === 0
  const found = playerData.mark[6].find(filter)

  if (found) playerData.mark[6].splice(0, 9999)
  else if (playerData.mark[6].length > 16) solve()
}

module.exports = fnc
