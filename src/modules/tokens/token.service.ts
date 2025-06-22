import { db } from "@/lib/db"
class Service {
  async GET() {
    const response= await db.tokens.toArray()
    return response
  }
}

const tokenService = new Service()
export default tokenService