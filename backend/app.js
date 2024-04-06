import express from 'express'
import cors from 'cors'
import { getAll, getOne, connectToDB, getOnerace, getSeason } from './db.js'

const app = express()
let db; //db connection
//const { ObjectId } = require('mongodb');

app.use(express.json())
app.use(cors())


app.get('/:resource/:id', async (req, res) => {
    const id = req.params.id
    const resource = req.params.resource
    const result = await getOne(db, resource, id)
    if (result) {
        res.json(result)
    } else {
        res.status(404).json({ message: "errore" })
    }
})


app.get('/result', async (req, res) => {

    const resource = req.query.resource;
    const season = req.query.season;
    const round = req.query.round

    const result = await getOnerace(db, resource, season, round);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: "errore" });
    }
});

app.get('/season', async (req, res) => {
    const resource = req.query.resource;
    const season = req.query.season;

    const result = await getSeason(db, resource, season);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: "errore" });
    }
})

app.get('/:resource', async (req, res) => {
    const resource = req.params.resource
    const result = await getAll(db, resource)
    res.json(result)
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
