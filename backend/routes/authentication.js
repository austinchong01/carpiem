const express = require('express');
const { createUser } = require('../controllers/user');

const router = express.Router();

router.post('/', async(req, res) => {
    const user = createUser("aweston", "aweston@gmail.com", "asdf");
    console.log(user);
})