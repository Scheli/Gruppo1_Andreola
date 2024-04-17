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
  getRanking
} from "./db.js";

const app = express();
let db; // Connessione al database

app.use(express.json());
app.use(cors());

// Route per ottenere informazioni sulla Formula 1
app.get("/f1", async (req, res) => {
  try {
    const resource = req.query.resource;
    const season = req.query.season;
    const round = req.query.round;

    if (season && round) {
      const result = await getOnerace(db, resource, season, round);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Risorsa non trovata" });
      }
    } else if (season) {
      const result = await getSeason(db, resource, season);

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Risorsa non trovata" });
      }
    }
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
    res.status(500).send(error.message);
  }
});

// Route per calcolare il tasso di vittoria di un pilota di F1
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
    const pointPerRace = (point / totalRaces).toFixed(2);
    res.json({ wins, point, winPercentage, pointPerRace });
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
    res.status(500).send(error.message);
  }
});

// Route per calcolare il sorpasso di un pilota di F1 in una gara specifica
app.get("/f1overtake", async (req, res) => {
  try {
    const season = req.query.season;
    const round = req.query.round;
    const driver = req.query.driver;
    let pilotFound = false;
    let positionGain = 0;
    let start_Position
    let finish_position
    const data = await getOnerace(db, "Race", season, round);
    console.log( data.Races[0].Results)
    data.Races[0].Results.forEach((result) => {
        if (result.Driver.familyName === driver) {
          pilotFound = true;
          positionGain = parseInt(result.position) - parseInt(result.grid);
          finish_position=result.position;
          start_Position=result.grid;
        }
      });
    
    if (!pilotFound) {
      throw new Error("Pilota non trovato");
    }
    res.json({ start_Position,finish_position,positionGain });
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
    res.status(500).send(error.message);
  }
});

// Route per ottenere il ranking UFC
app.get("/ufc/ranking", async (req, res) => {
  try {
    const rankingId = req.query.rankingId;
    const ranking = await getRanking(db, rankingId);
    res.json(ranking);
  } catch (error) {
    console.error("Errore durante il recupero del ranking:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Route per ottenere informazioni su un lottatore UFC
app.get("/ufc", async (req, res) => {
  try {
    const fighterId = req.query.fighter;
    const result = await getFighter(db, "UFC_Fighters", fighterId);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Lottatore non trovato" });
    }
  } catch (error) {
    console.error("Errore durante il recupero del lottatore:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Route per ottenere tutti i lottatori UFC
app.get("/ufc/fighters", async (req, res) => {
  const result = await getAllFighter(db, "UFC_Fighters");

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Lottatori non trovati" });
  }
});

// Route per ottenere i dettagli di un lottatore UFC per nome
app.get("/ufc/fighters/:name", async (req, res) => {
  try {
    const fighterName = req.params.name;
    const fighterDetails = await getNameFighter(
      db,
      "UFC_Fighters",
      fighterName
    );

    if (!fighterDetails) {
      return res.status(404).json({ error: "Lottatore non trovato" });
    }
    res.json(fighterDetails);
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli del lottatore:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Route per aggiungere un utente
app.post("/utenti", async (req, res) => {
  try {
    // Gestione della richiesta POST per aggiungere un utente
  } catch (error) {
    console.error("Errore durante la gestione della richiesta POST '/utenti':", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Route per ottenere un utente per email
app.get("/utenti", async (req, res) => {
  try {
    // Gestione della richiesta GET per ottenere un utente per email
  } catch (error) {
    console.error("Errore durante il recupero dell'utente:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Route per eliminare un utente
app.delete("/utenti/:email", async (req, res) => {
  try {
    // Gestione della richiesta DELETE per eliminare un utente
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'utente:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Avvio del server
app.listen(8080, async () => {
  try {
    db = await connectToDB();
    console.log("Server in esecuzione su porta 8080 e database connesso");
  } catch (e) {
    console.error(e);
  }
});
