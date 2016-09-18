var bgPage = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function() {
  var storeHistory = false;
  var historyButton = document.getElementById('history');
  var historyList = document.getElementById('historylist');
  historyButton.addEventListener('click', function() {
    bgPage.getFeed();
  });
});
