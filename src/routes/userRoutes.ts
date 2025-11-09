import { Router } from 'express'
import { AuthenticateToken } from '../middleware/auth.ts'

const router = Router()

router.use(AuthenticateToken)

router.get('/', (req, res) => {
  res.json({ message: 'users' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'got user' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'user updated' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'user deleted' })
})

export default router
