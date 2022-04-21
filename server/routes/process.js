const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Mongo Db Connection
let client;
try {
	client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
	console.error(error);
}

// Get all playlist
router.get('/all', async (req, res, next) => {
	try {
		client.connect(async err => {
			if (err) throw err;

			const collection = await client.db("playlists").collection("items");
			const data = await collection.find({}, {total: 0}).toArray();

			return res.json(data);
		});
	} catch (error) {
		return next(error);
	}
});

// Get all tags 
router.get('/tags', async (req, res, next) => {
	try {
		client.connect(async (err) => {
			if (err) throw err;

			const data = await client.db("playlists").collection("tags").find({}).toArray();

			return res.json(data);
		});
	} catch (error) {
		return next(error);
	}
});

// Save Playlist
router.post('/save', (req, res, next) => {
	const payload = req.body;

	try {
		client.connect(async (err) => {
			if (err) throw err;
			const effected = await client.db("playlists").collection("items").insertOne(payload);
			await client.db("playlists").collection("tags").insertOne({
				href: `/showcase/${payload.id}`,
				name: payload.name,
				image: payload.image,
				username: payload.created.username
			});

			return res.json({
				error: 'none',
				result: effected,
			});
		});
	} catch (error) {
		return next(error);
	}

});

// Get One playlist data
router.get('/:pid', async (req, res, next) => {
	try {
		client.connect(async err => {
			if (err) throw err;

			const collection = client.db("playlists").collection("items");
			const promoted = await collection.find({ id: req.params.pid }).toArray();

			return res.json(promoted);
		});
	} catch (error) {
		return next(error);
	}
});


module.exports = router;