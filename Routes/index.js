const express = require('express');
const router = express.Router();

router.use('/home',require('./home'));

router.get('/',(request , response)=>{
    response.render('test');
})

module.exports = router;