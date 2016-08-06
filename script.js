$(document).ready(function() {
    setMapCoordinates();
	$('#west-australia').click(function() {
        $('.currently-selected-country').text('West Australia');
    });
	$('#east-australia').click(function() {
        $('.currently-selected-country').text('East Australia');
    });
	$('#new-guinea').click(function() {
        $('.currently-selected-country').text('New Guinea');
    });
	$('#indonesia').click(function() {
        $('.currently-selected-country').text('Indonesia');
	});
	$('#sian').click(function() {
        $('.currently-selected-country').text('Sian');
	});
	$('#india').click(function() {
        $('.currently-selected-country').text('India');
	});
	$('#china').click(function() {
        $('.currently-selected-country').text('China');
	});
	$('#mongolia').click(function() {
        $('.currently-selected-country').text('Mongolia');
	});
	$('#japan').click(function() {
        $('.currently-selected-country').text('Japan');
	});
	$('#irkutsk').click(function() {
        $('.currently-selected-country').text('Irkutsk');
	});
	$('#kamchatka').click(function() {
        $('.currently-selected-country').text('Kamchatka');
	});
	$('#yakutsk').click(function() {
        $('.currently-selected-country').text('Yakutsk');
	});
	$('#middle-east').click(function() {
        $('.currently-selected-country').text('Middle East');
	});
	$('#afghanistan').click(function() {
        $('.currently-selected-country').text('Afghanistan');
	});
	$('#ural').click(function() {
        $('.currently-selected-country').text('Ural');
	});
	$('#siberia').click(function() {
        $('.currently-selected-country').text('Siberia');
	});
	$('#south-africa').click(function() {
        $('.currently-selected-country').text('South Africa');
	});
	$('#madagascar').click(function() {
        $('.currently-selected-country').text('Madagascar');
	});
	$('#congo').click(function() {
        $('.currently-selected-country').text('Congo');
	});
	$('#east-africa').click(function() {
        $('.currently-selected-country').text('East Africa');
	});
	$('#north-africa').click(function() {
        $('.currently-selected-country').text('North Africa');
	});
	$('#egypt').click(function() {
        $('.currently-selected-country').text('Egypt');
	});
});

$(window).resize(function () {
	setMapCoordinates();
});

function setMapCoordinates(){
	var xCoord, yCoord,
	gameBoardHeight = $("#game-board").height(),
	gameBoardWidth = $("#game-board").width(),
	imageHeight = 892,
	imageWidth = 1407,
	mapArea = Math.round(30 / imageHeight * gameBoardHeight);	
	
	xCoord = Math.round((1365 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((780 / imageHeight) * gameBoardHeight);
	$('#west-australia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1220 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((760 / imageHeight) * gameBoardHeight);
	$('#east-australia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1286 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((606 / imageHeight) * gameBoardHeight);
	$('#new-guinea').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1168 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((630 / imageHeight) * gameBoardHeight);
	$('#indonesia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1138 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((492 / imageHeight) * gameBoardHeight);
	$('#sian').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1020 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((449 / imageHeight) * gameBoardHeight);
	$('#india').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1104 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((378 / imageHeight) * gameBoardHeight);
	$('#china').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1140 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((292 / imageHeight) * gameBoardHeight);
	$('#mongolia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1280 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((297 / imageHeight) * gameBoardHeight);
	$('#japan').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1120 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((209 / imageHeight) * gameBoardHeight);
	$('#irkutsk').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1232 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((103 / imageHeight) * gameBoardHeight);
	$('#kamchatka').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1134 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((92 / imageHeight) * gameBoardHeight);
	$('#yakutsk').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((868 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((456 / imageHeight) * gameBoardHeight);
	$('#middle-east').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((942 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((317 / imageHeight) * gameBoardHeight);
	$('#afghanistan').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((962 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((200 / imageHeight) * gameBoardHeight);
	$('#ural').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((1032 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((138 / imageHeight) * gameBoardHeight);
	$('#siberia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((782 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((789 / imageHeight) * gameBoardHeight);
	$('#south-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((907 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((782 / imageHeight) * gameBoardHeight);
	$('#madagascar').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((771 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((657 / imageHeight) * gameBoardHeight);
	$('#congo').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((855 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((615 / imageHeight) * gameBoardHeight);
	$('#east-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((647 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((566 / imageHeight) * gameBoardHeight);
	$('#north-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	xCoord = Math.round((770 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((500 / imageHeight) * gameBoardHeight);
	$('#egypt').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	
	
	
	
	
}