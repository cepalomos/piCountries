const {Router} = require('express');
const router = Router();
const {getActiviti,postActivity, getSeason} = require('../controller/Activity');

router.route('/').get(getActiviti).post(postActivity);
router.route('/season').get(getSeason)

module.exports = router