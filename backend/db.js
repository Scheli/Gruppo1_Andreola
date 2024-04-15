import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDB() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client.db("Stats");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteUtente(email) {
  try {
    const db = await connectToDB();
    const result = await db.collection('utenti').deleteOne({ email: email });
    if (result.deletedCount === 1) {
      return { message: "Utente eliminato con successo" };
    } else {
      return { error: "L'utente non è stato trovato" };
    }
  } catch (err) {
    console.error("Si è verificato un errore durante l'eliminazione dell'utente:", err);
    return { error: "Errore durante l'eliminazione dell'utente" };
  }
}

export async function aggiungiUtente(utente) {
  try {
    const db = await connectToDB();
    const existingUser = await db.collection('utenti').findOne({ email: utente.email });

    if (existingUser) {
      return null; 
    }

    const result = await db.collection('utenti').insertOne(utente);
    return result.insertedId;
  } catch (err) {
    console.error("Qualcosa è andato storto nell'inserimento:", err);
  }
}
export async function getAllUsers(db) {
  const utenti = await db.collection("utenti").find().toArray();
  return utenti;
}

export async function getAll(db, resource) {
  const data = await db.collection(resource).find().toArray();
  return data;
}


export async function getOne(db, resource, id) {
  const data = await db.collection(resource).findOne({ _id: new ObjectId(id) });
  return data;
}

export async function getSeason(db, resource, season) {
  const data = await db.collection(resource).find({ season: season }).toArray();
  return data;
}

export async function getOnerace(db, resource, season, round) {
  const data = await db
    .collection(resource)
    .findOne({ season: season, round: round });
  return data;
}

export async function createMany(db, resource, newitem) {
  const data = await db.collection(resource).insertMany(newitem);
}

export async function createOne(db, resource, newItem) {
  const data = await db.collection(resource).insertOne(newItem);
  if (data?.acknowledged) {
    const id = data.insertedId;
    return getOne(db, resource, id);
  }
  console.log(data);
}

export async function deleteOne(db, resource, id) {
  const data = await db
    .collection(resource)
    .deleteOne({ _id: new ObjectId(id) });
  return data;
}

export async function updateOne(db, resource, id, newValues) {
  const data = await db
    .collection(resource)
    .updateOne({ _id: new ObjectId(id) }, { $set: newValues });

  return data;
}

export async function getAllFighter(db, UFC_Fighters) {
  const data = await db.collection(UFC_Fighters).find().toArray();
  return data;
}

export async function getFighter(db, UFC_Fighters, id) {
  const data = await db
    .collection(UFC_Fighters)
    .findOne({ _id: new ObjectId(id) });
  return data;
}

export async function getNameFighter(db, UFC_Fighters, name) {
  const cursor = await db.collection(UFC_Fighters).find({ name: name });
  const fighters = await cursor.toArray(); 
  return fighters;
}

export async function getDivisionFighter(db, UFC_Ranking, id) {
  const data = await db.collection(UFC_Ranking).findOne({ _id: new ObjectId(id) });
  return data;
}
