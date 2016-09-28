var bgPage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {

  var notificationButton = document.getElementById('notification');
  var demoButton = document.getElementById('demo');
  var presentButton = document.getElementById('present');

  presentButton.addEventListener('click', function() {
    bgPage.getFeed();
    presentButton.style.background = "purple";
  });

  notificationButton.addEventListener('click', function() {
    bgPage.getNotifications();
    notificationButton.style.background = "purple";
  });

  demoButton.addEventListener('click', function() {
    bgPage.getVideoFeed();
    demoButton.style.background = "purple";
  });

});
