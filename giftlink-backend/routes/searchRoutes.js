/*jshint esversion: 8 */

const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const collectionName = 'gifts';

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase database. Remember to use the await keyword and store the connection in `db`
        const db = await connectToDatabase();

        const collection = db.collection(collectionName);

        const { name, condition, category, age_years } = req.query;

        // Initialize the query object
        let query = {};

        // Add the name filter to the query if the name parameter is not empty
        if (name && name.length > 0) {
            query.name = { $regex: name, $options: "i" }; // Using regex for partial match, case-insensitive
        }

        // Task 3: Add other filters to the query
        if (category) {
            query.category = category;
        }
        if (condition) {
            query.condition = condition;
        }
        if (age_years) {
            query.age_years = { $lte: parseInt(age_years) };
        }

        if(query.length === 0){
            throw new Error('No query parameters provided');
        }
        // Task 4: Fetch filtered gifts using the find(query) method. Make sure to use await and store the result in the `gifts` constant
        const gifts = await collection.find(query).toArray();

        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
