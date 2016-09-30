
/**
* Main feature, move slides with gesture
*/

var gesturePresenter = {

	// Normal presentor without video
	// start: function() {
	// 	chrome.tabs.executeScript( null, {
	// 		file: "src/bg/prez.js"
	// 	});
	// },

	// Has video support for showing openCv additio s
	start_demo: function() {
		chrome.tabs.executeScript( null, {
			file: "src/bg/prez_video.js"
		});
	}
};


/**
* Added for fun. Scrapes the questions posted from
* the google Presenter Feature on Google Slides.
* Displays the questions as live posts overtop the slides,
* sort of like how Periscope does it.
*/

var liveNotifications =  {

	globalMapId: [],
	counter: 0,
	listenUrl: '/bind',

	/**
	* Start the live notifications
	*/
	start: function() {

		chrome.webRequest.onCompleted.addListener(function(res) {

			if (res.url.indexOf(this.listenUrl) !== -1 && res.statusCode === 200) 
				this.fetchResponse(res.url, this.scrapePosts);

		},{urls: ["*://*/*"]});

	},

	/**
	* Get posts from Google presenter question private API...
	*/
	scrapePosts: function(res) {

		var firstIndex = res.indexOf('qanda_question');
		if (firstIndex !== -1) {

			var re = /(["'])(?:(?=(\\?))\2.)*?\1/g;
			var allVals = res.match(re);

			var indices = [];
			var element = '"qanda_question"';
			var idx = allVals.indexOf(element);
			while (idx != -1) {
			  indices.push(idx);
			  idx = allVals.indexOf(element, idx + 1);
			}

			var posts = [];
			var mapId = [];
			var comment, name, id, img;
			indices.forEach(function(el, i, arr) {

				comment = allVals[el+1];
				name = allVals[el+2];
				id = allVals[el+3];
				img = allVals[el+5];

				if (mapId.indexOf(id) === -1) {
					posts.push({
						comment: comment,
						name: name,
						id: id,
						img: img
					});
					mapId.push(id);
				}
			});

			posts.forEach(function(post, i) {
				if (this.globalMapId.indexOf(id) === -1) {

					chrome.tabs.executeScript(null, {
						code: 'var comment = ' + post.comment + ', name = ' + post.name + ', img = ' + post.img + ', counter = ' + i + ';'
					}, generatePost);

					++this.counter;
					this.globalMapId.push(post.id);
				}
			});

		}

	},

	generatePost: function() { 
		chrome.tabs.executeScript( null, {
			file: "js/jquery/jquery.js"
		}, function() {
			chrome.tabs.executeScript( null, {
				file: "src/bg/generate_post.js"
			});
		});
	},

	fetchResponse: function(url, callback) {
		var xmlRequest=new XMLHttpRequest();
		xmlRequest.open('GET', url,true);
		xmlRequest.send();

		xmlRequest.onreadystatechange = function() {
			if(xmlRequest.readyState==4){
				callback(xmlRequest.responseText);
			}
		};
	}

};

