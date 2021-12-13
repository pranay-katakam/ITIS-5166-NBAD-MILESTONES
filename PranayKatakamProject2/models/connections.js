const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid')
const {isEmpty} = require('lodash');


const connections = [
    {
        connectionId: '1',
        connectionName: 'College Fair',
        connectionTopic: 'Pizza',
        details: "Free Pizza to all the students (First come first serve) ",
        date: DateTime.local(2021, 04, 22).toISODate(),
        startTime: '10:30',
        endTime: '12:30',
        hostName: 'Department of Computer Science',
        image: 'https://w7.pngwing.com/pngs/756/160/png-transparent-new-york-style-pizza-italian-cuisine-take-out-pasta-pizza.png',
        location: 'Student Union Center'
    },
    {
        connectionId: '2',
        connectionName: 'Student Orientation',
        connectionTopic: 'Burger Party',
        details: 'All types of Burgers are available and Welcome Reception',
        date: DateTime.local(2021, 05, 25).toISODate(),
        startTime: '2:00',
        endTime: '6:00',
        hostName: 'Student Organization',
        image: 'https://www.freepnglogos.com/uploads/burger-png/burger-png-png-images-yellow-images-12.png',
        location: 'Clock tower'
    },
    
    {
        connectionId: '3',
        connectionName: 'Student Orientation',
        connectionTopic: 'Spirits on the Way',
        details: 'All types of Beers are available and Welcome Reception',
        date: DateTime.local(2021, 06, 22).toISODate(),
        startTime: '2:00',
        endTime: '6:00',
        hostName: 'Student Organization',
        image: 'https://www.ginandtonicly.com/wp-content/uploads/2019/06/how-to-drink-spirits-1170x900.jpg',
        location: 'Cone Hall'
    },
    {
        connectionId: '4',
        connectionName: 'College Fair',
        connectionTopic: 'Welcome drinks',
        details: "Drinks to freshers ",
        date: DateTime.local(2021, 04, 22).toISODate(),
        startTime: '10:30',
        endTime: '12:30',
        hostName: 'Department of Computer Science',
        image: 'https://thumbs.dreamstime.com/b/welcome-drinks-wedding-venue-welcoming-drinks-juice-orange-cherry-welcome-drinks-asian-wedding-reception-159014717.jpg',
        location: 'Student Union Center'
    },
    {
        connectionId: '5',
        connectionName: 'College Fair',
        connectionTopic: 'Vegan Fair',
        details: "Vegan foos for all vegans ",
        date: DateTime.local(2021, 04, 22).toISODate(),
        startTime: '10:30',
        endTime: '12:30',
        hostName: 'Department of Computer Science',
        image: 'https://www.organicauthority.com/.image/t_share/MTU5MzMwMzc5MjMyOTc4NTI4/img_4625.jpg',
        location: 'Student Union Center'
    },
    {
        connectionId: '6',
        connectionName: 'Student Orientation',
        connectionTopic: 'Graduation ceremony',
        details: 'Get ready for programs, drinks and even Food',
        date: DateTime.local(2021, 05, 25).toISODate(),
        startTime: '2:00',
        endTime: '6:00',
        hostName: 'Student Organization',
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/gmg/BK5KY6VNFZATNKISFCBHRQPBIY.jpg',
        location: 'Clock tower'
    },
]

exports.allConnections = function () {
    return connections;
}

exports.findById = id => connections.find(connection => connection.connectionId === id);

exports.save = (connection) => {
    connection.connectionId = uuidv4();
    connections.push(connection);
};

exports.updatebyId = function (id, newConnection) {
    let connection = connections.find(connection => connection.connectionId === id);
    if (connection) {
        connection.connectionName = newConnection.connectionName;
        connection.connectionTopic = newConnection.connectionTopic;
        connection.date = newConnection.date;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
        connection.location = newConnection.location;
        connection.image = newConnection.image;
        connection.details = newConnection.details;
        connection.hostName = newConnection.hostName;
        return true;
    } else {
        return false;
    }
};

exports.deletebyId = function (id) {
    let index = connections.findIndex(connection => connection.connectionId === id);
    if (index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
};


exports.allConnectionsGroupByName = function () {
    let allConnections = connections.reduce((r, a) => {
        r[a.connectionName] = [...r[a.connectionName] || [], a];
        return r;
    }, {});
    if (!isEmpty(allConnections))
        return allConnections;
    else return false;
}
