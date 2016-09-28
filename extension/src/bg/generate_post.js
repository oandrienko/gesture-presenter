
console.log('Example:', comment, name, img, counter);
console.log('Creating element with post...');

var element = '<div class="_injected_element' + counter + '" style="z-index: 2147483646; position: absolute; top: 20px; right: 20px; background: white; height: 90px; width: 350px; font-size: 20px;"><img style="float:left;" src="' + img + '" width="90px" height="90px" /><p style="font-family: Arial, sans-serif; float:left; width: 300px; margin-left: 120px; position: absolute;">' + comment + ' | ' + name + '</p></div>';
$('body').after(element);

setTimeout(function() {
	console.log('remove now...');
	$('._injected_element'+counter).fadeOut(400, function(){ $('._injected_element'+counter).remove(); });
}, 2000);

console.log('Success, post made!');

