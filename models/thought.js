const mongoose = require('mongoose');
// creating the thoughtSchema
const thoughtSchema = new mongoose.Schema({
    // the "text" body of the thought
    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
},
    // when the thought was created
    createdAt: {
    type: Date,
    default: Date.now,
},
    // the username of the thought creator
    username: {
    type: String,
    required: true,
},
    // the reactions to the thought
    reactions: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reaction',
    },
],
});
// getting the length of the reaction count to get total reactions
thoughtSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;