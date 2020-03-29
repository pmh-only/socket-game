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
        if (f.endsWith('.json')) {
          const map = require(path + '/maps/' + f)
          maps[parseInt(f.replace('.json', ''))] = { ...maps[parseInt(f.replace('.json', ''))], ...map }
        } else if (f.endsWith('.js')) {
          const script = require(path + '/maps/' + f)
          maps[parseInt(f.replace('.js', ''))] = { script, scriptRaw: script.toString() }
        }
      })
    }
  })
}

module.exports = maps
