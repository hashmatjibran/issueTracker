const express = require('express');
const router = express.Router();
const projectsController = require('../controller/projectsController');

router.get("/view/:id",projectsController.getProjectDescription);

module.exports = router;