// config file to connect to MySQL database
const express = require("express");
const mysql = require("mysql");

const databaseConfig = {
    // Host
    host: "localhost",
    user: "root",
    password: "",
    database: "audio_app",
    connectionLimit: 10,
};

const connection = mysql.createConnection(databaseConfig);

module.exports = connection;