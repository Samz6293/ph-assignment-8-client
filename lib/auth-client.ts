import { createAuthClient } from "better-auth/react"

// no baseURL needed: the auth API lives on the same site (/api/auth)
export const authClient = createAuthClient()
