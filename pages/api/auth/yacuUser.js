import nextConnect from 'next-connect';
import authMidWare from '../../../middleware/yacuUserMid';

const handler = nextConnect();
handler.use(authMidWare);


handler.get(async (req, res) => {
    res.json({ user: req.user })
});

export default handler;
