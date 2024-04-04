// Importare le funzioni necessarie da mongo.js (assumendo che mongo.js sia nello stesso directory o correttamente referenziato)
import { connectToDB, createOne } from './db.js';






//<script>

async function result() {
    
    const db = await connectToDB(); 


    
  for (let i = 1979; i <= 2024; i++) {
        
        const risposta = await fetch (`https://ergast.com/api/f1/${i}.json`)
        
        const seasons = await risposta.json()
        console.log(seasons)
        console.log(seasons.MRData.total)

        const ds = await fetch(`http://ergast.com/api/f1/${i}/driverStandings.json`,{
            headers: {
                'Accept': 'application/json'
            }
        })

        let driverStandings = await ds.json()

        await createOne(db,"Driver_Standings",driverStandings.MRData.StandingsTable)

        const cs = await fetch(`http://ergast.com/api/f1/${i}/constructorStandings.json`,{
            headers: {
                'Accept': 'application/json'
            }
        })

        let constructorStandings = await cs.json()

        await createOne (db,"Constructor_Standings",constructorStandings.MRData.StandingsTable)
        
        
        for (let j = 1; j <= seasons.MRData.total; j++) {
            
            const risposta = await fetch(`http://ergast.com/api/f1/${i}/${j}/results.json`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            let res = await risposta.json();
            
            console.log(res.MRData.RaceTable);
            results.push(res);
            
            const q = await fetch(`http://ergast.com/api/f1/${i}/${j}/qualifying.json`)

            let quali = await q.json();

            console.log(quali.MRData.RaceTable)

            // Inserire ogni risultato nel DB
            await createOne(db, "Qualifying ", quali.MRData.RaceTable); 


        }
        
    }
    // Opzionale: Stampa di verifica
    console.log("Dati inseriti con successo");
}

result();
//</script>