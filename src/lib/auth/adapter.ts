import { type Adapter } from "@auth/core/adapters"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const adapter: Adapter = {
  ...PrismaAdapter( prisma ),
  // Add your custom methods here
}

const request = new Request( "https://example.com" )
const response = await Auth( request, { adapter, ... } )