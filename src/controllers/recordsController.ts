import express from 'express';
import {IRecord} from "../types/types";
const Record = require("../models/record")

const controller = express.Router();

controller.get("/", (_request, response) => {
    Record.find({}).then((records : IRecord[]) => {
        response.json(records)
    })
})

controller.post("/", (request, response) => {
    const body = request.body

    if (body.score === undefined || body.playerName === undefined) {
        return response.status(400).json({ error: "score or name missing" })
    }

    const record = new Record({
        score: body.score,
        playerName: body.playerName,
    })

    record.save().then((savedRecord: IRecord) => {
        return response.json(savedRecord)
    })

    return null;
})

export default controller;