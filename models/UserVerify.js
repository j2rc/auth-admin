import { Schema } from "mongoose"

const userVerifySchema = new Schema({
  hash: String,
  createdAt: { 
    type: Date, 
    expires: 86400, 
    default: Date.now 
  },
})

export default userVerifySchema

/*
{ createdAt: { type: Date, expires: 3600, default: Date.now }}
*/