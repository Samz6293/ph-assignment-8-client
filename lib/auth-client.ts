import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

// no baseURL needed: the auth API lives on the same site (/api/auth)
export const authClient = createAuthClient({
  plugins: [
    jwtClient() 
  ]
})
