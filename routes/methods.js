const {Article} = require('../config/database');

// POST route for creating a document
const createDocument = async (req, res)=>{
    let title = req.body.title,
    content = req.body.content;
    try {
        const savedArticles = await Article.create({title: title, content:content});
        res.status(200).send("successfully added the new article as follows: "+savedArticles);
    } catch (error) {
        console.error("Error saving articles:", error);
        res.status(500).send({
            message: "An error occurred while saving articles.",
            error: error.message
        });
    }
}
// GET route to find and view all documents in the collection
const getArticles = async (req, res)=>{
    try {
        const foundArticles = await Article.find();
        if (foundArticles.length > 0){
            res.status(200).send(foundArticles);
        } else {
            console.error('whyyyyyy')
            res.status(404).send({
                message: "It's your fault, not mine :)",
                error: "but whyyyyy"
            })
        }
        
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send({
            message: "An error"+code+" occurred while fetching articles.",
            error: error.message,
        });
    }
}
// DELETE route to dellete all documents in the collections
const destroyArticles = async (req, res)=> {
    try {
        await Article.deleteMany();
        res.status(200).send("You made it! it\'s all gone :D");
    } catch (error) {
        res.status(500).send({
            message: "Found the nut too hard to chew try again later",
            error: error.message
        })
    }
}

module.exports= {
    createDocument,
    getArticles,
    destroyArticles
}