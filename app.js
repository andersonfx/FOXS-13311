const http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foxs13311');

/**
 * Connection
 */  
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB successful :)")
});

var SchemaActions = { 'save': save, 'get': get };

/**
 * Schemas
 */

var ContactSchema = new mongoose.Schema({
    location: String,
    value: String
})

var PersonSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number
})

var StudentSchema = new mongoose.Schema({
    group: String,
    name: String,
    surname: String,
    age: Number,
    customFields: {
        studentId: String,
        deggre: String,
        currentCourses: Array,
        contact: [ContactSchema]
    }
})

var PlayerSchema = new mongoose.Schema({
    group: String,
    name: String,
    surname: String,
    age: Number,
    customFields: {
        group: String,
        team: String,
        position: String,
        previousTeams: Array
    }
});
var DeveloperSchema = new mongoose.Schema({
    group: String,
    commonFields: {
        name: String,
        surname: String,
        age: Number
    },
    customFields: {
        languages: Array,
        isStudent: Boolean,
        isEmployee: Boolean,
        gitRepository: String
    }

});



/**
 * MODELS
 */
var StudentModel = mongoose.model('StudentModel', StudentSchema, 'tbl_person')
var PlayerModel = mongoose.model('PlayerModel', PlayerSchema, 'tbl_person')
var ContactModel = mongoose.model('ContactModel', ContactSchema, 'tbl_contact')
var DeveloperModel = mongoose.model('DeveloperModel', DeveloperSchema, 'tbl_person')

var contactValues = new ContactModel({ 'location': "telefonoCasa", 'value': "214234" })
var contactValues2 = new ContactModel({ 'location': "correoPersonal", 'value': "jonsnow@gmail.com" })

/**
 * OBJECTS
 */
var studentJon = new StudentModel({
    group: "STUNDENT",
    'name': "Jon",
    'surname': "Snow",
    'age': 30,
    customFields: {
        studentId: "2109",
        deggre: "HighSchool",
        currentCourses: ['Fisica', 'Quimica', 'Programación'],
        contact: [contactValues, contactValues2]
    }
})
var playerPin = new PlayerModel({
    group: "PLAYER",
    name: "Pin",
    surname: "Plata",
    age: 60,
    customFields: {
        team: "Guatemala",
        position: "Delantero",
        previousTeams: ['Rojos', 'Seleccion']
    }
})
var devBron = new DeveloperModel({
    group: "DEV",
    commonFields: {
        name: "Sir",
        surname: "Brone",
        age: 80
    },
    customFields: {
        languages: ["Python", "Javascript"],
        isStudent: false,
        isEmployee: false,
        gitRepository: "http://www.git.com/fixer502"
    }
})


/**
 * SAVE objects
 */
SchemaActions.save(studentJon)
SchemaActions.save(playerPin)
SchemaActions.save(devBron)


function save(modelInstance) {
    modelInstance.save(function (err, studentJon) {
        if (err) return console.error(err)
        console.log("Object saved: " + JSON.stringify(studentJon))
    })
}

function get() {
    console.log("TO GET DATA ...")
}

