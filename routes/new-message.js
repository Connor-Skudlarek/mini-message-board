var express = require('express')
var router = express.Router()

router.get('/', function(req,res,next){
    res.render('new-message', {})
})

router.post('/', function(req,res,next){
    res.locals.messages.push({
        text: req.body.message,
        user: req.body.author,
        added: new Date(),
    })
    res.cookie('messages', res.locals.messages)
    res.redirect('/')
})

module.exports = router