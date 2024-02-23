const mongoose = require('mongoose');

// creating the reactionSchema
const reactionSchema = new mongoose.Schema({
// the "id" of the reaction
reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
},
// the text of the reaction and setting max length to 280 characters
reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
},
// the username of the reactor
username: {
    type: String,
    required: true,
},
// when the reaction was created
createdAt: {
    type: Date,
    default: Date.now,
},
});

reactionSchema.virtual('formattedCreatedAt').get(function () {
return this.createdAt.toISOString();
});

const Reaction = mongoose.model("Reaction", reactionSchema);

// exporting the reaction schema
module.exports = Reaction;