// schema for creating the events

const mongoose = require('mongoose')
const model = require('./user').schema
// const { ObjectId } = mongoose.Schema;

const eventSchema = mongoose.Schema({

        creator: {
            type: String,
        },
        invitees: [model],
        eventDate: {
            type: Date,
            required: true
        }

})


// creating a module of schema
const eventModel = mongoose.model('events', eventSchema)


// exporting the module to events.js in controller
module.exports = eventModel