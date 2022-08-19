const Article = require('../models/articlesModel');
const fs = require('fs');

exports.createArticle = async (req, res, next) =>{
    try{
        const articleObject = req.body;
        console.log(articleObject);

        const article = await Article.create({
            ...articleObject,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })

        article.save()
        res.status(201).json({message : "Article created !"})
    }

    catch (error){
        console.log(error);
        res.status(400).json({error})
    }
}