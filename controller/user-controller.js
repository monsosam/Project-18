// controllers/user-controller.js
const User = require('../models/user');
const Thought = require('../models/thought');

const userController = {
  getAllUsers: async (_req, res) => {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-__v")
      .populate('thoughts')
      .populate('friends');
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
      );
      res.json(updatedUser);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      await Thought.deleteMany({ username: deletedUser.username });
      res.json(deletedUser);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      user.friends.push(friendId);
      await user.save();
      res.json(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      user.friends.pull(friendId);
      await user.save();
      res.json(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
  },
};

module.exports = userController;