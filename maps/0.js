function fnc (event, _mapData, playerData, solve) {
  if (event !== 'move') return
  if (playerData.cord.x === 0) {
    solve()
  }
}

module.exports = fnc
