const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../controllers/portfolioControllers');
const multer = require('../middlewares/multer');

router.post('/create', multer, portfolioCtrl.createPortfolio);
router.get('/getAllPortfolios', portfolioCtrl.getAllPortfolios);
router.get('/:id', portfolioCtrl.getOnePortfolio);
router.put('/:id', multer, portfolioCtrl.modifyPortfolio);
router.delete('/:id', multer, portfolioCtrl.deletePortfolio);

module.exports = router; 