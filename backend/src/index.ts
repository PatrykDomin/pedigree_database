import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import { breedingRouter } from '../routes/breeding'
import { dogRouter } from '../routes/dog'

const app = express()

const { json, urlencoded } = bodyParser

// cors
app.use(cors())

// body-parser
app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)

// routes
app.use(dogRouter)
app.use(breedingRouter)

app.listen(4200, () => console.log('server start on 4200'))
