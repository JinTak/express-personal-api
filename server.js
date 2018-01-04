// import { NBAPlayers } from './models/index';

// require express and other modules
var express = require('express');
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Hi, I'm Jin. Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/JinTak/express-personal-api/blob/master/README.md", // CHANGE ME
    base_url: "https://afternoon-inlet-66263.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/nbaplayers", description: "Shows my favorite NBA players."}, // CHANGE ME
      {method: "GET", path: "/api/nbaplayers/:id", description: "Shows ONE of my favorite NBA players."}, // CHANGE ME
      {method: "POST", path: "/api/nbaplayers", description: "CREATES an NBA player."}, // CHANGE ME
      {method: "PUT", path: "/api/nbaplayers/:id", description: "UPDATES one of my favorite NBA players."}, // CHANGE ME
      {method: "DELETE", path: "/api/nbaplayers/:id", description: "DELETES on of my favorite NBA players."} // CHANGE ME
    ]
  })
});

// =====================
// Route to Profile API
// =====================
app.get('/api/profile', (req, res) => {

  let jinProfile = {
    name: "Jin Tak",
    github_link: "https://github.com/JinTak",
    github_profile_image: "https://avatars0.githubusercontent.com/u/33187157?s=400&v=4",
    current_city: "Denver",
    pets: {
      name: "Mimi",
      breed: "Yorkie",
      gender: "Female"
    }
  }

  res.json(jinProfile);
});

////////////////////
//  CRUD ROUTES
///////////////////

// ================================================
// 1. Route to SHOW all NBA Players from database
// ================================================
app.get('/api/nbaplayers', (req, res) => {
  
  db.NBAPlayers.find(function(err, nbaPlayers){
    if (err) { return console.log("index error: " + err); }
    res.json(nbaPlayers);
  });

});

// =======================================
// 2. Route to SHOW one NBA Player by id
// =======================================
app.get('/api/nbaplayers/:id', (req, res) => {
  
  db.NBAPlayers.findById(req.params.id, (err, nbaPlayer) => {
    if(err) {
      res.json("Sorry, Player was not found.");
    }
    res.json(nbaPlayer);
  });

});

// ==================================
// 3. Route to CREATE NBA Player
// ==================================
app.post('/api/nbaplayers', (req, res) => {
  
  var newPlayer = new db.NBAPlayers({
    name: req.body.name,
    nickname: req.body.nickname,
    number: req.body.number,
    position: req.body.position,
    team: req.body.team
  }); 

  db.NBAPlayers.create(newPlayer, (err, nbaPlayer) => {
    if(err) {
      console.log("Sorry, could not create new player.")
    } else {
      if(!req.body.name || !req.body.nickname || !req.body.number || !req.body.position || !req.body.team ){
        res.json("Please enter name, nickname, number, position, and team properties.");
      } else {
        res.json("Created new player: " + nbaPlayer);
      }
    }
  });

});

// =====================================
// 4. Route to UPDATE NBA Player by id
// =====================================
app.put('/api/nbaplayers/:id', (req, res) => {
  
  if(!req.body.name || !req.body.nickname || !req.body.number || !req.body.position || !req.body.team ){
    res.json("Please enter title, author, image, and releaseDate properties.");
  } else {
    db.NBAPlayers.findOneAndUpdate({_id: req.params.id}, {$set:{name:req.body.name, nickname:req.body.nickname, number:req.body.number, position:req.body.position, team:req.body.team}}, {new:true}, function(err, nbaPlayer){
      if(err) {
        res.json("Sorry, NBA player not found.");
      }
      else {
        res.json("Found and updated the player.");
        console.log(nbaPlayer);
      };
    });
  }

});

// ====================================
// 5. Route to DELETE NBA Player by id
// ====================================
app.delete('/api/nbaplayers/:id', (req, res) => {
  
  db.NBAPlayers.findById(req.params.id, function (err, nbaPlayer) {
    var playerToDelete = nbaPlayer;

    db.NBAPlayers.remove( {_id: req.params.id }, (err) => {
      if(err) {
        res.json("Error: Player was not removed.")
        console.log("Error: Player was not removed.")
      }
      else {
        res.json("Successfully removed " + playerToDelete + "!")
        console.log("Successfully removed " + playerToDelete + "!");}
    }); 
    
  });

});


// Catch URL's that have no specified route
app.get('*', (req, res) => {
  
  res.json("Sorry this page does not exist!");

});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
