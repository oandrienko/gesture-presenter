
//Set up vars

console.log('prex video initializeing');

var
streamURL = 'localhost:8888/ws/image_stream',
prev = document.getElementsByClassName("goog-inline-block")[2],
next = document.getElementsByClassName("goog-inline-block")[8];

//video stream object for setup of websockets and injections
var videoStream = {

	DELAY: false,
	THRESH: 150,


	/**
	* For the demo. shows the video stream with OpenCV additions.
	* Calls setFeed
	*/

	injectVideo: function() {

		this.video = document.createElement('video');
		this.video.className = "__gesture_present__vf-video";
		document.body.appendChild(this.video);

		this.image = document.createElement('img');
		this.image.className = "__gesture_present__vf-image";
		document.body.appendChild(this.image);

		this.canvas = document.createElement('canvas');
		this.canvas.className = "__gesture_present__vf-canvas";
		document.body.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d');

		if (this.hasGetUserMedia()) {

			var self = this;
			navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 }}).then(function(stream) {
				self.video.src = window.URL.createObjectURL(stream);
				self.video.onloadedmetadata = function(e) {
				self.video.play();
			};
			}).catch(function(err) {
				 console.log(err.name + ": " + err.message);
			});

		} else {
			alert('getUserMedia() is not supported in your browser');
		}

		return this;
	},


	/**
	* Sets up the websockets, and calls methods from Google slides object
	*/

	setFeed: function (socket_source) {

		var socket = new WebSocket('ws://'+socket_source),
		self = this;

		//Set up websocket
		socket.onopen = function(msg) {

			console.log('Opening onnection to websocket... ', msg);

			setInterval(function () {
				self.ctx.drawImage(self.video, 0, 0, 320, 240);

				var data = self.canvas.toDataURL('image/jpeg', 1.0);
				newblob = self.dataURItoBlob(data);
				socket.send(newblob);
			}, 200);

		};

		// Will either receive JSON or Blob. Handle both cases here.
		socket.onmessage = function(msg) {

			var target;
			if (msg.data.size !== undefined) {

				//Blob being sent
				target = self.image;
				url=window.URL.createObjectURL(msg.data);
				target.onload = function() {
					window.URL.revokeObjectURL(url);
				};
				target.src = url;

			} else {

				//JSON coordinates being sent
				var data = JSON.parse(msg.data);

				console.log('dir, dX, mv => ', data.dir, data.dX);

				if(!self.DELAY) {

					//Move Slides here...
					if (data.dX > self.THRESH)
						googleSlides.next();
					else if (data.dX < -self.THRESH)
						googleSlides.prev();

					self.DELAY = true;
					setTimeout(function() {
						self.DELAY = false;
					}, 5000);
				}
			}

		};

	},


	/**
	* Utility methods
	*/

	hasGetUserMedia: function() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	},

	dataURItoBlob: function(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);

		for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
		}

		var blob = new Blob([ab], {type: mimeString});
		return blob;
	}

};

// google slides control
var googleSlides = {

	init: function(nextButton, prevButton) {
		this.next = nextButton;
		this.prev = prevButton;
	},

	next: function() {
		this.moveSlide(this.next);
	},

	prev: function() {
		this.moveSlide(this.prev);
	},

	dispatchMouseEvent: function(target, var_args) {
		var e = document.createEvent("MouseEvents");
		e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
		target.dispatchEvent(e);
	},

	moveSlide: function(el) {
		this.dispatchMouseEvent(el, 'mouseover');
		this.dispatchMouseEvent(el, 'mousedown');
		this.dispatchMouseEvent(el, 'click');
		this.dispatchMouseEvent(el, 'mouseup');
	}

};

googleSlides.init(next, prev);
videoStream.injectVideo().setFeed(streamURL);

