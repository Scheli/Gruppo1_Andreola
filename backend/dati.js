
import { connectToDB, createMany, createOne } from './db.js';



const db = await connectToDB(); 





async function f1result() {
    


  
  for (let i = 1979; i <= 2024; i++) {
        
        const risposta = await fetch (`https://ergast.com/api/f1/${i}.json`)
        
        const seasons = await risposta.json()
        
        console.log(seasons)
        //await createOne (db, "Calendar",seasons.MRData.RaceTable)
        console.log(seasons.MRData.total)
        
        const ds = await fetch(`http://ergast.com/api/f1/${i}/driverStandings.json`,{
            headers: {
                'Accept': 'application/json'
            }
        })

        let driverStandings = await ds.json()

        //await createOne(db,"Driver_Standings",driverStandings.MRData.StandingsTable)

        const cs = await fetch(`http://ergast.com/api/f1/${i}/constructorStandings.json`,{
            headers: {
                'Accept': 'application/json'
            }
        })

        let constructorStandings = await cs.json()

        //await createOne (db,"Constructor_Standings",constructorStandings.MRData.StandingsTable)
        
        
        for (let j = 1; j <= seasons.MRData.total; j++) {
            
            const risposta = await fetch(`http://ergast.com/api/f1/${i}/${j}/results.json`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            let res = await risposta.json();
            
            console.log(res.MRData.RaceTable);
            //await createOne(db, "Race ", res.MRData.RaceTable); 
            
            const q = await fetch(`http://ergast.com/api/f1/${i}/${j}/qualifying.json`)

            let quali = await q.json();

            console.log(quali.MRData.RaceTable)

           
            //await createOne(db, "Qualifying ", quali.MRData.RaceTable); 


        }
        
    }
   
    
}

async function update(){
    const q= await fetch('http://ergast.com/api/f1/current/last/qualifying.json')
    let quali = await  q.json()
    await createOne(db,"Qualifying", quali.MRData.RaceTable)
    const r= await fetch('http://ergast.com/api/f1/current/last/result.json')
    let race = await r.json()
    await createOne(db,"Race",race.MRData.RaceTable)
    
} 
//f1result();

async function ufcdati(){
    
    let rankings={}
    const r = await fetch("https://api.octagon-api.com/rankings",{
        headers: {
            'Accept': 'application/json'
        }
    });

    rankings = await r.json() 
    createMany(db,"UFC_Ranking",rankings)
    console.log(rankings)
    
    let fighters={}
    const f = await fetch("https://api.octagon-api.com/fighters",{
        headers: {
            'Accept': 'application/json'
        }
    });

    fighters = await f.json() 
    createMany(db,"UFC_Fighters",fighters)
    console.log(fighters)

}

ufcdati()