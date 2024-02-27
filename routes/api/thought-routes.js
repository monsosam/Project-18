// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controller/thought-controller');

// -- Directs to: /api/thoughts <GET>

router.get("/", getAllThoughts);

// -- Directs to: /api/thoughts/:id <GET, PUT, DELETE>

router.get("/:thoughtId", getThoughtById);

router.put("/:thoughtId", updateThought);

router.delete("/:thoughtId", deleteThought);

// -- Directs to: /api/thoughts/:userId <POST>

router.post("/", createThought);

// -- Directs to: /api/thoughts/:thoughtId/reactions <POST>

router.post("/:thoughtId", createReaction);

// -- Directs to: /api/thoughts/:thoughtId/reactionId <DELETE>

router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

// Export module router
module.exports = router;