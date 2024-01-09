// Require express router
const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../controller/user-controller');

// -- Directs to: /api/users <GET, POST>
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// Module export router
module.exports = router;