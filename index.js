const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

// mongodb setup
const uri = `mongodb+srv://volunteer:1FghzMwUoz10faJ0@cluster0.aghhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {
        await client.connect()
        const database = client.db('volunteers')
        const programsCollection = database.collection('programs')
        app.get('/programs', async (req, res) => {
            const cursor = programsCollection.find({})
            const result = await cursor.toArray()

            res.json(result)
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server is running')
})
app.listen(port, () => {
    console.log('This server running at the port', port)
})