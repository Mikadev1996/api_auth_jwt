const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = {
}


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, (email, password, callback) => {
        //typically DB call, assume returned user object
         UserModel.findOne({email, password})
            .then(user => {
                if (!user) {
                    return (callback, null, false, {message: 'Incorrect Email/Password'});
                }
            })
        return callback(null, user, {message: 'Logged in successfully'})
            .catch(err => callback(err));
    }
))