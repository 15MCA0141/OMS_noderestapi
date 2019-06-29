const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const UserController = require('../controllers/user');


/*Creating new user*/
router.post('/signup', UserController.new_user );


/*Loging in*/
router.post('/login', UserController.login_user);


/*Deleting User*/
router.delete('/:userId', checkAuth, UserController.delete_user);

module.exports = router;