module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) { //if user not login (this is from passport)
            return next();
        }
        req.flash('gagal', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) { //if user is logged in (this is from passport)
            return next();
        }
        res.redirect('/dashboard');
    }
};