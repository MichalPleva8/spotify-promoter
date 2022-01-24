const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Mongo Db Connection
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Save Playlist
router.post('/save', (req, res) => {
	let payload = req.body;

	try {
		client.connect(async err => {
			if (err) throw err;
			const collection = client.db("playlists").collection("items");

			const effected = await collection.insertOne(payload);
			console.log("Effected fields:", effected);

			client.close();
			res.json({ error: "none", result: effected });
		});
	} catch (error) {
		console.log(error);
		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
	}

});

// Get playlist
router.get('/:pid', async (req, res) => {
	try {
		client.connect(async err => {
			if (err) throw err;
			const collection = client.db("playlists").collection("items");

			const promoted = await collection.find({ id: req.params.pid }).toArray();

			client.close();
			res.json(promoted);
		});
	} catch (error) {
		console.log(error);
		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
	}
});

module.exports = router;