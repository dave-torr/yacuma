import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';


passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('yacuUsers')
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async function (req, email, password, done){
      const user = await req.db.collection('yacuUsers').findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) done(null, user);
      else done(null, false)
    },
  ),
);

export default passport;


// yacuUsers