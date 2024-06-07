'use strict'

const express = require('express');
const router = express.Router();

const ReposController = require('../../controllers/repos.controller');

router.get('', ReposController.getAll);
router.get('/langs', ReposController.getLangTypes)

module.exports = router;