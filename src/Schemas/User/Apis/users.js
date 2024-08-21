const express = require('express');
const router = express.Router();
const { getDb } = require('../../../../db/db');
const User = require('../user');
const bcrypt = require('bcrypt');


// Create a new user
router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const usersCollection = db.collection('users');

    // Check if the user with the same email already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
  
  // Get all users
  router.get('/show', async (req, res) => {
    try {
      const db = getDb();
      const usersCollection = db.collection('users');
  
      const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray(); // Exclude password from the response
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  });
  
  // Delete a user by email
  router.delete('/delete', async (req, res) => {
    const { email } = req.query;
  
    try {
      const db = getDb();
      const usersCollection = db.collection('users');
  
      const deletedUser = await usersCollection.findOneAndDelete({ email });
  
      if (deletedUser.value) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  
  // Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const usersCollection = db.collection('users');

    // Check if the user with the provided email exists
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

  
    res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to perform login' });
  }
});

module.exports = router;