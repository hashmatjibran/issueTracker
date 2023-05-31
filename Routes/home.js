const express =  require('express');
const router = express.Router();

const projectsController = require('../controller/projectsController')

router.get('/',projectsController.showProjects);

router.post('/createProject',projectsController.createProject)

module.exports = router;