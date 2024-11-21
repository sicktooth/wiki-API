const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const {connectDB} = require('./config/database')
const {createDocument, destroyArticles, getArticles} = require('./routes/all')
const {getTitle, putTitle, patchTitle, destroyDoc} = require('./routes/specific')

connectDB();
/*
    REQUESTS TARGETING ALL ARTICLES
*/
app.route('/articles')
    .get(getArticles)
    .post(createDocument)
.delete(destroyArticles);
/*
    REQUESTS TARGETING SPECIFIC ARTICLE
*/
app.route('/articles/:articleTitle')
    .get(getTitle)
    .put(putTitle)
    .patch(patchTitle)
    .delete(destroyDoc)

app.listen(PORT, ()=>{
    console.log("server started at localhost:" + PORT);
})