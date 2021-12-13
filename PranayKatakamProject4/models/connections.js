const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid')
const { isEmpty } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    connectionName: { type: String, required: [true, 'Connection type is required'] },
    connectionTopic: { type: String, required: [true, 'Connection topic is required'] },
    details: { type: String, required: [true, 'Details is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    endTime: { type: String, required: [true, 'End time is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    imageurl: { type: String, required: [true, 'Image url is required'] },
    details: { type: String, required: [true, 'Details is required'] },
    hostName: { type: String, required: [true, 'Host name is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    author: {type: Schema.Types.ObjectId, ref: 'User'}
},
    { timestamps: true }
);

//Connection name = connections
module.exports = mongoose.model('Connection', connectionsSchema);


exports.allConnections = function () {
    return connections;
}

exports.findById = id => connections.find(connection => connection.connectionId === id);

//collection name is stories in the database
