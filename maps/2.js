const { random } = require('../utils/utils')

function fnc (event, _mapData, playerData, solve) {
  if (event !== 'move') return

  /**
   * random(max): 0 ~ max까지의 숫자들 중 무작위
   */
  const i = random(100)
  if (i === 69) solve()
}

module.exports = fnc
