
function getVideoFeed() {
	chrome.tabs.executeScript( null, {
		file: "src/bg/video_feed.js"
	});
}

function getFeed() {
	chrome.tabs.executeScript( null, {
		file: "src/bg/feed.js"
	});
}

function getNotifications() {
	console.log('START LOG >>');
	var globalMapId = [];
	var counter = 0;

	var post;
	var mapIt = [{
			comment: "Awesome Prez",
			name: "Oles",
			img: "http://4.bp.blogspot.com/-iqjwalq6sPw/Uy-r699z5KI/AAAAAAAAf9A/P-SL-04nDdo/s1600/profile.png"
		},
		{
			comment: "Great Idea",
			name: "John",
			img: "http://4.bp.blogspot.com/-iqjwalq6sPw/Uy-r699z5KI/AAAAAAAAf9A/P-SL-04nDdo/s1600/profile.png"
		},
		{
			comment: "You're the best",
			name: "Annie",
			img: "http://4.bp.blogspot.com/-iqjwalq6sPw/Uy-r699z5KI/AAAAAAAAf9A/P-SL-04nDdo/s1600/profile.png"
		},
		{
			comment: "Great job",
			name: "Cici",
			img: "http://4.bp.blogspot.com/-iqjwalq6sPw/Uy-r699z5KI/AAAAAAAAf9A/P-SL-04nDdo/s1600/profile.png"
		}
	];
	count = 0;
	setInterval(function() {
		post = mapIt[count];
		console.log('Generating tab');
		chrome.tabs.executeScript(null, {
			code: 'var comment = "' + post.comment + '", name = "' + post.name + '", img = "' + post.img + '", counter = ' + count + ';',
		}, function() {
			console.log('Executing jquery script now...');
			chrome.tabs.executeScript( null, {
				file: "js/jquery/jquery.js"
			}, function() {
				console.log('Executing generate_post script now...');
				chrome.tabs.executeScript( null, {
					file: "src/bg/generate_post.js"
				});
			});
		});
		count++;
		if (count === 3)
			count = 0;
	}, 3500);

	// var fetchResponse = function(url, callback) {
	// 	var xmlRequest=new XMLHttpRequest();
	// 	xmlRequest.open('GET', url,true);
	// 	xmlRequest.send();

	// 	xmlRequest.onreadystatechange=function(){
	// 		if(xmlRequest.readyState==4){
	// 			callback(xmlRequest.responseText);
	// 		}
	// 	};
	// };

	// var scrapePosts = function(res) {
	// 	var firstIndex = res.indexOf('qanda_question');
	// 	if (firstIndex !== -1) {

	// 		var re = /(["'])(?:(?=(\\?))\2.)*?\1/g;
	// 		var allVals = res.match(re);

	// 		var indices = [];
	// 		var element = '"qanda_question"';
	// 		var idx = allVals.indexOf(element);
	// 		while (idx != -1) {
	// 		  indices.push(idx);
	// 		  idx = allVals.indexOf(element, idx + 1);
	// 		}

	// 		var posts = [];
	// 		var mapId = [];
	// 		var comment, name, id, img;
	// 		indices.forEach(function(el, i, arr) {

	// 			comment = allVals[el+1];
	// 			name = allVals[el+2];
	// 			id = allVals[el+3];
	// 			img = allVals[el+5];

	// 			if (mapId.indexOf(id) === -1) {
	// 				posts.push({
	// 					comment: comment,
	// 					name: name,
	// 					id: id,
	// 					img: img
	// 				});
	// 				mapId.push(id);
	// 			}
	// 		});

	// 		posts.forEach(function(post, i) {
	// 			if (globalMapId.indexOf(id) === -1) {
	// 				console.log('Generating post... => ', 'var comment = ' + post.comment + ', name = ' + post.name + ', img = ' + post.img + ';');
	// 				chrome.tabs.executeScript(null, {
	// 					code: 'var comment = ' + post.comment + ', name = ' + post.name + ', img = ' + post.img + ', counter = ' + i + ';',
	// 				}, function() {
	// 					console.log('Executing jquery script now...');
	// 					chrome.tabs.executeScript( null, {
	// 						file: "js/jquery/jquery.js"
	// 					}, function() {
	// 						console.log('Executing generate_post script now...');
	// 						chrome.tabs.executeScript( null, {
	// 							file: "src/bg/generate_post.js"
	// 						});
	// 					});
	// 				});
	// 				++counter;
	// 				globalMapId.push(post.id);
	// 			}
	// 		});
	// 	}
	// };

	// chrome.webRequest.onCompleted.addListener(function(res) {
	// 	var listenUrl = '/bind';
	// 	if (res.url.indexOf(listenUrl) !== -1 && res.statusCode === 200) {
	// 		fetchResponse(res.url, scrapePosts);
	// 	}
	// },{urls: ["*://*/*"]});
}
