/*const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const { Luggage, LuggageRecord, GraphNode, GraphEdge, Graph } = require('./graph.js');
*/
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { Luggage, Graph } from './graph.js'; // Add file extension '.js' for ES modules

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session middleware
app.use(session({
    secret: 'secret_key', // Change this to a secure random string in production
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public'));
// Dummy database for storing user data
const users = [];

// Register middleware to parse request body
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// Register route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already exists');
    }
    // Create new user object and add to users array
    const newUser = { username, password };
    users.push(newUser);
    // Redirect to login page after successful registration
    res.redirect('/login');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if username and password match any user in the database
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Store user data in session
        req.session.user = user;
        // Redirect to dashboard after successful login
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Dashboard route
app.get('/dashboard', requireLogin, (req, res) => {
    // Access user data from session
    const user = req.session.user;
    // Render dashboard template with user data
    const graph = new Graph(3); // Example: considering weight limits from 0 to 10 bags
    // Adding edges to the graph (Example values)
    graph.addEdge(0, 1, 0); // From 0 bags to 1 bag with cost 0
    graph.addEdge(1, 2, 50); // From 1 bag to 2 bags with cost 50
    graph.addEdge(2, 3, 50); // From 2 bags to 3 bags with cost 50
    // Add more edges as needed
    graph.constructMST();
    const desiredWeightLimit = 5; // Example: desired weight limit
    const luggage = new Luggage(10, 50); // Example: weight limit per bag = 10, cost per bag = 50
    const optimalFee = graph.findOptimalFee(desiredWeightLimit, luggage);
    const luggageRecord = { desiredWeightLimit, optimalFee, timestamp: new Date() };
    user.luggageRecords = user.luggageRecords || [];
    user.luggageRecords.push(luggageRecord);
    res.render('dashboard', { user, luggageRecord });
});

// Logout route
app.get('/logout', (req, res) => {
    // Destroy session to log user out
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login');
        }
    });
});

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

// Registration route
app.get('/register', (req, res) => {
    res.render('register');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
