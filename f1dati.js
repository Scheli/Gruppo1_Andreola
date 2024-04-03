// Importare le funzioni necessarie da mongo.js (assumendo che mongo.js sia nello stesso directory o correttamente referenziato)
import { connectToDB, createOne } from './mongo.js';






async function result() {
    let results = []; 
    const db = await connectToDB(); 

    for (let i = 1; i <= 20; i++) {
        const risposta = await fetch(`https://api.openf1.org/v1/position?session_key=9468&position=${i}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        let res = await risposta.json();
        results.push(res[res.length - 1]);

        // Inserire ogni risultato nel DB
        await createOne(db, "Formula1", res[res.length - 1]); 
    }

    // Opzionale: Stampa di verifica
    console.log("Dati inseriti con successo");
}

result();