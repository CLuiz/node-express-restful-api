// Call packages we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configure app to use bodyParser
// This lets us get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port
const port = process.env.PORT || 8080;

// Routes for our api
// ============================================================================

// Get an instance of the express router
const router = express.Router();

// Test route to make sure everythign is working
router.get('/', function(req, res) {
    res.json({message: 'Api working'});
});


// Register our Routes
// All of our Routes will be prefixed with /api
app.use('/api', router);

// Start server
// ============================================================================
app.listen(port);
console.log('Magic happening on port ' + port);
