const express = require('express');
const { createUser, findUser, updateUsername, deleteUser } = require('../controllers/user');

const router = express.Router();

router.get('/', async(req, res) => {
    // const user = createUser("aweston2", "aweston2@gmail.com", "test");
    const deletedUser = updateUsername("aweston2", "aweston3@gmail.com");
})

module.exports = router;