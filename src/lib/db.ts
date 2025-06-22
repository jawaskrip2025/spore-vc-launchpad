// lib/db.ts
import { TToken } from "@/models/token"
import Dexie, { Table } from "dexie"

export class TokenDatabase extends Dexie {
  tokens!: Table<TToken>

  constructor() {
    super("TokenDatabase")

    this.version(1).stores({
      tokens: "++id, name, symbol", // indeks kolom
    })
  }
}

export const db = new TokenDatabase()
