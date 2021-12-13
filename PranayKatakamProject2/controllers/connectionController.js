const model = require('../models/connections');

exports.connections = (req, res) => {
    let groups = model.allConnectionsGroupByName();
    res.render('./story/connections', { groups });
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findById(id);
    console.log(connection);
    if (connection) {
        res.render('./story/connection', { connection });
    } else {
        let err = new Error('Cannot find a Event with ID ' + id);
        err.status = 404;
        next(err);
    }
}

exports.create = (req, res) => {
    let event = req.body;
    console.log(event);
    model.save(event);
    res.redirect('/connections');
}

exports.newConnection = (req, res) => {
    res.render('./story/newConnection');
}

exports.update = (req, res) => {
    console.log(req.body);
    if(model.updatebyId(req.params.id, req.body)){
        res.redirect('/connections/'+req.params.id);
    }else{
        res.status(404).send('Cannot find the updated event details' + id);
    }
}

exports.editConnection = (req, res) => {
    let id = req.params.id;
    let connection = model.findById(id);
    console.log(connection);
    if (connection) {
        res.render('./story/update', { connection });
    } else {
        let err = new Error('Cannot find a Event with ID ' + id);
        err.status = 404;
        next(err);
    }
}

exports.deleteConnection = (req, res)=>{
    let id = req.params.id;
    
    if(model.deletebyId(id)){
        res.redirect('/connections');
    }else{
        res.status(404).send('Cannot delete the event details' + id);
    }

}