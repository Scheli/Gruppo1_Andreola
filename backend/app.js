import express from "express";
import cors from "cors";
import {
  getAll,
  getOne,
  connectToDB,
  aggiungiUtente,
  getAllUsers,
  getOnerace,
  getSeason,
  getFighter,
  getAllFighter,
  deleteUtente,
  getNameFighter,
  getranking
} from "./db.js";

const app = express();
let db; //db connection

app.use(express.json());
app.use(cors());

app.get("/f1", async (req, res) => {
  const resource = req.query.resource;
  const season = req.query.season;
  const round = req.query.round;

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
});

app.get("/f1winrate", async (req, res) => {
  try {
    const season = req.query.season;
    const pilot = req.query.pilot;
    const driverStandings = await getSeason(db, "Driver_Standings", season);

    if (!driverStandings || driverStandings.length === 0) {
      throw new Error(
        "Dati delle classifiche non trovati per la stagione specificata"
      );
    }

    let wins = 0;
    let totalRaces = driverStandings[0].StandingsLists[0].round;
    let pilotFound = false;
    let point = 0;
    driverStandings.forEach((standing) => {
      standing.StandingsLists.forEach((standingsList) => {
        standingsList.DriverStandings.forEach((driverStanding) => {
          if (driverStanding.Driver.familyName === pilot) {
            pilotFound = true;
            wins = parseInt(driverStanding.wins);
            point = parseInt(driverStanding.points);
          }
        });
      });
    });

    if (!pilotFound) {
      throw new Error("Pilota non trovato");
    }

    const winPercentage = (wins === 0 ? 0 : (wins / totalRaces) * 100).toFixed(
      2
    );
    const pointPerrace = (point / totalRaces).toFixed(2);
    res.json({ wins, point, winPercentage, pointPerrace });
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
    res.status(500).send(error.message);
  }
});

app.get("/ufc/ranking", async (req, res) => {
  try {
    const rankingId = req.query.rankingId;
app.get("/f1overtake", async (req,res) =>{
  try {
    const season = req.query.season;
    const round = req.query.round;
    const driver = req.query.driver;
    let pilotFound = false;
    let positionGain = 0; // Corrected variable name
    const data = await getOnerace(db, "Race", season, round);
    data.forEach(race => {
       race.Results.forEach(result => {
           if (result.Driver.familyName === driver) {
             pilotFound = true;
             positionGain = parseInt(result.position) - parseInt(result.grid); // Corrected parseInt function
           }
       });
    });
    if (!pilotFound) {
       throw new Error("Pilota non trovato");
    }
    res.json({ positionGain });
 } catch (error) {
    console.error("Si è verificato un errore:", error.message);
    res.status(500).send(error.message);
 }
 
  
})

app.get("/ufc/ranking",async (req,res) => {
    try {
      const rankingId = req.query.rankingId

      const ranking = await getranking(db,rankingId);
      res.json(ranking);
    } catch (error) {
      console.error("Error while fetching fighter:", error);
      res.status(500).json({ error: "Internal server error" });
    }
})


    const ranking = await getranking(db, rankingId);
    res.json(ranking);
  } catch (error) {
    console.error("Error while fetching fighter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/ufc", async (req, res) => {
  try {
    const fighterId = req.query.fighter;
    console.log(fighterId);
    const result = await getFighter(db, "UFC_Fighters", fighterId);
    console.log(result);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Fighter not found" });
    }
  } catch (error) {
    console.error("Error while fetching fighter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/ufc/fighters", async (req, res) => {
  const result = await getAllFighter(db, "UFC_Fighters");

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Fighter not found" });
  }
});

app.get("/ufc/fighters/:name", async (req, res) => {
  try {
    const fighterName = req.params.name;
    // console.log(fighterName);

    const fighterDetails = await getNameFighter(
      db,
      "UFC_Fighters",
      fighterName
    );

    if (!fighterDetails) {
      return res.status(404).json({ error: "Fighter not found" });
    }
    res.json(fighterDetails);
  } catch (error) {
    console.error("Error retrieving fighter details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/ufc/ranking",async (req,res) => {
  try {
    const rankingId = req.query.rankingId

    const ranking = await getranking(db,rankingId);
    res.json(ranking);
  } catch (error) {
    console.error("Error while fetching fighter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

// app.get("/ufc/:rankings/:name", async (req, res) => {
//   try {
//     const divisionId = req.params.rankings; 
//      const name = req.body.name;
//      console.log(divisionId);
//      const fighters = await getDivision(db, "UFC_Ranking", divisionId , name); 
//      res.json({ fighters }); 
//    } catch (error) {
//      console.error("Error:", error);
//      res.status(500).json({ error: "Internal Server Error", message: error.message });
//    }
//  });



app.post("/utenti", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const utente = {
      username,
      email,
      password,
    };

    const existingUser = await db
      .collection("utenti")
      .findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ error: "L'email è già stata utilizzata" });
      return;
    }

    const utenti = await aggiungiUtente(utente);
    if (utenti) {
      res.status(200).json(utente);
    } else {
      res.status(500).json({ error: "Errore durante l'aggiunta dell'utente" });
    }
  } catch (error) {
    console.error(
      "Errore durante la gestione della richiesta POST '/utenti':",
      error
    );
    res.status(500).json({ error: "Errore interno del server" });
  }
});

app.get("/utenti", async (req, res) => {
  const { email } = req.query;

  try {
    const utente = await db.collection("utenti").findOne({ email: email });
    res.json(utente ? [utente] : null);
  } catch (error) {
    console.error("Errore durante il recupero dell'utente:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});
app.delete("/utenti/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const result = await deleteUtente(email);
    if (result.message) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

app.listen(8080, async () => {
  try {
    db = await connectToDB();
    console.log("Server in esecuzione su porta 8080 e DB connesso");
  } catch (e) {
    console.error(e);
  }
});
