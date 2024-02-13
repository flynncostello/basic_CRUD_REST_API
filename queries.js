const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

const getUsers = (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res, next) => {
    const id = parseInt(req.params.id);

    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res, next) => {
    const { first_name, last_name, email } = req.body;

    pool.query(
        `INSERT INTO users (first_name, last_name, email) VALUES ('${first_name}', '${last_name}', '${email}')`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`User added with ID: ${results.insertId}`);
        }
    );
};

const updateUser = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email } = req.body;

    pool.query(
        `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}' WHERE id = ${id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteUser = (req, res, next) => {
    const id = parseInt(req.params.id);

    pool.query(
        `DELETE FROM users WHERE id = ${id}`,
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User deleted with ID: ${id}`);
        }
    );
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
