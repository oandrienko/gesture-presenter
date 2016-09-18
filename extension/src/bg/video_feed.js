var
video,
image,
canvas,
ctx;

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function dataURItoBlob(dataURI) {
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

function moveNextSlide() {
    var element = document.getElementsByClassName("goog-inline-block")[8];
    var dispatchMouseEvent = function(target, var_args) {
      var e = document.createEvent("MouseEvents");
      e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
      target.dispatchEvent(e);
    };
    dispatchMouseEvent(element, 'mouseover', true, true);
    dispatchMouseEvent(element, 'mousedown', true, true);
    dispatchMouseEvent(element, 'click', true, true);
    dispatchMouseEvent(element, 'mouseup', true, true);
}

function main() {

  video = document.createElement('video');
  document.body.appendChild(video);
  video.style.display = "inline";
  video.style.width = "225px";
  video.style.height = "180px";
  video.style.position = "absolute";
  video.style.top = "0";
  video.style.left = "0";
  video.style.zIndex = "1004";

  image = document.createElement('img');
  document.body.appendChild(image);
  image.style.display = "inline";
  image.style.width = "225px";
  image.style.height = "200px";
  image.style.position = "absolute";
  image.style.top = "200px";
  image.style.left = "0";
  image.style.zIndex = "1004";

  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.display = "inline";
  canvas.style.width = "225px";
  canvas.style.height = "200px";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1004";

  ctx = canvas.getContext('2d');



  if (hasGetUserMedia()) {

   navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 }}).then(function(localMediaStream) {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.onloadedmetadata = function(e) {
        video.play();
      };
   }).catch(function(err) {
       console.log(err.name + ": " + err.message);
   });

  } else {
   alert('getUserMedia() is not supported in your browser');
  }



}


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function initWebSockets() {
  var ws = new WebSocket("ws://localhost:8888/ws/image_stream");
  ws.onopen = function (msg) {
      console.log("Openened connection to websocket", msg);
      timer = setInterval(function () {
          ctx.drawImage(video, 0, 0, 320, 240);
          var data = canvas.toDataURL('image/jpeg', 1.0);
          newblob = dataURItoBlob(data);
          ws.send(newblob);
      }, 200);
  }
  ws.onmessage = function (msg) {
      var target = image;
      // url=window.URL.createObjectURL(msg.data);
      if (msg.data.size !== undefined) {
        console.log('Not JSON...');
      } else {
        console.log('**IS JSON...');
      }

      target.onload = function() {
          // window.URL.revokeObjectURL(url);
      };
      // target.src = url;
  }
}

main();
initWebSockets();


setInterval(function() {
 var element = document.getElementsByClassName("goog-inline-block")[8];
 var dispatchMouseEvent = function(target, var_args) {
   var e = document.createEvent("MouseEvents");
   e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
   target.dispatchEvent(e);
 };
 dispatchMouseEvent(element, 'mouseover', true, true);
 dispatchMouseEvent(element, 'mousedown', true, true);
 dispatchMouseEvent(element, 'click', true, true);
 dispatchMouseEvent(element, 'mouseup', true, true);
}, 5000);


// setTimeout(function() {
//   chrome.runtime.sendMessage({
//       method: 'GET',
//       action: 'xhttp',
//       url: 'http://localhost:8888/api/check_gesture',
//       data: 'id=7&value=7'
//   }, function(responseText) {
//       alert(responseText);
//       console.log('Response received:')
//       console.log(responseText);
//       return false;
//   });
// }, 2000);









//##############################################################################

// var constraints = { audio: false, video: { width: 1280, height: 720 } };

// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(stream) {

//   video = document.createElement('video');
//   document.body.appendChild(video);
//   video.src = window.URL.createObjectURL(stream);
//   video.style.width = "225px";
//   video.style.height = "200px";
//   video.style.position = "absolute";
//   video.style.top = "0";
//   video.style.left = "0";
//   video.style.zIndex = "1004";

//   video.onloadedmetadata = function(e) {
//     video.play();
//   };
// })
// .catch(function(err) {
//   console.log(err.name + ": " + err.message);
// });

// setInterval(function() {
// 	var element = document.getElementsByClassName("goog-inline-block")[8];
// 	var dispatchMouseEvent = function(target, var_args) {
// 	  var e = document.createEvent("MouseEvents");
// 	  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
// 	  target.dispatchEvent(e);
// 	};
// 	dispatchMouseEvent(element, 'mouseover', true, true);
// 	dispatchMouseEvent(element, 'mousedown', true, true);
// 	dispatchMouseEvent(element, 'click', true, true);
// 	dispatchMouseEvent(element, 'mouseup', true, true);
// }, 5000);

//##############################################################################


// navigator.webkitGetUserMedia({ audio: true, video: true },
//             function (stream) {
//                 mediaStream = stream;
//                 var video = document.querySelector("video");
//                 if (!video) {
// 	            	video = document.createElement('video');
// 	                document.body.appendChild(video);
// 	            }
// 				video.src = window.URL.createObjectURL(mediaStream);

// 				// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
// 				// See crbug.com/110938.
// 				video.onloadedmetadata = function(e) {
// 				// Ready to go. Do some stuff.
// 				};

//             },
//             function (error) {
//                 console.error("Error trying to get the stream:: ", error.message, error);
//             });


// function hasGetUserMedia() {
//   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//             navigator.mozGetUserMedia || navigator.msGetUserMedia);
// }

// if (hasGetUserMedia()) {
// 	var errorCallback = function(e) {
// 		console.log('Something went wrong... ', e);
// 	};

// 	// Not showing vendor prefixes.
// 	navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
// 		var video = document.querySelector('video');
//         if (!video) {
//         	video = document.createElement('video');
//             document.body.appendChild(video);
//         }
// 		video.src = window.URL.createObjectURL(localMediaStream);

// 		// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
// 		// See crbug.com/110938.
// 		video.onloadedmetadata = function(e) {
// 			// Ready to go. Do some stuff.
// 			console.log('onloadedmetadata...');
// 		};
// 	}, errorCallback);
// } else {
// 	alert('getUserMedia() is not supported in your browser');
// }