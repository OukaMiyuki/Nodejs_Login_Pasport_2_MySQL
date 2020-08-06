const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../Config/auth');

router.get('/', forwardAuthenticated, (req, res) => {
    res.render("welcome");
});
//dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render("dashboard");
});

module.exports = router;