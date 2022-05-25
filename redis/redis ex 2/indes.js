var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    mongoUrl = 'mongodb://localhost:27017/testredis';

    var access = require('./acc');
    var redisClient = require('redis').createClient;
    var redis = redisClient(6379, 'localhost');

    MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw 'Error connecting to database - ' + err;
    else {}

    app.post('/book', function (req, res) {
        if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
        else if (!req.body.text) res.status(400).send("Please send some text for the book");
        else {
            access.saveBook(db, req.body.title, req.body.author, req.body.text, function (err) {
                if (err) res.status(500).send("Server error");
                else res.status(201).send("Saved");
            });
        }
    });

    app.get('/book/:title', function (req, res) {
        if (!req.params('title')) res.status(400).send("Please send a proper title");
        else {
            access.findBookByTitle(db, req.params('title'), function (book) {
                if (!text) res.status(500).send("Server error");
                else res.status(200).send(book);
            });
        }
    });
    app.get('/book/:title', function (req, res) {
        if (!req.params('title')) res.status(400).send("Please send a proper title");
        else {
            access.findBookByTitleCached(db, redis, req.params('title'), function (book) {
                if (!text) res.status(500).send("Server error");
                else res.status(200).send(book);
            });
        }
    });


    app.listen(8000, function () {
        console.log('Listening on port 8000');
    });
});