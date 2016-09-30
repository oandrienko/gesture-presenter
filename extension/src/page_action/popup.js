
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {

	var 
	// presentButton = document.getElementById('present'),
	notificationButton = document.getElementById('notification'),
	demoButton = document.getElementById('demo');

	function turnPurple(el) {
	  el.style.background = "purple";
	}

	// presentButton.addEventListener('click', function() {
	//   bg.gesturePresenter.start_demo();
	//   turnPurple(presentButton);
	// });

	notificationButton.addEventListener('click', function() {
	  bg.liveNotifications.start();
	  turnPurple(notificationButton);
	});

	demoButton.addEventListener('click', function() {
	  bg.gesturePresenter.start_demo();
	  turnPurple(demoButton);
	});

});