const connection = require('../config/database');
const verifyToken = require('../utils/verifyToken')
const RecordModel = require('../models/recordModel');

function createRecord(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }

    const token = req.headers.authorization.split(' ')[1];

    verifyToken(token, (error, user_id) => {
        if (error) {
            return res.status(401).json({msg: error});
        }

        // Token is valid, and user_id is extracted
        let {patient_id, a, i, u, comment} = req.body;

        console.log(patient_id, a, i, u, comment);

        // record_id is a random string of length 7
        let record_id = Math.random().toString(36).substring(7);


        let record = new RecordModel(
            record_id,
            patient_id,
            a,
            i,
            u,
            comment);

        // check if Patient's user_id is same as therapist's user_id
        connection.query('SELECT * FROM Patient WHERE patient_id = ?', [patient_id], (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                return res.status(404).json({msg: 'Patient not found'});
            }
        });

        // store report in database and return report_id
        connection.query('INSERT INTO Record SET ?', record, (error, results) => {
            if (error) throw error;
            res.json({msg: 'Report created', record_id: record_id});
        });
    });
    // create a report from the request body
}

// get all reports for a patient
function getRecords(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }

    const token = req.headers.authorization.split(' ')[1];

    verifyToken(token, (error, user_id) => {
        if (error) {
            return res.status(401).json({msg: error});
        }

        // Token is valid, and user_id is extracted
        let {patient_id} = req.body;

        // check if Patient's user_id is same as therapist's user_id
        connection.query('SELECT * FROM Patient WHERE patient_id = ?', [patient_id], (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                return res.status(404).json({msg: 'Patient not found'});
            }
        });

        // get latest report's a, i, u
        connection.query('SELECT * FROM Record WHERE patient_id = ? ORDER BY date', [patient_id], (error, results) => {
                if (error) throw error;
                res.json(results);
            }
        );
    });
}

module.exports = {createRecord, getRecords};