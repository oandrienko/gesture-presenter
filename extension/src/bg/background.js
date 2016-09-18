
chrome.browserAction.onClicked.addListener(function(tab) {

	console.log('START LOG >>');
	var globalMapId = [];
	var counter = 0;

	var fetchResponse = function(url, callback) {
		var xmlRequest=new XMLHttpRequest();
		xmlRequest.open('GET', url,true);
		xmlRequest.send();

		xmlRequest.onreadystatechange=function(){
			if(xmlRequest.readyState==4){
				callback(xmlRequest.responseText);
			}
		};
	};

	var scrapePosts = function(res) {
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
				if (globalMapId.indexOf(id) === -1) {
					console.log('Generating post... => ', 'var comment = ' + post.comment + ', name = ' + post.name + ', img = ' + post.img + ';');
					chrome.tabs.executeScript(tab.id, {
						code: 'var comment = ' + post.comment + ', name = ' + post.name + ', img = ' + post.img + ', counter = ' + i + ';',
					}, function() {
						console.log('Executing jquery script now...');
						chrome.tabs.executeScript( tab.id, {
							file: "./jquery.js"
						}, function() {
							console.log('Executing generate_post script now...');
							chrome.tabs.executeScript( tab.id, {
								file: "./generate_post.js"
							});
						});
					});
					++counter;
					globalMapId.push(post.id);
				}
			});
		}
	};

	chrome.webRequest.onCompleted.addListener(function(res) {
		var listenUrl = '/bind';
		if (res.url.indexOf(listenUrl) !== -1 && res.statusCode === 200) {
			fetchResponse(res.url, scrapePosts);
		}
	},{urls: ["*://*/*"]});

	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript( null, {
			file: "./get_feed.js"
		});
	});

});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function(e) {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback(e);
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});

