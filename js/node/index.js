var express = require('express');
var app = express();
const cart = require('./cart.json');
const product_comments = require('./product-comments.json');
const product_info = require('./product-info.json');
const products = require('./products.json');
const categories = require('./categories.json');
const category_info = require('./category-info.json');


app.get('/cart', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(cart);
});

app.get('/product-comments', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(product_comments);
});

app.get('/product-info', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(product_info);
});

app.get('/products', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(products);
});

app.get('/categories', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(categories);
});

app.get('/category-info', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.set("Content-Type", "application/json");
    res.json(category_info);
});

app.listen(8000);


console.log('servidor en la url http://127.0.0.1:8000/');