
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './evironment.js'


let kanbanDatabaseInstance = null
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const CONNECT_DB = async () => {
    try {
        await client.connect()
        kanbanDatabaseInstance = client.db(env.MONGODB_NAME)
    } catch (error) {
        console.log('Error connecting to MongoDB'); 
    }
}

export const GET_DB = () => {
    if(!kanbanDatabaseInstance) throw new Error('Error get MongoDB')
    return kanbanDatabaseInstance
}

export const CLOSE_DB = async () => {
    await client.close()
}