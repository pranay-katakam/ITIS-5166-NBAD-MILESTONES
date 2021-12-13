
exports.index=(req,res) => {
    res.render('index');
}

exports.about=(req,res) => {
    res.render('./story/about');
}

exports.contactUs=(req,res) => {
    res.render('./story/contactUs');
}