const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('base.db');

// Create the entities table in the database if not exists
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS entities (
            id INTEGER PRIMARY KEY, 
            name TEXT,
            x INTEGER,
            y INTEGER,
            labels TEXT
        )`
    );
});

// Create an express app
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Helper function to execute SQL queries and return a promise
const runQuery = (sql, params = [], isSelectQuery = false) => {
    return new Promise((resolve, reject) => {
        if (isSelectQuery) {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        }
    });
};



// CRUD

// Load all etities
app.get('/entities', async (req, res) => {
    try {
        const entities = await runQuery('SELECT * FROM entities', [], true);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching entities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post an entity
app.post('/entities', async (req, res) => {
    const { name, x, y, labels } = req.body;
    if (!name || !x || !y) {
        return res.status(400).json({ error: 'Name, x or y coordinates are missing' });
    }

    try {
        await runQuery('INSERT INTO entities (name, x, y, labels) VALUES (?, ?, ?, ?)', [name, x, y, labels]);
        const entity = { id: this.lastID, name, coordinate: { x, y }, labels: labels };
        res.json(entity);
    } catch (error) {
        console.error('Error creating entity:', error);
        res.status(500).json({ error: 'Internal Server Error during creating entity' });
    }
});

// Update entity
app.put('/entities/:id', async (req, res) => {
    const { id } = req.params;
    const { name, x, y, labels } = req.body;
    if (!name || !x || !y) {
        return res.status(400).json({ error: 'Name, x or y coordinates are missing' });
    }

    try {
        await runQuery('UPDATE entities SET name = ?, x = ?, y = ?, labels = ? WHERE id = ?', [name, x, y, labels, id]);
        const entity = { id, name, coordinate: { x, y }, labels: labels };
        res.json(entity);
    } catch (error) {
        console.error('Error updating entity:', error);
        res.status(500).json({ error: 'Internal Server Error during updating entity' });
    }
});

app.delete('/entities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await runQuery('DELETE FROM entities WHERE id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting entity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const port = 3001;
// Close the database connection when the server is closed
app.on('close', () => {
    db.close();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
