import nextConnect from 'next-connect';
import {sessionMiddleware} from './sessions';
import passport from "./../utils/auth/passport"
import database from './yacuDBMidd';

const authMidWare = nextConnect();

authMidWare
  .use(database)
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session());

export default authMidWare;