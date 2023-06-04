const express = require('express');
const router = express.Router();
const issuesController = require('../controller/issueController');

// route for create issue here
router.post('/createIssue/:projectId',issuesController.createIssue);



// route for filter by author
router.post('/filterByAuthor',issuesController.filterByAuthor);

// route for filter by Labels
router.post('/filterByLabels',issuesController.filter);

module.exports = router;
