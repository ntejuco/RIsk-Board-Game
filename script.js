$(document).ready(function() {
    setMapCoordinates();
	$('.west-australia').click(function() {
        $('.currently-selected-country').text('West Australia');
    });
	$('.east-australia').click(function() {
        $('.currently-selected-country').text('East Australia');
    });
	$('.new-guinea').click(function() {
        $('.currently-selected-country').text('New Guinea');
    });
	$('.indonesia').click(function() {
        $('.currently-selected-country').text('Indonesia');
	});
	$('.sian').click(function() {
        $('.currently-selected-country').text('Sian');
	});
	$('.india').click(function() {
        $('.currently-selected-country').text('India');
	});
	$('.china').click(function() {
        $('.currently-selected-country').text('China');
	});
	$('.mongolia').click(function() {
        $('.currently-selected-country').text('Mongolia');
	});
	$('.japan').click(function() {
        $('.currently-selected-country').text('Japan');
	});
	$('.middle-east').click(function() {
        $('.currently-selected-country').text('Middle East');
	});
});

function setMapCoordinates(){
	var gameBoardHeight = Math.round($("#game-board").height());
	var gameBoardWidth = Math.round($("#game-board").width());
	alert(String(gameBoardHeight));
}