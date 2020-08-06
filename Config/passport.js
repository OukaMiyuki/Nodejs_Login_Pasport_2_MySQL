const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../Models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => { //use email as username field
            //match user
            await User.findOne({ where: { email: email } }) //validate email in the database with user's input email (line 7)
                .then(async(user) => { //pass the result in user variable
                    if (!user) { //if user didn't found
                        return done(null, false, { message: 'Email has not been registered!' }); //null for the error, false for the user (user not found)
                    }
                    await bcrypt.compare(password, user.password, (err, isMatch) => { //password rever to line 8, user.password rever to database (line 10 then check line 11)
                        if (err) throw err;
                        if (isMatch) { //if password match
                            return done(null, user)
                        } else { //if the password didn't match
                            return done(null, false, { message: 'Password Incorect!' });
                        }
                    });

                })
                .catch(err => console.error(err));
        })
    );

    //confuse with how serialize and deserialize works? reade here: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    //https://stackoverflow.com/questions/28691215/when-is-the-serialize-and-deserialize-passport-method-called-what-does-it-exact
    //https://stackoverflow.com/questions/29066348/passportjs-serializeuser-and-deserializeuser-execution-flow
    //https://stackoverflow.com/questions/46807385/passport-js-serializeuser-deserializeuser
    //https://stackoverflow.com/questions/34675655/when-serialize-and-deserialize-call-in-passport-js
    //https://forum.freecodecamp.org/t/passport-serializeuser-passport-deserializeuser-explanation/205578
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ id: id }).then(user => {
            done(null, user);
            console.log(id);
        }).catch(err => done(err));
    });
}