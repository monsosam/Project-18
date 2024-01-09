const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Getter method to format the timestamp
  reactionSchema.set('toObject', { getters: true });
  reactionSchema.set('toJSON', { getters: true });
  

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of nested documents (reactions)
  });
  
  // Virtual to retrieve reaction count
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  // Getter method to format the timestamp
  thoughtSchema.set('toObject', { getters: true });
  thoughtSchema.set('toJSON', { getters: true });
  
  const Thought = mongoose.model('Thought', thoughtSchema);
  
  module.exports = Thought;