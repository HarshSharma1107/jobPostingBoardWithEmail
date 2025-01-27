const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

// Job posting route
router.post('/', authMiddleware, postJob);

module.exports = router;
