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
} = require('../../controller/user-controller');

// -- Directs to: /api/users <GET, POST>

router.get('/', getAllUsers);

router.post('/', createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>

router.post('/:userId/friends/:friendId', addFriend);

router.delete("/:userId/friends/:friendId", removeFriend);

// Module export router
module.exports = router;