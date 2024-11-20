const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const {connectDB, Article} = require('./config/database')
const {createDocument, destroyArticles, getArticles} = require('./routes/methods')

connectDB();

app.route('/articles')
    .get(getArticles)
    .post(createDocument)
    .delete(destroyArticles);

app.listen(PORT, ()=>{
    console.log("server started at localhost:" + PORT);
})