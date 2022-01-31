const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Mongo Db Connection
let client;
try {
	const uri = process.env.MONGO_URL;
	client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
	console.log("Mongo Connection error:", error);
}

// Get all playlist
router.get('/all', async (req, res) => {
	try {
		client.connect(async err => {
			if (err) throw err;
			const collection = await client.db("playlists").collection("items");

			const data = await collection.find({}, {total: 0}).toArray();

			client.close();
			await res.json(data);
		});
	} catch (error) {
		console.log(error);
		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
	}
});

// Get all tags 
router.get('/tags', async (req, res) => {
	try {
		client.connect(async err => {
			if (err) throw err;
			const collection = await client.db("playlists").collection("tags");

			const data = await collection.find({}).toArray();

			client.close();
			await res.json(data);
		});
	} catch (error) {
		console.log(error);
		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
	}
});

// Save Playlist
router.post('/save', (req, res) => {
	let payload = req.body;

	try {
		client.connect(async err => {
			if (err) throw err;
			const collection = client.db("playlists").collection("items");
			const tags = client.db("playlists").collection("tags");

			const effected = await collection.insertOne(payload);
			await tags.insertOne({
				href: `/showcase/${payload.id}`,
				name: payload.name,
				image: payload.image,
				username: payload.created.username
			});

			client.close();
			res.json({ error: "none", result: effected });
		});
	} catch (error) {
		console.log(error);
		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
	}

});

// Get One playlist data
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