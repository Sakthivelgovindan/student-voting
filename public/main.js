$(document).ready(function() {
	$(document).on('click', '#submit', function(e) {
		const result = $('input[name=student]:checked', '#student-vote').val();

		const data = { student: result };
		fetch('http://localhost:3000/vote', {
			method: 'post',
			body: JSON.stringify(data),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		e.preventDefault();
	});

	fetch('http://localhost:3000/vote').then((res) => res.json()).then((data) => {
		const votes = data.votes;
		console.log(votes);
		const totalVotes = votes.length;
		const voteCount = votes.reduce(
			(acc, vote) => ((acc[vote.student] = (acc[vote.student] || 0) + parseInt(vote.points)), acc),
			{}
		);

		let dataPoint = [
			{ label: 'student1', y: voteCount.student1 },
			{ label: 'student2', y: voteCount.student2 },
			{ label: 'student3', y: voteCount.student3 },
			{ label: 'student4', y: voteCount.student4 }
		];

		const chartContainer = document.querySelector('#chartContainer');

		if (chartContainer) {
			const chart = new CanvasJS.Chart('chartContainer', {
				title: {
					text: 'My First Chart in CanvasJS'
				},
				data: [
					{
						// Change type to "doughnut", "line", "splineArea", etc.
						type: 'column',
						dataPoints: dataPoint
					}
				]
			});

			chart.render();

			Pusher.logToConsole = true;

			var pusher = new Pusher('f2b95c6bf8fda6cf7c92', {
				cluster: 'ap2',
				forceTLS: true
			});

			var channel = pusher.subscribe('student-live');
			channel.bind('student-vote', function(data) {
				//	alert(JSON.stringify(data));
				dataPoint = dataPoint.map((x) => {
					if (x.label == data.student) {
						x.y += data.points;
						return x;
					} else {
						return x;
					}
				});
				chart.render();
			});
		}
	});
});
