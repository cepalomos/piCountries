const {Router} = require('express');
const router = Router();
const {getActiviti,postActivity} = require('../controller/Activity');

router.route('/').get(getActiviti).post(postActivity)

module.exports = router