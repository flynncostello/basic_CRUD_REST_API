const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to the application.' });
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
