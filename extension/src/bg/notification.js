
console.log('Creating Notification => ', comment, name, img, counter);

var element = '<div class="__gesture_present__injected-post _injected_element' + counter + '">' + 
	'<img class="__gesture_present__injected-image" src="' + img + '" />' + 
	'<p class="__gesture_present__injected-text">' + comment + ' | ' + name + '</p>' + 
	'</div>';

$('body').after(element);

setTimeout(function() {
	console.log('Removing Notification...');
	$('._injected_element'+counter).fadeOut(400, function(){ $('._injected_element'+counter).remove(); });
}, 2000);

console.log('Success, Notification displayed!');

