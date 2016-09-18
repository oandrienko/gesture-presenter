
console.log('Example:', comment, name, img, counter);
console.log('Creating element with post...');

var element = '<div id="_injected_element' + counter + '" style="z-index: 2147483646; position: absolute; top: 0; right: 0; background: red;"><img src="' + img + '" width="50px" height="50px"/> ' + comment + ' | ' + name + ' </div>';
$('body').after(element);

setTimeout(function() {
	$('#_injected_element'+counter).remove();
}, 3000*counter);

console.log('Success, post made!');
