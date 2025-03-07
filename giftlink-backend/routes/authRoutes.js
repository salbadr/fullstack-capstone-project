require('dotenv').config();

const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const collectionName = 'users';
const saltRounds = 10;

const secret = `${process.env.JWT_SECRET}`;

router.post('/register', [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('firstname').isString(),
    body('lastname').isString(),
    body('email').custom(async (value) => {
        const db = await connectToDatabase()
    

        const collection = db.collection(collectionName);
        const emailExists = await collection.findOne({ email: value });
        if (emailExists) {
            throw new Error('Email already exists');
        }

    })


], async (req, res, next) => {
    try {
        const db = await connectToDatabase()

        const collection = db.collection(collectionName);
        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            throw new Error(`Invalid request ${JSON.stringify(validation.errors)} `);
        }

        const { firstname, lastname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await collection.insertOne({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            createdAt: new Date()

        });

        const payload = {
            user: {
                id: newUser.insertedId
            }
        };
        const token = jwt.sign(payload, secret);

        res.json({ email, token });

        next();
    } catch (e) {
        next(e);
    }
});

module.exports = router