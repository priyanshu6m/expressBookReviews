const axios = require('axios');
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });
      return res.status(200).json({
        message: "User successfully registered. Now you can login"
      });
    } else {
      return res.status(404).json({
        message: "User already exists!"
      });
    }
  }

  return res.status(404).json({
    message: "Unable to register user."
  });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function(req, res) {
    try {
        const isbn = req.params.isbn;

        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        return res.status(200).json(books[isbn]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', async function(req, res) {
    try {
        const author = req.params.author;

        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        let filteredBooks = {};

        Object.keys(books).forEach(key => {
            if (books[key].author === author) {
                filteredBooks[key] = books[key];
            }
        });

        return res.status(200).json(filteredBooks);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get all books based on title
public_users.get('/title/:title', async function(req, res) {
    try {
        const title = req.params.title;

        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        let filteredBooks = {};

        Object.keys(books).forEach(key => {
            if (books[key].title === title) {
                filteredBooks[key] = books[key];
            }
        });

        return res.status(200).json(filteredBooks);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});





 

  


module.exports.general = public_users;
