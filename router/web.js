/**
 * @param {import('express').Express} app
 * @param {import('./sessions')} session
 */
function fnc (app, session) {
  app.get('/', (req, res) => {
    const { uid } = req.query
    if (!uid) res.redirect('/?uid=' + session.regist(req.ip).uid)
    else if (session.get(uid)) {
      res.render('play')
    } else {
      res.redirect('/')
    }
  })
}

module.exports = fnc
