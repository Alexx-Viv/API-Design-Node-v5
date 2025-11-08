import express from 'express'

const app = express()

app.get('/health', (req, res) => {
    res.send('<button>Click me</button>')
})

export { app }

export default app