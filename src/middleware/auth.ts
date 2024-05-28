/* eslint-disable  @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

interface UserRequest extends Request {
  user?: any
}

export const Auth = (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
