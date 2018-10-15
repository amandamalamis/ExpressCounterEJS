var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser');

app.use(session({secret: 'secretkey'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs'); 

// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, result) {
    if (!request.session.visits) {
        request.session.visits = 1
    } else {
        request.session.visits++;
    }
    console.log(request.session.visits);
    visits1 = { visits: request.session.visits }
    result.render("index", visits1);
});

app.get('/two', function(request, result) {
    request.session.visits++;
    result.redirect('/');
});

app.get('/reset', function(request, result) {
    request.session.visits = 0;
    result.redirect('/');
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})
  
  