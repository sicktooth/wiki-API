const {Article} = require('../config/database');

// GET request on specific document by title
const getTitle = async (req, res) => {
    let requestedTitle = req.params.articleTitle;
    try {
        const results = await Article.findOne({title: requestedTitle});
        if (!results) {
            res.status(404).send({
                message: 'Slow down player...',
                error: "It seems the title typed in is not in here"
            })
        } else {
            res.status(200).send(results)
        }
    } catch (error) {
       res.status(500).send({
            message: 'error getting your request, try again later',
            error: error.message
       }) 
    }
}

//PUT request on specific document by title
const putTitle = async (req,res) => {
    let requestedTitle = req.params.articleTitle;
    try {
        const updatedArticle = await Article.findOneAndReplace(
            {title: requestedTitle},
            {title: req.body.title, content: req.body.content},
            { new: true, overwrite: true, runValidators: true }
            
        )
        if (!updatedArticle) {
            console.error('It\'s your fault not mine :D')
            res.status(404).send({
                message: "what you seek is definately not on our servers"
            })
        } else {
            res.status(200).send("Rest, it\'s done")
        }
    } catch (error) {
        res.status(500).send({
            message: 'This might be from us so go grab a popcorn and wait while we fix it',
            error: error.message
        })
    }
}
//PATCH request on specific document by title
const patchTitle = async (req, res) => {
    let requestedTitle = req.params.articleTitle;
    let update = req.body
    try {
        const updatedArticle = await Article.findOneAndUpdate(
            {title: requestedTitle},
            update,
            { new: true, runValidators: true }
            
        )
        if (!updatedArticle) {
            console.error('It\'s your fault not mine :D')
            res.status(404).send({
                message: "what you seek is definately not on our servers"
            })
        } else {
            res.status(200).send("Rest, it\'s done")
        }
    } catch (error) {
        res.status(500).send({
            message: 'This might be from us so go grab a popcorn and wait while we fix it',
            error: error.message
        })
    }
}

//DELETE request on specific document by title

const destroyDoc = async (req, res) => {
    let requestedTitle = req.params.articleTitle;
    try {
        const donDeal = await Article.findOneAndDelete({title: requestedTitle});
        if (!donDeal) {
            console.error("What you wish to kill is not in existence")
            res.status(404).send({
                message: "That which you seek to kill/destroy is out of our reach or has been dealt with"
            })
        } else {
            res.status(200).send("It is done!")
        }
    } catch (error) {
        res.status(500).send({
            message: 'THis might be an error from our assassins, seat back while we employ a sniper',
            error: error.message
        })
    }
}

module.exports={
    getTitle,
    putTitle,
    patchTitle,
    destroyDoc
}