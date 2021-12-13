const model = require('../models/connections');
const { isEmpty } = require('lodash');
const { v4: uuidv4 } = require('uuid')


exports.connections = (req, res, next) => {
    
    model.find().then(connections => {
        let groups = allConnectionsGroupByName(connections);
        res.render('./story/connections', { groups });
    })
        .catch(err => next(err));
};

function allConnectionsGroupByName(connections) {
    let allConnections = connections.reduce((r, a) => {
        r[a.connectionName] = [...r[a.connectionName] || [], a];
        return r;
    }, {});
    if (!isEmpty(allConnections))
        return allConnections;
    else return false;
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 404;
        return next(err);
    }
    model.findById(id).populate('author', 'firstName lastName')
        .then(connection => {
            if (connection) {
                return res.render('./story/connection', { connection });
            } else {
                let err = new Error('Cannot find a Event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.create = (req, res, next) => {

    let event = model(req.body);
    event.author=req.session.user._id;
    event.save().then(() => {
        req.flash('success', 'Event has been created successfully');
        res.redirect('/connections');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message);
            err.status = 400;
        }
        next(err);
    });
};

exports.newConnection = (req, res) => {
    res.render('./story/newConnection');
}

exports.update = (req, res) => {
    let id = req.params.id;
    let connection = req.body;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    // when new topic is added the connection is not creating a separate row for it.
    // need to implement it 
    model.findByIdAndUpdate(id, connection, { useFindAndModify: false, runValidators: true })
        .then((connection) => {

            if (connection) {
                res.redirect('/connections/' + id);
            } else {
                let err = new Error('Cannot find the updated event details ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
}

exports.editConnection = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then((connection) => {
            if (connection) {
                return res.render('./story/update', {
                    connection
                });
            } else {
                let err = new Error('Cannot find a Event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

exports.deleteConnection = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {
        useFindAndModify: false
    })
        .then(connection => {
            if (connection) {
                res.redirect('/connections');
            } else {
                let err = new Error('Cannot delete the event details : ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
}