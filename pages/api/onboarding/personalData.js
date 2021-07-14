import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import { connectToDatabase } from "./../../../utils/mongodb";

const handler = nextConnect()

.put(async(req, res)=>{
    const { db } = await connectToDatabase();
    let reqData= JSON.parse(req.body);
    const editedUserData = await db
    .collection("yacuUsers")
    .findOneAndUpdate(
        {"_id": ObjectID(reqData._id)},
        { $set: {
            contactData: reqData,
        }}
    );
    res.status(200).json( editedUserData)
})

.post(async(req, res)=>{
    const { db } = await connectToDatabase();
    let reqData= JSON.parse(req.body);
    const editedUserData = await db
    .collection("yacuUsers")
    .findOneAndUpdate(
        {"_id": ObjectID(reqData._id)},
        { $set: {
            personalPreferences: reqData,
        }}
    );
    res.status(200).json( editedUserData)
})

export default (req, res) => handler.run(req, res) 