const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
	.connect('mongodb://root:root123@ds227594.mlab.com:27594/graphql', { useNewUrlParser: true })
	.then(() => console.log('Mongoose connected')).catch((err) => console.log(err));
