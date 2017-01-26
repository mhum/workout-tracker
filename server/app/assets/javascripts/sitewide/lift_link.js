$(document).ready(function() {
	$('td.lift-edit').click(function() {
		$(location).attr('href', $(this).attr('rel'));
	});
});