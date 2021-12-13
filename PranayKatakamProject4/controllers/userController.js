const connection = require('../models/connections');
const model = require('../models/user');

exports.new = (req, res) => {
    return res.render('./user/new');
};

exports.signup = (req, res, next) => {

    let user = new model(req.body);
    if (user.email)
        user.email = user.email.toLowerCase();
    user.save()
        .then(user => {
            req.flash('success', 'Registration succeeded!');
            res.redirect('/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('back');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('back');
            }
            next(err);
        });

};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next) => {
    let email = req.body.email;
    if (email)
        email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'wrong email address');
                res.redirect('/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/');
                        } else {
                            req.flash('error', 'wrong password');
                            res.redirect('/login');
                        }
                    });
            }
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user._id;
    Promise.all([model.findById(id), connection.find({ author: id })])
        .then(results => {
            const [user, connections] = results;
            res.render('./user/profile', { user, connections });
        })
        .catch(err => next(err));
};


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });

};


