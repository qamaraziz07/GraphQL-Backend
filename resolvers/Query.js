
const User = require("../models/User");
const Quote = require("../models/Quotes");

exports.Query={
    users:async () => await User.find({}),
    user:async (_,{_id})=> await User.findOne({_id}),
    quotes:async ()=>await Quote.find({}).populate("by","_id firstName"),
    iquote:async (_,{by})=> await Quote.find({by}),
    myprofile:async (_,_args,{userId})=>{
        if(!userId) throw new Error("You must be logged in")
        return await User.findOne({_id:userId})
       }

 },
 exports.User={
     quotes:async (ur)=> await Quote.find({by:ur._id})
 }