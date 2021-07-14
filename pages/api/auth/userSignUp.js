import bcrypt from 'bcryptjs';

import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

import authMidWare from '../../../middleware/yacuUserMid';

const handler = nextConnect();

handler.use(authMidWare); 
handler.post(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email); 
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (!password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }
  if ((await req.db.collection('yacuUsers').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
  }

const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword)

  const user = await req.db
    .collection('yacuUsers')
    .insertOne({ 
      name,
      email,
      password: hashedPassword, 
      contactData: {},
      personalPreferences: {},
      emergencyContact: {},
      clientType: "b2c",
      signUpStream: "website",
       })
    .then(({ ops }) => ops[0]);
      req.logIn(user, (err) => {
      if (err) throw err;
    res.status(201).json({
      user: req.user,
    });
  });
});

export default handler;