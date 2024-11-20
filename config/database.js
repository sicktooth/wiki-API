const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectDB = ()=> mongoose.connect('mongodb://localhost:27017/wikiDB');
const articleSchema = new Schema ({
    title: String,
    content: String
})
const Article = mongoose.model('Article', articleSchema);

module.exports={
    connectDB,
    Article
}