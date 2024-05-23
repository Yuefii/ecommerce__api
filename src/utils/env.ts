import dotenv from 'dotenv'

dotenv.config()

export const baseUrl = process.env.BASE_URL
export const jwtSecret = process.env.JWT_SECRET || ''
