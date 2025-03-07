require('dotenv').config();

const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const collectionName = 'users';


const secret = `${process.env.JWT_SECRET}`;


router.post('/register', [body('email').notEmpty(), body('password').notEmpty()], async (req, res, next) => {
    try {
        const db = await connectToDatabase()

        const collection = db.collection(collectionName);
        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            throw new Error('Request contains missing values');

        }

        const { firstname, lastname, email, password } = req.body;

        const token = jwt.sign({ firstname, lastname, email }, secret);

        res.send(`Hurray!, our token is  ${token}`);

        next();
    } catch (e) {
        next(e);
    }
});

module.exports = router