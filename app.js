var express = require('express');
var exphbs  = require('express-handlebars');
const PORT = process.env.PORT || 3000;
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});