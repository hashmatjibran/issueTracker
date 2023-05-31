// requiring express
const express = require('express');

// requiring port on which the server will be listening
const PORT = 8000;

// requiring path 
const path = require('path');

// using config i.e config related to db etc
const config = require('./config/config');

// requiring express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// creating an constant App 
const app = express();

//requiring body-parser
const bodyParser = require('body-parser');

// using layouts
app.use(expressLayouts);

//using statics
app.use(express.static('./Assets'));

// setting up view engine

app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

// extracting styles and sripts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// using body parser to parse request data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// setting up routes folder for keeping the code neat an clean
app.use('/',require(path.join(__dirname,'./Routes/index.js')));


// listening on the specified port
app.listen(PORT,(err)=>{
    if(err){
        console.log('error in listen on port : ',PORT)
    }
});

