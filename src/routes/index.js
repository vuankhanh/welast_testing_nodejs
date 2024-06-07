'use strict'

const express = require('express');
const router = express.Router();
const repos = require('./repos');

router.use('/repos', repos);

module.exports = router;