const path = require('path').resolve()
const { readdir } = require('fs')
const maps = []

load()
setInterval(load, 1000)

function load () {
  readdir(path + '/maps', (err, files) => {
    if (err) console.log(err)
    else {
      files.forEach((f) => {
        const map = require(path + '/maps/' + f)
        maps[parseInt(f.replace('.json', ''))] = map
      })
    }
  })
}

module.exports = maps
