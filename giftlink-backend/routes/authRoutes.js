/*jshint esversion: 8 */

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
        const db = await connectToDatabase();

        const collection = db.collection(collectionName);
        const emailExists = await collection.findOne({ email: value });
        if (emailExists) {
            throw new Error('Email already exists');
        }

    })


], async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            throw new Error(`Invalid request ${validation.errors.map(err => err.msg).join(', ')}`);
        }

        const { firstname, lastname, email, password } = req.body;
        const db = await connectToDatabase();

        const collection = db.collection(collectionName);

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
        e.status = 400;
        next(e);
    }
});

router.post('/login', [
    body('email').notEmpty(),
    body('password').notEmpty()

], async (req, res, next) => {
    try {
        const validation = validationResult(req);

        if (validation.errors.length > 0) {
            throw new Error(`Invalid request ${validation.errors.map(err => err.msg).join(', ')}`);
        }

        const { email, password } = req.body;

        const db = await connectToDatabase();

        const collection = db.collection(collectionName);

        const user = await collection.findOne({ email });
        if (!user) {
            throw new Error('User does not exist');
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                user: {
                    id: user._id.toString(),
                }
            };
            const token = jwt.sign(payload, secret);

            res.json({ email: user.email, name: user.firstname, token });
            next();
        }
        else {

            throw new Error('Invalid Login');
        }

    } catch (e) {
        e.status = 400;
        next(e);
    }
});

router.put('/update', [
    body('name').notEmpty(),
    (req, res, next) => {
        try {
            const bearerHeader = req.headers.authorization;

            if (!bearerHeader) {
                throw new Error("Unauthorized");
            }
            const token = bearerHeader.split(' ')[1];
            const payload = jwt.verify(token, secret);
            if (!payload.user) {
                throw new Error("Unauthorized");
            }
            next();

        }
        catch (e) {
            e.status = 401;
            next(e);

        }
    }

], async (req, res, next) => {
    try {

        const validation = validationResult(req);
        const { email } = req.headers;
        const { name } = req.body;

        console.log('NAME', name);

        if (validation.errors.length > 0) {
            throw new Error(`Invalid request. The ${validation.errors.map(err => `"${err.path}" field is ${err.value}`).join(', ')}`);
        }

        if (!email) {
            throw new Error('Email not found in the request headers');
        }

        const db = await connectToDatabase();

        const collection = db.collection(collectionName);

        const updatedUser = await collection.findOneAndUpdate({ email },
            {
                $set: {
                    firstname: name,
                    updatedAt: new Date()
                }
            },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            throw new Error('Failed to update user');
        }

        const payload = {
            user: {
                id: updatedUser._id.toString(),
            }
        };
        const token = jwt.sign(payload, secret);

        res.json({ email: updatedUser.email, name: updatedUser.firstname, token });
        next();

    } catch (e) {
        e.status = 400;
        next(e);
    }
});

module.exports = router;