require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT;
const articleRoutes = require('./routes/articleRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((error)=> console.log('Connexion à MongoDB échouée ! ', error))

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());

app.use('/article', articleRoutes);
app.use('/portfolio', portfolioRoutes);


app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`)
})

