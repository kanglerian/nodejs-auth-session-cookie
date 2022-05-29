const Auth = {
    checkLogin: (req, res, next) => {
        if(!req.session.logged_in){
            return res.redirect('/');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if(!req.session.status){
            return res.redirect('/');
        }
        next();
    }
};

module.exports = Auth;