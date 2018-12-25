const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
	student: {
		type: String,
		required: true
	},
	points: {
		type: String,
		required: true
	}
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
