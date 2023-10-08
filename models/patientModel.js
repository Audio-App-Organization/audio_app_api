

const {json} = require("express");

class PatientModel {
    constructor(patient_id, user_id, nic, name, age, telephone, medical_history) {
        this.patient_id = patient_id;
        this.user_id = user_id;
        this.nic = nic;
        this.name = name;
        this.age = age;
        this.telephone = telephone;
        this.medical_history = medical_history;
    }
}

module.exports = PatientModel;