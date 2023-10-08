// vertifyToken.js for resolving a Firebase JWT token:
const res = require('express/lib/response');

const express = require('express')
const jwt = require('jsonwebtoken')

function verifyToken(token, callback) {
    if (!token) {
        return callback('No token provided');
    }
    try {
        // extract userID from token
        const decoded = jwt.decode(token);
        const user_id = decoded.user_id;
        return callback(null, user_id);
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = verifyToken;

