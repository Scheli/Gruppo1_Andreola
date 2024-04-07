import express from 'express'
import cors from 'cors'
import { getAll, getOne, connectToDB, getOnerace, getSeason } from './db.js'

const app = express()
let db; //db connection


app.use(express.json())
app.use(cors())






app.get('/f1', async (req,res) =>{
    const resource = req.query.resource;
    const season = req.query.season;
    const round = req.query.round

    if (season && round) {
        const result = await getOnerace(db, resource, season, round);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "errore" });
        }
        
    } else if (season) {
        const result = await getSeason(db, resource, season);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "errore" });
        }
    }

})


app.listen(8080, async () => {
    try {
        db = await connectToDB()
        console.log("Server in esecuzione su porta 8080 e DB connesso")
    } catch (e) {
        console.error(e)
    }

})


// import express from 'express';
// import cors from 'cors';
// import { MongoClient, ObjectId } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// let db;

// app.use(express.json());
// app.use(cors());

// app.get('/races/:year', async (req, res) => {
//     const year = req.params.year;
//     const racesData = await getRacesByYear(db, year);
//     if (racesData) {
//         res.json(racesData);
//     } else {
//         res.status(404).json({ message: "Dati delle gare non trovati per l'anno specificato" });
//     }
// });

// export async function connectToDB() {
//     const uri = process.env.MONGODB_URI;
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         return client.db("Stats");
//     } catch (e) {
//         console.log(e);
//     }
// }

// export async function getRacesByYear(db, year) {
//     const racesData = await db.collection('Calendar').find({ "year": year }).toArray();
//     return racesData;
// }

// app.listen(8080, async () => {
//     try {
//         db = await connectToDB();
//         console.log("Server in esecuzione su porta 8080 e DB connesso");
//     } catch (e) {
//         console.error(e);
//     }
// });
