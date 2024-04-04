import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export async function connectToDB() {
    const uri = process.env.MONGODB_URI

    const client = new MongoClient(uri)
    try {
        await client.connect();
        return client.db("Stats")
    } catch (e) {
        console.log(e)
    }

}

export async function getAll(db, resource) {
    const data = await db.collection(resource).find().toArray()
    return data
}

export async function getOne(db, resource, id) {
    const data = await db.collection(resource).findOne({_id: new ObjectId(id)})
    return data
}

export async function getOneseason(db, resource, season) {
    const data = await db.collection(resource).findOne({_season: new ObjectId(season)})
    return data
}

