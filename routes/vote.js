const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/vote');
var Pusher = require('pusher');

var pusher = new Pusher({
	appId: '678701',
	key: 'f2b95c6bf8fda6cf7c92',
	secret: '78a7fda4c7e450a825d9',
	cluster: 'ap2',
	encrypted: true
});

router.get('/', (req, res) => {
	Vote.find().then((votes) =>
		res.json({
			success: true,
			votes: votes 
		})
	);
});

router.post('/', (req, res) => {
	const newVote = {
		student: req.body.student,
		points: 1
	};

	new Vote(newVote).save().then((vote) => {
		pusher.trigger('student-live', 'student-vote', {
			points: parseInt(vote.points),
			student: vote.student
		});

		return res.json({ success: true, message: 'Thank U for voting' });
	});
});

module.exports = router;
