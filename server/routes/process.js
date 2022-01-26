const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Mongo Db Connection
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

// Get one random playlist
// Can't be used because of free teer in Mongo Atlas
// router.get('/random', async (req, res) => {
// 	try {
// 		client.connect(async err => {
// 			if (err) throw err;
// 			const collection = await client.db("playlists").collection("items");

// 			const data = await collection.aggregate([{ $samples: { size: 1 }}]).toArray();

// 			client.close();
// 			await res.json(data);
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ error: "nodbconnection", errorMessage: "Database is not connected with server!" });
// 	}
// });

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