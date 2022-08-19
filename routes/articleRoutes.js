const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleControllers');
const multer = require('../middlewares/multer');

router.post('/create', multer, articleCtrl.createArticle);

module.exports = router;
