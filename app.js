const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

const hostname = '127.0.0.1';
const port = 3000;

//mongoose
const dbUrl = 'mongodb://127.0.0.1:27017/phonebook';
mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('Database connection successful'))
.catch((err)=>console.error('Database connection failed ' + err));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static files CSS
app.use(express.static(path.join(__dirname, 'public')));

//view engine
//below two line prevents access denied issue
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

//upload files
app.use(upload());

//method-override middleware to delete through form post
app.use(methodOverride('_method'));


//route
const route = require('./routes/route');
app.use('/', route);


app.listen(port, hostname, ()=>{
    console.log(`The server is running at http://${hostname}:${port}`);
});