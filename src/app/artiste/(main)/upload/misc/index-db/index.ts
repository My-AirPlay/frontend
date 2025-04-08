export * from "./media-db"
export * from "./album-db"

export const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
