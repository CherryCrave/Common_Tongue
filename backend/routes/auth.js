const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const router = express.Router();

// User registration functionality
router.post('/register', async (req, res) => {
    try{
        const {email, username, password} = req.body;

        // Does the user already exist?
        const existingUserQuery = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]
        );

        if (existingUserQuery.rows.length > 0) {
            return res.status(400).json({error: 'A user with that email or username already exists. Please try again with different details or login.'});}

        // Encrypting the password for security
        const passwordHash = await bcrypt.hash(password, 8);

        // Adding the user to the database with the password, hashed 2^8 times so it cannot be reversed.
        const insertNewUserQuery = await pool.query(
            'INSERT INTO users (email, username, hashed_password) VALUES ($1, $2, $3) RETURNING *', [email, username, passwordHash]);
        res.status(201).json({message: 'User registration successful', user: insertNewUserQuery.rows[0]})
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'User registration failed. Please try again later.'})
    }
});
// User login functionality
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        // Does the user exist?
        const existingUserQuery = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        )
        
        if(existingUserQuery.rows.length === 0){
            return res.status(400).json({error: 'This user does not exist. Please register an account to use this login.'})
        }

        // Comparison of the inputted password with what's currently stored.
        const passwordValidation = await bcrypt.compare(password, existingUserQuery.rows[0].hashed_password);
        
        if(!passwordValidation){
            return res.status(401).json({error: 'There is an invalid email or password'});
        }

        // I need to add JsonWebToken functionality.
        const JWTtoken = jwt.sign(
            {userId: existingUserQuery.rows[0].id, email: existingUserQuery.rows[0].email}, 
            process.env.JWT_SECRET,
            {expiresIn: '2d'}
        );

        const { hashed_password, ...secureUserDetails } = existingUserQuery.rows[0];

        res.status(200).json({message: 'User login is successful.', user: secureUserDetails, token: JWTtoken});
        
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'User login has failed. Please try again later.'})
    }
});

module.exports = router;