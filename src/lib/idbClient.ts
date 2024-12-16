import { openDB, DBSchema } from "idb";
import { Person, FeverDiaryEntry } from "../types";

export interface FeverDiaryDB extends DBSchema {
  persons: {
    key: string;
    value: Person;
    indexes: { "by-name": string };
  };
  entries: {
    key: string;
    value: FeverDiaryEntry;
    indexes: { "by-person": string };
  };
}

enum StoreName {
  Persons = "persons",
  Entries = "entries",
}

const DB_NAME = "fever-diary-db";
const DB_VERSION = 1;

const initDB = async () => {
  return openDB<FeverDiaryDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const personStore = db.createObjectStore(StoreName.Persons, { keyPath: "id" });
      personStore.createIndex("by-name", "name");

      const entriesStore = db.createObjectStore(StoreName.Entries, { keyPath: "id" });
      entriesStore.createIndex("by-person", "personId");
    },
  });
};

class FeverDiaryIDBClient {
  private static instance: FeverDiaryIDBClient;
  private dbPromise = initDB();

  private constructor() {}

  static getInstance(): FeverDiaryIDBClient {
    if (!FeverDiaryIDBClient.instance) {
      FeverDiaryIDBClient.instance = new FeverDiaryIDBClient();
    }
    return FeverDiaryIDBClient.instance;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  async addPerson(person: Omit<Person, "id">): Promise<string> {
    const db = await this.dbPromise;
    const personWithId = { ...person, id: this.generateId() };
    await db.add(StoreName.Persons, personWithId);
    return personWithId.id;
  }

  async addEntry(entry: Omit<FeverDiaryEntry, "id">): Promise<string> {
    const db = await this.dbPromise;
    const entryWithId = { ...entry, id: this.generateId() };
    await db.add(StoreName.Entries, entryWithId);
    return entryWithId.id;
  }

  async putPerson(person: Person): Promise<void> {
    const db = await this.dbPromise;
    await db.put(StoreName.Persons, person);
  }

  async getPersons(): Promise<Person[]> {
    const db = await this.dbPromise;
    return db.getAll(StoreName.Persons);
  }

  async getPerson(id: string): Promise<Person | undefined> {
    const db = await this.dbPromise;
    return db.get(StoreName.Persons, id);
  }

  async deletePerson(personId: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction([StoreName.Entries, StoreName.Persons], "readwrite");

    // Delete all entries for the person
    const entries = tx.objectStore(StoreName.Entries);
    const entriesByPerson = entries.index("by-person");
    const cursor = await entriesByPerson.openCursor(personId);

    // Delete each entry
    const deletePromises: Promise<void>[] = [];
    while (cursor) {
      const entry = cursor.value;
      deletePromises.push(entries.delete(entry.id));
      await cursor.continue();
    }
    await Promise.all(deletePromises);

    // Delete the person
    const persons = tx.objectStore(StoreName.Persons);
    await persons.delete(personId);

    // Wait for all the operations to complete
    await tx.done;
  }

  async putEntry(entry: FeverDiaryEntry): Promise<void> {
    const db = await this.dbPromise;
    await db.put(StoreName.Entries, entry);
  }

  async getEntryById(entryId: string): Promise<FeverDiaryEntry | undefined> {
    const db = await this.dbPromise;
    return db.get(StoreName.Entries, entryId);
  }

  async getEntriesByPerson(personId: string): Promise<FeverDiaryEntry[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex(StoreName.Entries, "by-person", personId);
  }

  async deleteEntry(entryId: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(StoreName.Entries, entryId);
  }

  async getEntries(count: number): Promise<FeverDiaryEntry[]> {
    const db = await this.dbPromise;
    return db.getAll(StoreName.Entries, null, count);
  }

  async getAllEntries(): Promise<FeverDiaryEntry[]> {
    const db = await this.dbPromise;
    return db.getAll(StoreName.Entries);
  }
}

export default FeverDiaryIDBClient;
