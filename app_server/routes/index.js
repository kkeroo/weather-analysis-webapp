var express = require('express');
var mainCtrl = require('../controllers/MainController');
var router = express.Router();

/* GET home page. */
router.post('/generiraj_datoteko', mainCtrl.generirajDatoteko);

module.exports = router;
