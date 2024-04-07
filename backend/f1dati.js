
import { connectToDB, createOne } from './db.js';








async function result() {
    
    const db = await connectToDB(); 


  /*  
  for (let i = 1979; i <= 2024; i++) {
        
        const risposta = await fetch (`https://ergast.com/api/f1/${i}.json`)
        
        const seasons = await risposta.json()
        
        console.log(seasons)
        await createOne (db, "Calendar",seasons.MRData.RaceTable)
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

           
            await createOne(db, "Qualifying ", quali.MRData.RaceTable); 


        }
        
    }
   */
    const q= await fetch('http://ergast.com/api/f1/current/last/qualifying.json')
    let quali = await  q.json()
    await createOne(db,"Qualifying", quali.MRData.RaceTable)
    const r= await fetch('http://ergast.com/api/f1/current/last/result.json')
    let race = await r.json()
    await createOne(db,"Race",race.MRData.RaceTable)
    console.log("Dati inseriti con successo");
}

result();
