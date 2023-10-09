const express = require("express");
const connection = require("./config/database");
const {getUser, createUser, updateUser, deleteUser} = require("./controllers/userController");
const {createPatient, updatePatient, deletePatient, getPatients} = require("./controllers/patientController");
const {createRecord, getRecords} = require("./controllers/recordController");


connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected to database");
    }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Get user details from database
app.get('/user', getUser); // Tested and Working in App

app.post('/createuser', createUser); // Tested and Working in App

app.put('/updateuser', updateUser);

app.delete('/deleteuser', deleteUser); // Tested and Working in App

app.post('/createpatient', createPatient); // Tested and Working in App

app.delete('/deletepatient', deletePatient); // Tested and Working in App

app.put('/updatepatient', updatePatient);

app.get('/patients', getPatients); // Tested and Working in App

app.post('/createreport', createRecord); // Tested and Working in App

app.get('/records', getRecords);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // show how to connect using URL
    console.log(`http://localhost:${port}/`);
});


