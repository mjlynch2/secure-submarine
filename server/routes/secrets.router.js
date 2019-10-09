const express = require('express');
const { rejectUnauthenticated, adminAccess } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const clearanceLevel = [req.user.clearance_level];
    const queryText = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`;
    pool.query(queryText, clearanceLevel)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;