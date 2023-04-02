const {Router} = require('express');
const router = Router();
const {getCountrys,getCountryId} = require('../controller/Country');

router.route('/').get(getCountrys);
router.route('/:id').get(getCountryId)

module.exports = router