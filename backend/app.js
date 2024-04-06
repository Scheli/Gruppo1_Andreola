import express from 'express'
import cors from 'cors'
import {getAll, getOne,connectToDB,getOneseason,getOnerace } from './db.js'

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

app.get('/standing', async (req, res) => {

    const resource = req.query.resource; 
    const season = req.query.season; 
    // Convert season to BSON ObjectIdx
    
    const result = await getOneseason(db, resource, season);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({message: "errore"});
    }
});

app.get('/result', async (req, res) => {

    const resource = req.query.resource; 
    const season = req.query.season; 
    const round = req.query.round
    // Convert season to BSON ObjectIdx
    
    const result = await getOnerace(db, resource, season,round);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({message: "errore"});
    }
});



app.get('/:resource', async (req,res)=>{
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