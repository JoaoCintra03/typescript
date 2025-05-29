// const express = require('express')
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'

import { ZodError } from 'zod'

const app = express()
app.use(cors())

app.use(express.json())

const PORT = 3001

app.use(routes)

app.listen(PORT, () => {
    console.log('Express iniciou na porta:' +
        PORT
    )
})
