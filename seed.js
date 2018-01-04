// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var nbaPlayer_List = [
    {
        name: "Kobe Bryant",
        nickname: "The Black Mamba",
        number: 24,
        position: "Shooting Guard",
        team: "LA Lakers",
    },
    {
        name: "Russel Westbrook",
        nickname: "Brodi",
        number: 0,
        position: "Point Guard",
        team: "Oklahoma City Thunder",
    },
    {
        name: "Anthony Davis",
        nickname: "The Brow",
        number: 23,
        position: "Center",
        team: "New Orleans Pelicans",
    }
]



// remove all records that match {} -- which means remove ALL records
db.NBAPlayers.remove({}, function(err, nbaPlayer){
    if(err) {
      console.log('Error occurred in remove', err);
    } else {
      console.log('Removed all NBA Players');
  
      // create new records based on the array NBAPlayer_List
      db.NBAPlayers.create(nbaPlayer_List, function(err, nbaPlayer){
        if (err){
          return console.log("Error:", err);
        }
      
        console.log("Created new list of NBA Players");
        console.log("Created", nbaPlayer.length, "players");
        process.exit(); // we're all done! Exit the program.
      });
    }
  });
