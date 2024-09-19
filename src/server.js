import express from 'express'
import { env } from './configs/evironment.js'
import { APIS_v1 } from './routes/v1/index.js'
import { CONNECT_DB, CLOSE_DB } from './configs/mongodb.js'
import exitHook from 'async-exit-hook'
import cors from 'cors'

const START_SERVER = () => {
    const app = express()
    app.use(cors())
    // enable req.body data
    app.use(express.json())
    // router
    app.use('/v1', APIS_v1)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`server listening on port http://${env.APP_HOST}:${env.APP_PORT}`)
    })

    exitHook(() => {
        console.log('close db');
        CLOSE_DB()
    })
}

(async () => {
    console.log('Connecting to Mongodb');
    await CONNECT_DB()
    console.log('Connected to Mongodb Successfully'); START_SERVER()

})()


