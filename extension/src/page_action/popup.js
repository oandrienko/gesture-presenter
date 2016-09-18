var storeHistory = false;
var bgPage = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function() {
  var checkNotifButton = document.getElementById('checkNotif');
  var cameraButton = document.getElementById('camera');
  checkNotifButton.addEventListener('click', function() {
    console.log('CHECK NOTIFICATIONS CLICKED');
    bgPage.getNotifications();
  }, false);
  cameraButton.addEventListener('click', function() {
    console.log('CAMERA CLICKED');
      bgPage.getVideoFeed();
  });
}, false);
