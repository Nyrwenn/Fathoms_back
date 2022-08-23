const Portfolio = require('../models/portfolioModel');
const fs = require('fs');

exports.createPortfolio = async (req, res, next) =>{
    try{
        const portfolioObject = req.body;
        let portfolio;
        if(req.file){
            portfolio = await Portfolio.create({
            ...portfolioObject,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        }else{
            portfolio = await Portfolio.create({
                ...portfolioObject
            })
        }
      
        portfolio.save()
        res.status(201).json({message: "Portfolio created !"})
    }

    catch(error){
        console.log(error),
        res.status(400).json({error});
    }
}

exports.modifyPortfolio = async (req, res, next) =>{
    try{

        const portfolio = await Portfolio.findOne({_id: req.params.id});

        const portfolioObject = req.body;

        let filename = null;
        if(req.file){
            filename = portfolio.picture.split('/images/')[1];
                 fs.unlink(`images/${filename}`, async () =>{
            await Portfolio.updateOne({_id: req.params.id}, {
                picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                ...portfolioObject
            })
        })
            res.status(201).json({message: "The portfolio has been updated !"})

        }else{
            await Portfolio.updateOne({_id: req.params.id},{
                ...portfolioObject
            })
            res.status(201).json({message: "The portfolio without image has been updated ! "})

        }

    }

    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
}

exports.deletePortfolio = async (req, res, next) => {
    try{
        const portfolio = await Portfolio.findOne({_id: req.params.id});

        const filename = portfolio.picture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Portfolio.deleteOne({_id: req.params.id})
            .then(() => {
                res.status(200).json({message: "The portfolio has been deleted !"});
            })
            .catch((error)=>{
                res.status(400).json({error});
            })
        })

    }

    catch(error){
        console.log(error);
        res.status(400).json({error})
    }
}

exports.getAllPortfolios = async (req, res, next) =>{
   Portfolio.find()
   .then((portfolio => res.status(200).json(portfolio)))
   .catch((error => res.status(400).json({error})))
}

exports.getOnePortfolio = async (req, res, next) =>{
    try{
        const portfolio = await Portfolio.findOne({_id: req.params.id})
        res.status(200).json(portfolio)
    }

    catch(error){
        console.log(error);
        res.status(400).json({error})
    }
}