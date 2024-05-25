const express = require('express');
const pool = require('./db');

const port = 3000;
const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
	res.sendStatus(200);
})
app.post('/', async (req, res) => {
	const {name, location} = req.body;
	try {
		const data = await pool.query('SELECT * FROM schools');
		res.sendStatus(200).send(data.rows);
	} catch (err) {
		console.error(err.message);
		res.sendStatus(500);
	}
})

app.get('/setup', async (req, res) => {
	try {
		await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(50), location VARCHAR(50))');
		res.sendStatus(200).send({message: 'Successfully created table'});
	} catch (err) {
		console.error(err.message);
		res.sendStatus(500);
	}
})
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
