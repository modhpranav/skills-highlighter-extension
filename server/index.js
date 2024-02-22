const express = require('express');
const pool = require('./db');
const app = express()

const port = 3000

// Routes
app.use(express.json())

// Create User
app.post('/user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);

    res.json(createUser.rows)
    res.json("Data added successfully.")
  } catch (err) {
    console.error(err.message)
  }
});

// Get Users
app.get('/user', async (req, res) => {
  try {
    const getAllUsers = await pool.query("SELECT * FROM users")

    res.json(getAllUsers.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// Delete User
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE user_id = $1", [id])

    res.json("User deleted successfully!")
  } catch (err) {
    console.error(err.message)
  }
})

// Authentication
app.post('/user/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await pool.query("SELECT * FROM Users WHERE user_email = $1 AND user_password = $2", [email, password])
    
    if (checkUser.rows.length > 0) {
      res.json("Login successful!")
    } else {
      res.json("Username or password is incorrect!")
    }
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})