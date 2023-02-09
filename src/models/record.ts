import { Schema, model, connect, set } from 'mongoose';
import { IRecord } from '../types/types'

set("strictQuery", false)

const url = process.env.MONGODB_URI || "";
if (!url) console.log("can't find url");
console.log("connecting to", url)

connect(url).then(() => {
    console.log("connected to MongoDB")
}).catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
})

const recordSchema = new Schema<IRecord>({
    score: { type: Number, required: true },
    playerName: { type: String, required: true },
})

recordSchema.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = model<IRecord>("Record", recordSchema)