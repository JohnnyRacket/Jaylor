//server.js

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var sheetsAPI = require('./quickstart.js');
var path = require('path');
// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');//http://localhost:8888

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//servers html page
app.get('/', function(req, res){
    console.log("GET Index");
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.use('/views',express.static(path.join(__dirname, '/../views')));
app.use('/css',express.static(path.join(__dirname, '/../css')));
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/getMovies', function(req, res) {
    //res.json({ message: 'hello world' });
    sheetsAPI.getMovies(function(result){
    	res.json(result);
    })
});
router.get('/getFoods', function(req, res) {
    //res.json({ message: 'hello world' });
    sheetsAPI.getFoods(function(result){
    	res.json(result);
    })
});

router.post('/addMovie', function(req, res) {
	var title = req.body.title;
	var genre = req.body.genre;
	console.log("trying to add movie");
    //res.json({ message: 'hello world' });
    sheetsAPI.addMovie(title, genre, function(result){
    	//res.json(result);
    	console.log("done trying to add movie")
    })
    //res.json(sheetsAPI.getMovies()[0][0]);   
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

