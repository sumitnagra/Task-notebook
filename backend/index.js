import express from 'express'
import connectMongo from './db.js'
import router from './Router/router.js'
import cors from 'cors'
const port = process.env.PORT || 8080
const app = express()
connectMongo();
app.use(cors());
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})