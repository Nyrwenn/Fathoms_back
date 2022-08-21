const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleControllers');
const multer = require('../middlewares/multer');

router.post('/create', multer, articleCtrl.createArticle);
router.get('/getAllArticles', articleCtrl.getAllArticles);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', multer, articleCtrl.modifyArticle);
router.delete('/:id', multer, articleCtrl.deleteArticle);


module.exports = router;
