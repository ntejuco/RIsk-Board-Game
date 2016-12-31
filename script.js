var countryArray = ["west-australia","east-australia","new-guinea","indonesia","sian","india","china","mongolia",
					"japan","irkutsk","kamchatka","yakutsk","middle-east","afghanistan","ural","siberia","south-africa",
					"madagascar","congo","east-africa","north-africa","egypt","argentina","brazil","peru","venizuela",
					"ukraine","southern-europe","northern-europe","scandinavia","western-europe","great-britain","iceland",
					"central-america","eastern-united-states","quebec","greenland","western-united-states","ontario",
					"alberta","northwest-territory","alaska"];
					
var blackCountries = [],
	whiteCountries = [],
	blueCountries = [],
	redCountries = [],
	yellowCountries = [],
	greenCountries = [];

var playerArray = [blackCountries,whiteCountries,blueCountries,redCountries,yellowCountries,greenCountries];
	
$(document).ready(function() {
	var img = document.getElementById('game-board-image');
	$(".game-board").on('load',function(){
		setMapAttributes();
		assignCountries(numberOfPlayers, countryArray);
		assignTroops(numberOfPlayers);
		displayTroops(numberOfPlayers);
	});
	getNumPlayers = true;
	errOutput = "";
	while (getNumPlayers == true){
		numberOfPlayers = prompt("Please enter the number of players (3-6)" + errOutput, 3);
		if (numberOfPlayers >= 3 && numberOfPlayers <= 6){
			getNumPlayers = false;
			setPlayerStats(numberOfPlayers);
		}
		else{
			errOutput = "\nPlease enter a number";
		}
	}
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
	$('.irkutsk').click(function() {
        $('.currently-selected-country').text('Irkutsk');
	});
	$('.kamchatka').click(function() {
        $('.currently-selected-country').text('Kamchatka');
	});
	$('.yakutsk').click(function() {
        $('.currently-selected-country').text('Yakutsk');
	});
	$('.middle-east').click(function() {
        $('.currently-selected-country').text('Middle East');
	});
	$('.afghanistan').click(function() {
        $('.currently-selected-country').text('Afghanistan');
	});
	$('.ural').click(function() {
        $('.currently-selected-country').text('Ural');
	});
	$('.siberia').click(function() {
        $('.currently-selected-country').text('Siberia');
	});
	$('.south-africa').click(function() {
        $('.currently-selected-country').text('South Africa');
	});
	$('.madagascar').click(function() {
        $('.currently-selected-country').text('Madagascar');
	});
	$('.congo').click(function() {
        $('.currently-selected-country').text('Congo');
	});
	$('.east-africa').click(function() {
        $('.currently-selected-country').text('East Africa');
	});
	$('.north-africa').click(function() {
        $('.currently-selected-country').text('North Africa');
	});
	$('.egypt').click(function() {
        $('.currently-selected-country').text('Egypt');
	});
	$('.argentina').click(function() {
        $('.currently-selected-country').text('Argentina');
	});
	$('.brazil').click(function() {
        $('.currently-selected-country').text('Brazil');
	});
	$('.peru').click(function() {
        $('.currently-selected-country').text('Peru');
	});
	$('.venizuela').click(function() {
        $('.currently-selected-country').text('Venizuela');
	});
	$('.ukraine').click(function() {
        $('.currently-selected-country').text('Ukraine');
	});
	$('.southern-europe').click(function() {
        $('.currently-selected-country').text('Southern Europe');
	});
	$('.northern-europe').click(function() {
        $('.currently-selected-country').text('Northern Europe');
	});
	$('.scandinavia').click(function() {
        $('.currently-selected-country').text('Scandinavia');
	});
	$('.western-europe').click(function() {
        $('.currently-selected-country').text('Western Europe');
	});
	$('.great-britain').click(function() {
        $('.currently-selected-country').text('Great Britain');
	});
	$('.iceland').click(function() {
        $('.currently-selected-country').text('Iceland');
	});
	$('.central-america').click(function() {
        $('.currently-selected-country').text('Central America');
	});
	$('.eastern-united-states').click(function() {
        $('.currently-selected-country').text('Eastern United States');
	});
	$('.quebec').click(function() {
        $('.currently-selected-country').text('Quebec');
	});
	$('.greenland').click(function() {
        $('.currently-selected-country').text('Greenland');
	});
	$('.western-united-states').click(function() {
        $('.currently-selected-country').text('Western United States');
	});
	$('.ontario').click(function() {
        $('.currently-selected-country').text('Ontario');
	});
	$('.alberta').click(function() {
        $('.currently-selected-country').text('Alberta');
	});
	$('.northwest-territory').click(function() {
        $('.currently-selected-country').text('Northwest Territory');
	});
	$('.alaska').click(function() {
        $('.currently-selected-country').text('Alaska');
	});
	$('#next-phase-button').click(function() {
		if ($('#reinforcements').hasClass("active")){
			$('#reinforcements').toggleClass("active");
			$('#attack').toggleClass("active");
			$('#action-on-country-indicator').text("Attack from");
			hideReinforcementsOptions();
			showAttackOptions();
		}
		else if ($('#attack').hasClass("active")){
			$('#attack').toggleClass("active");
			$('#fortification').toggleClass("active");
			$('#action-on-country-indicator').text("Fortify from");
			hideAttackOptions();
			showFortificationOptions();
		}
		else if ($('#fortification').hasClass("active")){
			$('#fortification').toggleClass("active");
			$('#reinforcements').toggleClass("active");
			$('#action-on-country-indicator').text("Add");
			hideFortificationOptions();
			showReinforcementsOptions();
		}
	});
	$('')
});

$(window).resize(function () {
	setMapAttributes();
});

function setMapAttributes(){
	var xCoord, yCoord,
	gameBoardHeight = $("#game-board-image").height(),
	gameBoardWidth = $("#game-board-image").width(),
	imageHeight = 892,
	imageWidth = 1407,
	mapArea = Math.round(30 / imageHeight * gameBoardHeight);	
	
	xCoord = Math.round((1365 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((780 / imageHeight) * gameBoardHeight);
	$('.west-australia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#west-australia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1220 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((760 / imageHeight) * gameBoardHeight);
	$('.east-australia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#east-australia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1286 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((606 / imageHeight) * gameBoardHeight);
	$('.new-guinea').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#new-guinea-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1172 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((630 / imageHeight) * gameBoardHeight);
	$('.indonesia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#indonesia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1138 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((482 / imageHeight) * gameBoardHeight);
	$('.sian').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#sian-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1030 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((449 / imageHeight) * gameBoardHeight);
	$('.india').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#india-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1104 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((378 / imageHeight) * gameBoardHeight);
	$('.china').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#china-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1140 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((292 / imageHeight) * gameBoardHeight);
	$('.mongolia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#mongolia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1287 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((292 / imageHeight) * gameBoardHeight);
	$('.japan').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#japan-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1120 / imageWidth) * gameBoardWidth);
	
	yCoord = Math.round((209 / imageHeight) * gameBoardHeight);
	$('.irkutsk').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#irkutsk-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1232 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((103 / imageHeight) * gameBoardHeight);
	$('.kamchatka').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#kamchatka-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1134 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((92 / imageHeight) * gameBoardHeight);
	$('.yakutsk').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#yakutsk-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((868 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((456 / imageHeight) * gameBoardHeight);
	$('.middle-east').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#middle-east-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((942 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((317 / imageHeight) * gameBoardHeight);
	$('.afghanistan').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#afghanistan-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((962 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((200 / imageHeight) * gameBoardHeight);
	$('.ural').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#ural-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((1032 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((138 / imageHeight) * gameBoardHeight);
	$('.siberia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#siberia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((782 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((789 / imageHeight) * gameBoardHeight);
	$('.south-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#south-africa-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((907 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((782 / imageHeight) * gameBoardHeight);
	$('.madagascar').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#madagascar-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((771 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((657 / imageHeight) * gameBoardHeight);
	$('.congo').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#congo-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((855 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((615 / imageHeight) * gameBoardHeight);
	$('.east-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#east-africa-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((655 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((540 / imageHeight) * gameBoardHeight);
	$('.north-africa').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#north-africa-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((770 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((500 / imageHeight) * gameBoardHeight);
	$('.egypt').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#egypt-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((364 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((729 / imageHeight) * gameBoardHeight);
	$('.argentina').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#argentina-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((453 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((588 / imageHeight) * gameBoardHeight);
	$('.brazil').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#brazil-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((325 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((594 / imageHeight) * gameBoardHeight);
	$('.peru').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#peru-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((328 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((494 / imageHeight) * gameBoardHeight);
	$('.venizuela').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#venizuela-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((825 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((227 / imageHeight) * gameBoardHeight);
	$('.ukraine').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#ukraine-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((718 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((355 / imageHeight) * gameBoardHeight);
	$('.southern-europe').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#southern-europe-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((702 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((284 / imageHeight) * gameBoardHeight);
	$('.northern-europe').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#northern-europe-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((705 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((155 / imageHeight) * gameBoardHeight);
	$('.scandinavia').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#scandinavia-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((607 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((384 / imageHeight) * gameBoardHeight);
	$('.western-europe').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#western-europe-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((576 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((272 / imageHeight) * gameBoardHeight);
	$('.great-britain').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#great-britain-troops').css({
		"left": Math.round(xCoord-(mapArea/2) + 15)+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((596 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((162 / imageHeight) * gameBoardHeight);
	$('.iceland').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#iceland-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((228 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((406 / imageHeight) * gameBoardHeight);
	$('.central-america').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#central-america-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2) - 15)+"px"
	})
	
	xCoord = Math.round((323 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((322 / imageHeight) * gameBoardHeight);
	$('.eastern-united-states').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#eastern-united-states-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((390 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((212 / imageHeight) * gameBoardHeight);
	$('.quebec').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#quebec-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((481 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((69 / imageHeight) * gameBoardHeight);
	$('.greenland').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#greenland-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((216 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((290 / imageHeight) * gameBoardHeight);
	$('.western-united-states').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#western-united-states-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((306 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((205 / imageHeight) * gameBoardHeight);
	$('.ontario').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#ontario-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((206 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((185 / imageHeight) * gameBoardHeight);
	$('.alberta').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#alberta-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((231 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((110 / imageHeight) * gameBoardHeight);
	$('.northwest-territory').attr('coords', xCoord + "," + yCoord + "," + mapArea);
	$('#northwest-territory-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
	
	xCoord = Math.round((82 / imageWidth) * gameBoardWidth);
	yCoord = Math.round((114 / imageHeight) * gameBoardHeight);
	$('.alaska').attr('coords', xCoord + "," + yCoord + "," + mapArea);	
	$('#alaska-troops').css({
		"left": Math.round(xCoord-(mapArea/2))+"px",
		"top" : Math.round(yCoord-(mapArea/2))+"px"
	})
}

function assignCountries(numberOfPlayers, localCountryArray){
	countriesPerPlayer = Math.floor((42 / numberOfPlayers));
	leftOverCountries = 42 % numberOfPlayers;
	remainingCountries = 42;
	for (i = 0; i < numberOfPlayers; i++){
		for (j = 0; j < countriesPerPlayer; j++){
			randomNum = Math.floor(Math.random() * remainingCountries);
			remainingCountries--;
			playerArray[i].push([[localCountryArray[randomNum]][0],0]);
			localCountryArray.splice(randomNum,1);
		}
	}
	for (i = 0; i < remainingCountries; i++){
		playerArray[i].push([[localCountryArray[randomNum]][0],0]);
	}
	for (i=0; i < numberOfPlayers; i++){
		for (j=0; j < playerArray[i].length; j++){
			currentCountry = document.getElementById(playerArray[i][j][0] + "-troops");
			if (i==0){
				currentCountry.style.color="black";
			}
			if (i==1){
				currentCountry.style.color="white";
			}
			if (i==2){
				currentCountry.style.color="blue";
			}
			if (i==3){
				currentCountry.style.color="red";
			}
			if (i==4){
				currentCountry.style.color="yellow";
			}
			if (i==5){
				currentCountry.style.color="green";
			}
		}
	}
}

function assignTroops(numberOfPlayers){
	var troopsPerPlayer;
	if (numberOfPlayers == 3){
		troopsPerPlayer = 35;
	}
	else if (numberOfPlayers == 4){
		troopsPerPlayer = 30;
	}
	else if (numberOfPlayers == 5){
		troopsPerPlayer = 25;
	}
	else if (numberOfPlayers == 6){
		troopsPerPlayer = 20;
	} 
	for (i=0; i < numberOfPlayers; i++){
		numControlledCountries = playerArray[i].length;
		troopsPerCountry = Math.floor(troopsPerPlayer / numControlledCountries);
		leftOverTroops = troopsPerPlayer % numControlledCountries;
		for (j=0; j < leftOverTroops; j++){
			playerArray[i][j][1] += 1;
		}
		for (j=0; j < numControlledCountries; j++){
			playerArray[i][j][1] += troopsPerCountry;
		}
	}
}

function displayTroops(numberOfPlayers){
	for (i=0; i < numberOfPlayers; i++){
		for (j=0; j < playerArray[i].length; j++){
			currentCountry = playerArray[i][j][0];
			document.getElementById(currentCountry + "-troops").innerHTML = playerArray[i][j][1];
		}
	}
}

function hideReinforcementsOptions(){
	$('#reinforcement-dropdown').toggleClass("hidden");
	$('#action-on-country-indicator-2').toggleClass("hidden");
	$('#reinforcements-remaining-text').toggleClass("hidden"); 
	$('#add-reinforcements-button').toggleClass("hidden");
}

function hideAttackOptions(){
	$('#attack-dropdown-country').toggleClass("hidden");
	$('#attack-dropdown-number').toggleClass("hidden");
	$('#attack-option-part-2').toggleClass("hidden");
	$('#attack-button').toggleClass("hidden");
}

function hideFortificationOptions(){
	$('#fortification-dropdown-country').toggleClass("hidden");
	$('#fortification-action-indicator-text').toggleClass("hidden");
	$('#fortification-dropdown-number').toggleClass("hidden");
}

function showReinforcementsOptions(){
	$('#reinforcement-dropdown').toggleClass("hidden");
	$('#action-on-country-indicator-2').toggleClass("hidden");
	$('#reinforcements-remaining-text').toggleClass("hidden");
	$('#add-reinforcements-button').toggleClass("hidden");
}

function showAttackOptions(){
	$('#attack-dropdown-country').toggleClass("hidden");
	$('#attack-dropdown-number').toggleClass("hidden");
	$('#attack-option-part-2').toggleClass("hidden");
	$('#attack-button').toggleClass("hidden");
}

function showFortificationOptions(){
	$('#fortification-dropdown-country').toggleClass("hidden");
	$('#fortification-dropdown-number').toggleClass("hidden");
	$('#fortification-action-indicator-text').toggleClass("hidden");
}

function setPlayerStats(numberOfPlayers){
	if (numberOfPlayers >= 3){
		$("#blue-player-elements").toggleClass("hidden");
	}
	if (numberOfPlayers >= 4){
		$("#red-player-elements").toggleClass("hidden");
	}
	if (numberOfPlayers >= 5){
		$("#yellow-player-elements").toggleClass("hidden");
	}
	if (numberOfPlayers == 6){
		$("#green-player-elements").toggleClass("hidden");
	}
}
