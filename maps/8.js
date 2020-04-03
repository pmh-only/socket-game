/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (_event, _mapData, playerData, solve) {
  if (playerData.cord.x === 31 && playerData.cord.y === 30) solve()
}

module.exports = fnc
