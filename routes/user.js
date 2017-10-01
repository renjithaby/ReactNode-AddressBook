var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var multer = require('multer');


//multer storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads') //./public/uploads
    },
    filename: function (req, file, cb) {
        if(file) {
            cb(null, file.fieldname + '-' + Date.now()+file.mimetype.replace("image/","."))
        }else{

        }
    }
});
var upload = multer({ storage:storage }).single('profilePic');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var app = req.app;
  res.send('respond with a resource');
});



/* POST to  remove user Service */
router.post('/removeuser', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var id = req.query.id;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({"_id": id}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send({ result: "failed",message:"There was a problem adding the information to the database."});
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* POSt to addcontact service */
router.post('/addcontact',function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("error is thrown");
            return
        }

        // Set our internal DB variable
        var db = req.db;
        var userId = req.body.userid;
        //create the new contact
        var newContact = {};
        newContact.id = Date.now().toString();
        newContact.name = req.body.name;
        newContact.address = req.body.address;
        newContact.email = req.body.email;
        newContact.mobile = req.body.mobile;
        newContact.profilePicUrl = req.file ? req.file.path.replace("public/","") : "uploads/default.png";

        // Set our collection
         var collection = db.get('usercollection');
        //update the user contacts with new contact
         collection.update(
            {_id: userId},
            {$push: {contacts: newContact}}
         ,function (err, doc) {
             if (err) {
                 // If it failed, return error
                 res.send({result :"failed",message:"There was a problem adding the information to the database."});
             }
             else {
                 collection.find({
                 "_id" : userId
                 },
                 function (err, doc) {
                     if (err) {
                         // If it failed, return error
                         res.send({result: "failed", detail:"Incorrect information."});
                     }
                     else {
                         if (doc.length > 0) {
                            res.send(doc[0]);
                         } else {
                            res.send({result: "failed", detail:"wrong id"});
                         }
                     }
                 });
             }
         });

    });

});


/* POST to updatecontact service */
router.post('/updatecontact', function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            console.log("errorr is thrown");
            return
        }

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userId = req.body.userid;
    var newContact = {};
    newContact.id = req.body.contactId;
    newContact.name = req.body.name;
    newContact.address = req.body.address;
    newContact.email = req.body.email;
    newContact.mobile = req.body.mobile;
        if(req.file){
            newContact.profilePicUrl = req.file.path.replace("public/","")
        }else if(req.body.profilePicUrl){
            newContact.profilePicUrl =  req.body.profilePicUrl;
        }else{
            newContact.profilePicUrl =  "uploads/default.png";
        }

    // Set our collection
    var collection = db.get('usercollection');

    // update the specific contact
    collection.update(
        {_id: userId,"contacts.id":newContact.id},
        { $set: { "contacts.$" : newContact } }
       ,function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send({result :"failed",message:"There was a problem adding the information to the database."});
            }
            else {
                collection.find({
                        "_id" : userId
                    },
                function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send({result :"failed",message:"There was a problem adding the information to the database."});
                    }
                    else {
                        if (doc.length > 0) {
                            res.send(doc[0]);
                            //res.redirect("addaddress");
                        } else {
                            res.send({result :"failed",message:"There was a problem adding the information to the database."});
                        }
                    }
                });
            }
        });

    });
});

/* POST to deletecontact service */
router.post('/deletecontact', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userId = req.body.userid;
    var contactId =req.body.contactid;

    // Set our collection
    var collection = db.get('usercollection');

    collection.update(
        {_id:userId},
        {$pull:{contacts:{id :contactId}}},
        { multi: true }
        , function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send({result :"failed",message:"There was a problem adding the information to the database."});
            }
            else {
                collection.find({
                        "_id" : userId
                    },
                    function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send({result :"failed",message:"There was a problem adding the information to the database."});
                        }
                        else {
                            if (doc.length > 0) {
                                res.send(doc[0]);
                            } else {
                                res.send({result :"failed",message:"There was a problem adding the information to the database."});
                            }
                        }
                    }
                );
            }
        }
    );
});


/* POST to loadUserFromToken service */
router.post('/loadUserFromToken', function (req, res) {
    var db = req.db;

    var userId = req.decoded._id;
    var collection = db.get('usercollection');


    collection.find({_id:userId}, {limit:5, sort:{time:-1}}, function (err, docs) {

        if (err) {
            // If it failed, return error
            res.send({result: "failed", message: "There was a problem adding the information to the database."});
        }
        else {

            res.send({result: "success", user: docs[0]});
        }
    });
});




module.exports = router;
