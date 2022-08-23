const Article = require('../models/articlesModel');
const fs = require('fs');

exports.createArticle = async (req, res, next) =>{
    try{
        const articleObject = req.body;
        let article;
      if(req.file){
            article = await Article.create({
            ...articleObject,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })

      }  else {
            article = await Article.create({
                ...articleObject
            })

      }
      

        article.save()
        res.status(201).json({message : "Article created !"})
    }

    catch (error){
        console.log(error);
        res.status(400).json({error})
    }
}

exports.modifyArticle = async (req, res, next) => {
    try{
        const article = await Article.findOne({_id: req.params.id});

        const articleObject = req.body;

        let filename = null;
        if(req.file){
            filename = article.picture.split('/images/')[1];
             fs.unlink(`images/${filename}`, async () =>{
            await Article.updateOne({_id: req.params.id}, {
                picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                ...articleObject
            })

            })
            res.status(201).json({message: "The article has been updated !"})
        }else{
            await Article.updateOne({_id: req.params.id}, {
                ...articleObject
            })

            res.status(201).json({message: "The article without image has been updated !"})
        }

    }

    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
}

exports.deleteArticle = async (req, res, next) =>{
    try{

        const article = await Article.findOne({_id: req.params.id});

        const filename = article.picture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Article.deleteOne({_id: req.params.id})
            .then(() => {
                res.status(200).json({message: "The article has been deleted !"});
            })
            .catch((error)=>{
                res.status(400).json({error});
            })
        })

    }

    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
}

exports.getAllArticles = async (req, res, next) =>{
    Article.find()
    .then((article => res.status(200).json(article)))
    .catch((error => res.status(400).json({error})))

}

exports.getOneArticle = async (req, res, next) => {
    try{
        const article = await Article.findOne({_id: req.params.id})
        res.status(200).json(article);
    }

    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
}