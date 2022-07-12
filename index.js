const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');


const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.reokp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    client.connect();

    const watchCollection = client.db('watchdb').collection('watchCollections');

    try {

        app.get('/api/watches', async (req, res) => {
            const query = {};
            const result = await watchCollection.find(query).toArray();
            res.send(result);
        });

    }finally {

    }
}

run().catch(console.dir);


app.listen(port ,()=>{
    console.log(`App listening at ${port}`)
})