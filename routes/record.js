const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/products").get(function(req, res) {
    let db_connect = dbo.getDb("products");
    db_connect.collection("products").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/products/:id").get(function(req, res) {
    let db_connect = dbo.getDb("products");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("products").findOne(myquery, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/products/add").post(function(req, response){
    let db_connect = dbo.getDb("products");
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };
    db_connect.collection("products").insertOne(myobj, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/update/:id").post(function(req, response){
    let db_connect = dbo.getDb("products");
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level:  req.body.level
        },
    };
    db_connect.collection("products").updateOne(myquery, newValues, function(err, res){
        if (err) throw err;
        console.log("1 document updated successfully");
        response.json(res);
    });
});

recordRoutes.route("/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("products");
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("products").deleteOne(myquery, function(err, obj){
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj);
    });
})

module.exports = recordRoutes;



module.exports = recordRoutes;