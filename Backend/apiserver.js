var express = require('express');
var bodyParser = require('body-parser');

// Controllers for the API
const { 
    getAllSpecimens, 
    readSpecimen, 
    createSpecimen, 
    updateSpecimen,
    deleteSpecimen, 
    getHistoryOfSpecimen
} = require('./controllers/backendApi');
const dotenv = require("dotenv")
var app = express();

app.use(bodyParser.json());
dotenv.config()


// Routes of the API
app.get('/api/getAllSpecimens', getAllSpecimens);
app.get('/api/readSpecimen/:index', readSpecimen);
app.post('/api/createSpecimen/', createSpecimen);
app.put('/api/updateSpecimen/:specimenId', updateSpecimen);
app.delete('/api/deleteSpecimen/:index', deleteSpecimen);
app.get('/api/getHistoryOfSpecimen/:key', getHistoryOfSpecimen);

console.log("Server is up and running on port 8000!!!");
app.listen(8000);