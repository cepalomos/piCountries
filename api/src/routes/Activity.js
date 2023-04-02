const {Router} = require('express');
const router = Router();
const {getActiviti} = require('../controller/Activity');

router.route('/').get(getActiviti)

module.exports = router