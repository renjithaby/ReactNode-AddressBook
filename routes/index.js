var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');

var loginId = null;



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Helloo World'});
});


router.post('/adduser', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = req.body.password;
    var userEmail = req.body.email;

    // Set our collection
    var collection = db.get('usercollection');

    collection.find({
        "username": userName
    }, function(err, user) {

        if (err) throw err;

        if (user[0]) {
            res.send({result: "failed", message: 'Username already taken, please try again.'});
        }else {
            collection.insert({
                "username": userName,
                "password": userPassword,
                "email": userEmail,
                "contacts":[]
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send({result:"failed",message:"There was a problem adding the information to the database."});
                }
                else {
                    // And forward to success page
                    res.send({result: "success"});
                }
            });
        }

    });

});

// route to authenticate a user
router.post('/authenticate', function(req, res) {
    console.log("req.body.name");
    //console.log(req.body.name);
    var app = req.app;
    var db = req.db;

    var collection = db.get('usercollection');
    // Submit to the DB
    collection.find({
        "username": req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user[0]) {
            res.json({ result: "failed", message: 'Authentication failed. User not found.' });
        } else if (user[0]) {
            console.log("user.password");
            console.log(user[0].password);
            console.log("req.body.password");
            console.log(req.body.password);
            // check if password matches
            if (user[0].password != req.body.password) {
                res.json({ result: "failed", message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user[0], app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });
                var decoded = jwt.verify(token, app.get('superSecret'));

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user:user[0]
                });
            }

        }
    });
});


/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
         res.render('userlist', {
         "userlist" : docs
         });
    });
});


module.exports = router;
