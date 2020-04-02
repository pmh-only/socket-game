const { random } = require('../utils/utils')

/**
 * @param {import('../router/sessions').data} playerData
 */
function fnc (event, _mapData, _playerData, solve) {
  if (event !== 'move') return

  /**
   * random(max): 0 ~ max까지의 숫자들 중 무작위
   */
  const i = random(100)
  if (i === 69) solve()
}

module.exports = fnc
