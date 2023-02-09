require("dotenv").config()
import express, {Request, Response, NextFunction} from 'express';
const app = express()
const cors = require("cors")
import recordsController from './controllers/recordsController';

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

const unknownEndpoint = (_request: Request, response: Response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(cors())

app.use(express.json())

app.use(requestLogger)

app.use('/api/records', recordsController)

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
