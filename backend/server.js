require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const apartmentRoutes = require('./routes/apartments')

const app = express()

const corsOptions = {
	origin: 'https://nitrix-task.vercel.app',
	methods: 'GET,POST,PUT,DELETE',
	allowedHeaders: 'Content-Type,Authorization',
}

app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT || 5000

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log('Mongoose is connected')
	} catch (error) {
		console.error('Could not connect to MongoDB:', error)
		process.exit(1)
	}
}

connectDB()

app.use('/api/apartments', apartmentRoutes)

app.get('/', (req, res) => {
	res.send('Use /api/apartments to access the API')
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
