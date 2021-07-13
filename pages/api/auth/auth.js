import nextConnect from 'next-connect';
import authMidWare from '../../../middleware/yacuUserMid';

import passport from "./../../../utils/yacuma/passport"

const handler = nextConnect()
handler.use(authMidWare)

handler.post(passport.authenticate('local'), (req, res) => {
  // return our user object
  res.json({ user: req.user });
})


handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
