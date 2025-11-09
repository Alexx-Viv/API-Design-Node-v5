import type { Request, Response, NextFunction } from 'express'
import { type JwtPayload } from '../utils/jwt.ts'
import { verifyToken } from '../controllers/authController.ts'

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

export const AuthenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Bad Request' })
    }
    const payload = await verifyToken(token)
    req.user = payload
    console.log(req.user)
    next()
  } catch (e) {
    return res.status(403).json({ error: 'Foribdden' })
  }
}
