// controllers/user-controller.js
const User = require('../models/user');
const Thought = require('../models/thought');

const userController = {
  getAllUsers: async (_req, res) => {
    User.find().then((users) => 
    res.json(users)).catch((err) => res.status(500).json(err));
  },

  getUserById: async (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => 
    !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
  },

  createUser: async (req, res) => {
    User.create(req.body).then((dbUserData) => 
    res.json(dbUserData)).catch((err) => res.status(500).json(err));
  },

  updateUser: async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, 
      { $set: req.body }, 
      { runValidators: true, new: true })
      .then((user) => {
      !user ? res.status(404).json({ message: 'No user' }) : res.json(user) })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser: async (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).
    then((user) => !user ? res.status(404)
    .json({ message: 'No user with that ID' }) : Thought.deleteMany({ _id: { $in: user.thoughts }}))
    .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
  },

  addFriend: async (req, res) => {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.params.id }, 
      { $addToSet: { friends: req.params.friendsId }}, 
      { runValidators: true, new: true })
      .then((user) => !user ? res.status(404)
      .json({ message: 'No friend found with that ID :(' }) : res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  removeFriend: async (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, 
      { $pull: { friends: req.params.friendsId } }, 
      { runValidators: true, new: true })
      .then((user) => !user ? res.status(404)
      .json({ message: 'No friend found with that ID :(' }) : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;