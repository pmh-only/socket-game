/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (event, _mapData, playerData, solve) {
  if (event !== 'mark') return

  const mark1 = playerData.mark[5].find((m) => m.x > 10 && m.y === 2)
  const mark2 = playerData.mark[5].find((m) => m.x === m.y)
  if (mark1 && mark2) solve()
}

module.exports = fnc
