// requiring express
const express = require('express');

// requiring port on which the server will be listening
const PORT = 8000;

// requiring path 
const path = require('path');

// creating an constant App 
const app = express();

//requiring body-parser
const bodyParser = require('body-parser');

// setting up routes folder for keeping the code neat an clean
app.use('/',require('./Routes/index'));

//using statics
app.use(express.static('./Assets'));

// requiring express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// using layouts
app.use(expressLayouts);

// using body parser to parse request data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// setting up view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// extracting styles and sripts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// listening on the specified port
app.listen(PORT,(err)=>{
    if(err){
        console.log('error in listen on port : ',PORT)
    }
});

