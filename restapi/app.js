var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongoUrl = "mongodb+srv://padamatigopi:gopirishi@cluster0.fgahdyv.mongodb.net/city?retryWrites=true&w=majority";
var cors = require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 8124;
// save the database connection
var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// first default route
app.get('/',(req,res) => {
    res.send("Hiii From Express")
})
app.get('/menu',(req,res) => {
    db.collection('places').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/movies',(req,res) => {
    db.collection('movienames').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/review',(req,res) => {
    db.collection('moviereview').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/reviw/:id', (req,res) =>{
    var id =parseInt(req.params.id);
    db.collection('moviereview').find({"movie_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})
/*
app.get('/cart',(req,res) => {
    db.collection('eshoping').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/items/:id', (req,res) =>{
    var id =parseInt(req.params.id);
    db.collection('curryitems').find({"curry_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

*/

MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('city');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})
