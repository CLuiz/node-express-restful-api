// server.js

// BASE SETUP
// ============================================================================

// Call packages we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
// mongoose.connect('mongodb://test_user:test_pwd@ds159670.mlab.com:59670/chris-api-test');

var Bear = require('./app/models/bear');

// Configure app to use bodyParser
// This lets us get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Set port
const port = process.env.PORT || 8080;

// Routes for our api
// ============================================================================

// Get an instance of the express router
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next){
    // do logging
    console.log('Something is happening.');
    // make sure we go to the next routes and don't stop here
    next();
});

// Test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({message: 'Api working'});
});

// More routes will happen here

// On routes that end in /bears
router.route('/bears')

// Create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        // Create new bear instance
        var bear = new Bear();
        // Set the bear's name
        bear.name = req.body.name;

        // save bear and check for (b)errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({message: 'Bear created!'});
        });
    })

    // Get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// On routes that end in /bears/:bear_id
// =============================================================================
router.route('/bears/:bear_id')
    // Get the bear with the id (accessed at GET http://localhost:8080/api/bears/:bear_id)

    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // Update the bear with this id (accessed at put http://localhost:8080/api/bears/bear_id)

    .put(function(req, res) {
        // Use bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

                // Update the bear's info
            bear.name = seq.body.name;

            // Save updated info
            bear.save(function(err) {
                if (err)
                    res.send(err);
                res.json({message: 'Bear updated'});
            });
        });
    })

    // Delete the bear with the given id
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted bear!'});
        });
    });
// Register our Routes
// All of our Routes will be prefixed with /api
app.use('/api', router);

// Start server
// ============================================================================
app.listen(port);
console.log('Magic happening on port ' + port);
