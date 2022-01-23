const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Mongo Db Connection
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/save', (req, res) => {
	let payload = req.body;

	client.connect(async err => {
		if (err) throw err;
		const collection = client.db("playlists").collection("items");

		const effected = await collection.insertOne(payload);
		console.log("Effected fields:", effected);

		client.close();
	});

	res.json({ error: "none" });
});

router.get('/:pid', async (req, res) => {
	client.connect(async err => {
		if (err) throw err;
		const collection = client.db("playlists").collection("items");

		const promoted = await collection.find({ id: req.params.pid }).toArray();

		client.close();
		res.json(promoted);
	});
});

module.exports = router;