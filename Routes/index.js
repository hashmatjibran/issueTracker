const express = require('express');
const router = express.Router();

// route for home 
router.use('/home',require('./home'));

// route for projects
router.use('/projects',require('./projects'))

// route for issues
router.use('/issues',require('./issues'));

router.get('/',(request , response)=>{
    response.redirect('/home');
});

module.exports = router;