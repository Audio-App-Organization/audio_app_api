const connection = require('../config/database');
const verifyToken = require('../utils/verifyToken')
const PatientModel = require('../models/patientModel');

function createPatient(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    console.log("createPatient");
    if (req.method === 'POST') {
        const token = req.headers.authorization.split(' ')[1];

        console.log("POST");
        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            let {nic, name, age, telephone, medical_history} = req.body

            console.log(nic, name, age, telephone, medical_history);
            // let patient_id = Math.random().toString(36).substring(2, 5);

// testing patient ID should be "P" + 3 digit number
            let patient_id = "P" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

            console.log(patient_id);

            let patient = new PatientModel(
                patient_id,
                user_id,
                nic,
                name,
                age,
                telephone,
                medical_history
            );

            console.log(patient);

            connection.query('INSERT INTO Patient SET ?', patient, (error, results) => {
                if (error) throw error;
                // send patient_id to client
                res.json({msg: 'Patient created', patient_id: patient_id});
            });
        });

    }
    else
    {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function updatePatient(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    console.log("updatePatient");
    if (req.method === 'PUT') {
        const token = req.headers.authorization.split(' ')[1];

        console.log("UPDATE");
        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            let {patient_id, nic, name, age, telephone, medical_history} = req.body

            console.log(patient_id, nic, name, age, telephone, medical_history);
            // let patient_id = Math.random().toString(36).substring(2, 5);

// testing patient ID should be "P" + 3 digit number

            console.log(patient_id);

            let patient = new PatientModel(
                nic,
                name,
                age,
                telephone,
                medical_history
            );

            // update patient details
            connection.query('UPDATE Patient SET ? WHERE patient_id = ?', [patient, patient_id], (error, results) => {
                if (error) throw error;
                res.json({msg: 'Patient updated'});
            });
        });

    }
    else
    {
        return res.status(401).json({msg: 'Invalid method'});
    }
}

function deletePatient(req, res) {
    // delete from patient table with patient_id and records table with patient_id
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    console.log("deletePatient");
    if (req.method === 'DELETE') {
        const token = req.headers.authorization.split(' ')[1];

        console.log("DELETE");
        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            let {patient_id} = req.body

            console.log(patient_id);

            // check if Patient's user_id is same as therapist's user_id
            connection.query('SELECT * FROM Patient WHERE patient_id = ?', [patient_id], (error, results) => {
                if (error) throw error
                if (results.length === 0) {
                    return res.status(404).json({msg: 'Patient not found'});
                }
                if (results[0].user_id !== user_id) {
                    return res.status(401).json({msg: 'Unauthorized'});
                }
            });


            // delete from patient table with patient_id and records table with patient_id with ON DELETE CASCADE
            connection.query('DELETE FROM Patient WHERE patient_id = ?', [patient_id], (error, results) => {
                if (error) throw error;
                res.json({msg: 'Patient deleted'});
            });
        });
    }
}

function getPatients(req, res) {
    // delete from patient table with patient_id and records table with patient_id
    if (!req.headers.authorization) {
        return res.status(401).json({msg: 'No authorization header sent'});
    }
    console.log("getPatients");
    if (req.method === 'GET') {
        const token = req.headers.authorization.split(' ')[1];

        console.log("GET");
        verifyToken(token, (error, user_id) => {
            if (error) {
                return res.status(401).json({msg: error});
            }

            // check if Patient's user_id is same as therapist's user_id
            connection.query('SELECT * FROM Patient WHERE user_id = ?', [user_id], (error, results) => {
                if (error) throw error
                if (results.length === 0) {
                    return res.status(404).json({msg: 'Patient not found'});
                }
                res.json(results);
            });
        });
    }
}

module.exports = { createPatient, updatePatient, deletePatient, getPatients };