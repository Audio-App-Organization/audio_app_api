const connection = require('../config/database');
const verifyToken = require('../utils/verifyToken')
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken')


function getUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'GET') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            // Token is valid, and user_id is extracted
            connection.query('SELECT * FROM Therapist WHERE user_id = ?', [user_id], (error, results) => {
                if (error) throw error
                if (results.length === 0) {
                    return res.status(404).json({msg: 'User not found'});
                }
                let user = new UserModel(results[0].user_id, results[0].therapist_id, results[0].name, results[0].email, results[0].telephone, results[0].workplace);
                res.json(user);
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function createUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'POST') {
        const token = req.headers.authorization.split(' ')[1];


        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            const { therapist_id, name, email, telephone, workplace } = req.body
            console.log(therapist_id, name, email, telephone, workplace);
            UserModel
            let user = new UserModel(user_id, therapist_id, name, email, telephone, workplace);

            // Token is valid, and user_id is extracted
            connection.query('SELECT * FROM Therapist WHERE user_id = ?', [user_id], (error, results) => {
                if (error) throw error
                if (results.length === 0) {
                    // create user with JSON data from request body

                    connection.query('INSERT INTO Therapist SET ?', user, (error, results) => {
                        if (error) throw error;
                        res.json({msg: 'User created'});
                    });
                } else {
                    return res.status(401).json({msg: 'User already exists'});
                }
            });
        });

    }
}

function deleteUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});a            ``
    }
    if (req.method === 'DELETE') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            // Token is valid, and user_id is extracted
            connection.query('DELETE FROM Therapist WHERE user_id = ?', [user_id], (error, results) => {
                if (error) throw error;
                res.json({msg: 'User deleted'});
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function updateUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    if (req.method === 'PUT') {
        const token = req.headers.authorization.split(' ')[1];

        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            //testing purpose
            user_id = "therapist1";

            let { name, telephone, workplace } = req.body

            // Token is valid, and user_id is extracted
            connection.query('UPDATE Therapist SET name = ?, telephone = ?, workplace = ? WHERE user_id = ?', [name, telephone, workplace, user_id], (error, results) => {
                if (error) throw error;
                res.json({msg: 'User updated'});
            });
        });
    } else {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

module.exports = { getUser, createUser, updateUser, deleteUser };