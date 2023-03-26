const {Router} = require('express');
const router = Router();
const {getCountrys} = require('../controller/Country');

router.route('/').get(getCountrys);

module.exports = router