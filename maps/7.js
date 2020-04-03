const { random } = require('../utils/utils')

/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (event, _mapData, playerData, solve) {
  if (event !== 'mark') return
  if (playerData.mark[7].length >= random(1000)) solve()
}

module.exports = fnc
