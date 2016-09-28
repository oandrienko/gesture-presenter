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

function main() {

  video = document.createElement('video');
  document.body.appendChild(video);
  video.style.display = "inline";
  video.style.visibility = "hidden";
  video.style.width = "325px";
  video.style.height = "200px";
  video.style.position = "absolute";
  video.style.top = "0";
  video.style.left = "0";

  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.display = "inline";
  canvas.style.visibility = "hidden";
  canvas.style.width = "325px";
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

var delayCount = false;
var isStill = true;
var limit = 100;
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
      if (msg.data.size !== undefined) {
        // console.log('Not JSON...');
        url=window.URL.createObjectURL(msg.data);

        target.onload = function() {
          window.URL.revokeObjectURL(url);
        };
        // target.src = url;

      } else {
        var data = JSON.parse(msg.data);
        // console.log('dir, dX, mv => ', data.dir, data.dX, data.mv);

        if(!delayCount && !isStill) {

          if (data.dX > limit) {
            nextSlide();
            delayCount = true;
            setTimeout(function(){ delayCount = false; }, 10000);
          } else if (data.dX < -limit) {
            prevSlide();
            delayCount = true;
            setTimeout(function(){ delayCount = false; }, 10000);
          }

        }


      }
  }
}

var nextSlide = function() {
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
};

var prevSlide = function() {
  var element = document.getElementsByClassName("goog-inline-block")[2];
  var dispatchMouseEvent = function(target, var_args) {
    var e = document.createEvent("MouseEvents");
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
  };
  dispatchMouseEvent(element, 'mouseover', true, true);
  dispatchMouseEvent(element, 'mousedown', true, true);
  dispatchMouseEvent(element, 'click', true, true);
  dispatchMouseEvent(element, 'mouseup', true, true);
};

main();
initWebSockets();
