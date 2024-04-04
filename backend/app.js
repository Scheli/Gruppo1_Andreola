import express from 'express'
import cors from 'cors'
import {getAll, getOne,connectToDB } from './db.js'

const app = express()
let db; //db connection

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

app.get('/:resource/:season', async (req,res) =>{
    const season = req.params.season; 
    const resource = req.params.resource;
    const result = await getOneseason(db, resource, season);
    if(result){
        res.json(result);
    } else{
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