const express = require('express');
const router = express.Router();
const issuesController = require('../controller/issueController');

// route for create issue here
router.post('/createIssue/:projectId',issuesController.createIssue);

// route for resolve issue here
router.post('/resolveIssue/:issueId',issuesController.resolveIssue);

router.post('/filterByAuthor',issuesController.filterByAuthor);

module.exports = router;
