const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mpIntegration = require('./mpIntegration');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000; 

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {view:'home'});
});

app.get('/detail', function (req, res) {
    let qry = req.query;
    qry.view = 'item';
    res.render('detail', qry);
});

app.get('/success', function (req, res) {

    let qry = req.query;
    qry.view = '';
    res.render('success', qry);
});

app.get('/failure', function (req, res) {
    let qry = req.query;
    qry.view = '';
    res.render('failure', qry);
});

app.get('/pending', function (req, res) {
    let qry = req.query;
    qry.view = '';
    res.render('pending', qry);
});

app.post('/payment', (req,res) => mpIntegration.postPreferences(req,res));

app.post('/mp/notification',function(req, res) {
    console.log('NOTIFICATION: ',req.body);
    res.statusCode = 200;
    res.end("OK");
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
