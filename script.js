var numberOfPlayers;
countryArray = ["west-australia","east-australia","new-guinea","indonesia","sian","india","china","mongolia",
					"japan","irkutsk","kamchatka","yakutsk","middle-east","afghanistan","ural","siberia","south-africa",
					"madagascar","congo","east-africa","north-africa","egypt","argentina","brazil","peru","venizuela",
					"ukraine","southern-europe","northern-europe","scandinavia","western-europe","great-britain","iceland",
					"central-america","eastern-united-states","quebec","greenland","western-united-states","ontario",
					"alberta","northwest-territory","alaska"];

countryGraph = [
					["east-australia", "new-guinea", "indonesia"],
					["west-australia", "new-guinea"],
					["west-australia", "east-australia", "indonesia"],
					["west-australia", "new-guinea"],
					
					["indonesia", "china", "india"],
					["sian", "china", "afghanistan", "middle-east"],
					["sian", "mongolia", "siberia", "ural", "afghanistan", "india"],
					["japan", "kamchatka", "irkutsk", "siberia", "china"],
					["mongolia", "kamchatka"],
					["mongolia", "kamchatka", "yakutsk", "siberia"],
					["mongolia", "japan", "alaska", "yakutsk", "irkutsk"],
					["irkutsk", "kamchatka", "siberia"],
					["india", "afghanistan", "ukraine", "southern-europe", "egypt", "east-africa"],
					["india", "china", "ural", "ukraine", "middle-east"],
					["afghanistan", "china", "siberia", "ukraine"],
					["china", "mongolia", "irkutsk", "yakutsk", "ural"],
					
					["madagascar", "east-africa", "congo"], //TOP CLOCKWISE FROM NOW
					["east-africa", "south-africa"],
					["east-africa", "south-africa", "north-africa"],
					["middle-east", "madagascar", "south-africa", "congo", "north-africa", "egypt"],
					["western-europe", "southern-europe", "egypt", "east-africa", "congo", "brazil"],
					["middle-east", "east-africa", "north-africa", "southern-europe"],
					
					["peru", "brazil"],
					["venizuela", "north-africa", "argentina", "peru"],
					["venizuela", "brazil", "argentina"],
					["central-america", "brazil", "peru"],
					
					["ural", "afghanistan", "middle-east", "southern-europe", "northern-europe", "scandinavia"],
					["northern-europe", "ukraine", "middle-east", "egypt", "north-africa", "western-europe"],
					["scandinavia", "ukraine", "southern-europe", "western-europe", "great-britain"],
					["ukraine", "northern-europe", "great-britain", "iceland"],
					["great-britain", "northern-europe", "southern-europe", "north-africa"],
					["iceland", "scandinavia", "northern-europe", "western-europe"],
					["greenland", "scandinavia", "great-britain"],
					
					["western-united-states", "eastern-united-states", "venizuela"],
					["ontario", "quebec", "central-america", "western-united-states"],
					["greenland", "eastern-united-states", "ontario"],
					["northwest-territory", "iceland", "quebec", "ontario"],
					["alberta", "ontario", "eastern-united-states", "central-america"],
					["greenland", "quebec", "eastern-united-states", "western-united-states", "alberta", "northwest-territory"],
					["northwest-territory", "ontario", "western-united-states", "alaska"],
					["greenland", "ontario", "alberta", "alaska"],
					["northwest-territory", "alberta", "kamchatka"]
					]
					
var	  blackCountries = []
	, whiteCountries = []
	, blueCountries = []
	, redCountries = []
	, yellowCountries = []
	, yellowCountries = []
	, greenCountries = [];

playerArray = [blackCountries,whiteCountries,blueCountries,redCountries,yellowCountries,greenCountries];
playerTurn = 0;

$(document).ready(function() {
	var boardImage = document.createElement('img');
	boardImage.onload = function(){
		numberOfPlayers = getNumberOfPlayers();
		setMapAttributes();
		setPlayerStats(numberOfPlayers);
		assignCountries(numberOfPlayers, countryArray);
		assignTroops(numberOfPlayers);
		displayTroops(numberOfPlayers);
		updatePlayerStats(numberOfPlayers);
	}
	boardImage.id = "game-board-image";
	boardImage.src = "Risk Board.jpg";
	document.getElementById("board-container").appendChild(boardImage);
	$('#black-player-elements .player-headings').toggleClass('bold');
	$('#add-reinforcements-button').click(function(){
		var remainingTroops = parseInt(document.getElementById('reinforcements-remaining-number').innerHTML);
		troopsToAdd = parseInt($('#reinforcements-num-dropdown option:selected').text());
		selectedCountry = $('#selected-country').text();
		if ((troopsToAdd <= remainingTroops) && (selectedCountry != "Select Country")){
			selectedCountry = selectedCountry.replace(/\s+/g, '-').toLowerCase();
			var i, j;
			found = false;
			for (i=0; i < numberOfPlayers; i++){
				for (j=0; j < playerArray[i].length; j++){
					if (playerArray[i][j][0] == selectedCountry){
						found = true;
						break;
					}
				}
				if (found == true){
					break;
				}
			}
			if (i == playerTurn){
				playerArray[i][j][1] += troopsToAdd;
				displayTroops(numberOfPlayers);
				updatePlayerStats(numberOfPlayers);
				document.getElementById('reinforcements-remaining-number').innerHTML = remainingTroops - troopsToAdd;
				updateLowerUI();
			} else alert("Player must add troops to a country they control");
		}
	});	
	
	$('#attack-button').click(function(){
		attackingCountry = $('#selected-country').text();
		defendingCountry = String($('#defending-country-dropdown option:selected').text());
		if (attackingCountry != "Select Country" && (defendingCountry != "Select Country")){
			attackingCountry = attackingCountry.replace(/\s+/g, '-').toLowerCase();
			defendingCountry = defendingCountry.replace(/\s+/g, '-').toLowerCase();
		}
		var i, attackingTroops;
		foundAttacking = false;
		for (i=0; i < playerArray[playerTurn].length; i++){
			if (playerArray[playerTurn][i][0] == attackingCountry){
				foundAttacking = true;
				attackingTroops = playerArray[playerTurn][i][1] - 1; //one troop must stay on attacking country
				break;
			}
		}
		foundDefending = false;
		var defendingPlayer, j, defendingTroops;
		for (defendingPlayer=0; defendingPlayer < numberOfPlayers; defendingPlayer++){
			for (j=0; j < playerArray[defendingPlayer].length; j++){
				if (playerArray[defendingPlayer][j][0] == defendingCountry){
					defendingTroops = playerArray[defendingPlayer][j][1]
					foundDefending = true;
					break;
				}
			}
			if (foundDefending == true){
				break;
			}
		}
		if ((foundAttacking == true) && (foundDefending == true) && (defendingPlayer != playerTurn)){
			defendingRoll = [];
			attackingRoll = [];
			for (var k=0; k < Math.min(defendingTroops -1,2); k++){
				defendingRoll.push(Math.floor(Math.random() * 6 + 1));
			}
			for (var k=0; k < Math.min(attackingTroops -1,3); k++){
				attackingRoll.push(Math.floor(Math.random() * 6 + 1));
				console.log("one roll");
			}
			attackingRoll.sort().reverse();
			defendingRoll.sort().reverse();
			displayRoll(attackingRoll, defendingRoll, Math.min(defendingTroops,3));
			for (var k=0; k < Math.min(attackingRoll.length, defendingRoll.length); k++){
				if (attackingRoll[0] > defendingRoll[0]){
					playerArray[defendingPlayer][j][1] -= 1;
				}
				else{
					playerArray[playerTurn][i][1] -= 1;
					attackingTroops --;
				}
				attackingRoll.splice(0,1);
				defendingRoll.splice(0,1);	
				if (playerArray[defendingPlayer][j][1] <= 0){
					playerArray[playerTurn].push([playerArray[defendingPlayer][j][0],attackingTroops]);
					playerArray[playerTurn][i][1] -= attackingTroops;
					playerArray[defendingPlayer].splice(j,1);
					conqueredCountry = document.getElementById(playerArray
										[playerTurn][playerArray[playerTurn].length - 1][0] + "-troops");
					conqueredCountry.style.color=getCurrentPlayerColor();
				}
				displayTroops(numberOfPlayers);
				updatePlayerStats(numberOfPlayers);
				updateNumDropdown();
			}
		}
		else if (defendingPlayer == playerTurn) alert("Player must not attack a country they control");
		else alert("Current player must select a country that they control");
	});
	
	$('#fortify-button').click(function(){
		originCountry = $('#selected-country').text();
		if (originCountry != "Select Country"){
			originCountryIndex = findIndexOfPlayerCountry(playerTurn, convertToSearchString([originCountry])[0]);
			destCountry = [String($('#fortify-country-dropdown option:selected').text())];
			destCountry = convertToSearchString(destCountry)[0];
			destCountryIndex = findIndexOfPlayerCountry(playerTurn, destCountry);
			numTroops = Number($('#fortify-num-dropdown option:selected').text());
			playerArray[playerTurn][originCountryIndex][1] -= numTroops;
			playerArray[playerTurn][destCountryIndex][1] += numTroops;
			displayTroops(numberOfPlayers);
			nextPhase();
		} else alert("Select a country");
	});
	
	$('.image').click(function(){
		document.getElementById('attackers-roll').innerHTML = "";
		document.getElementById('defenders-roll').innerHTML = "";
		updateLowerUI();
	});
	setMapBounderies();
	$('#next-phase-button').click(function(){nextPhase();});
	$('#reset-button').click(function(){location.reload()});
});

$(window).resize(function () {
	setMapAttributes();
});

function nextPhase() {
	if ($('#reinforcements').hasClass("active")){
		$('#reinforcements').toggleClass("active");
		$('#attack').toggleClass("active");
		hideReinforcementsOptions();
		showAttackOptions();
	}
	else if ($('#attack').hasClass("active")){
		$('#attack').toggleClass("active");
		$('#fortification').toggleClass("active");
		hideAttackOptions();
		showFortificationOptions();
	}
	else if ($('#fortification').hasClass("active")){
		$('#fortification').toggleClass("active");
		$('#reinforcements').toggleClass("active");
		hideFortificationOptions();
		showReinforcementsOptions();
		document.getElementById('reinforcements-remaining-number').innerHTML = calculateReinforcements();
		nextTurn(numberOfPlayers);
	}
	updateNumDropdown(0);
	updateCountryDropdown();
	updateLowerUI();
}

function getNumberOfPlayers(){
	var errOutput = "";
	while (true){
		numberOfPlayers = prompt("Please enter the number of players (3-6)" + errOutput, 3);
		if (numberOfPlayers >= 3 && numberOfPlayers <= 6){
			return parseInt(numberOfPlayers);
		}
		else{
			errOutput = "\nPlease enter a number";
		}
	}
}

function nextTurn(numberOfPlayers){
	previousTurn = playerTurn;
	playerTurn += 1;
	playerTurn = playerTurn % numberOfPlayers;
	toggleBold(previousTurn);
	toggleBold(playerTurn);
}

function toggleBold(playerNumber){
	switch(playerNumber){
		case(0):
			$('#black-player-elements .player-headings').toggleClass('bold');
			break;
		case(1):
			$('#white-player-elements .player-headings').toggleClass('bold');
			break;
		case(2):
			$('#blue-player-elements .player-headings').toggleClass('bold');
			break;
		case(3):
			$('#red-player-elements .player-headings').toggleClass('bold');
			break;
		case(4):
			$('#yellow-player-elements .player-headings').toggleClass('bold');
			break;
		case(5):
			$('#green-player-elements .player-headings').toggleClass('bold');
			break;
		}
}

function updateLowerUI(){
	selectedCountry = $('#selected-country').text();
	if (selectedCountry != "Select Country"){
		selectedCountry = selectedCountry.replace(/\s+/g, '-').toLowerCase();
		var i, j;
			found = false;
			for (i=0; i < numberOfPlayers; i++){
				for (j=0; j < playerArray[i].length; j++){
					if (playerArray[i][j][0] == selectedCountry){
						found = true;
						break;
					}
				}
				if (found == true){
					break;
				}
			}
		activeTroops = findActiveTroops(playerArray[i][j][1]); //-1 as one troop in country must stay
		updateNumDropdown(activeTroops);
		updateCountryDropdown();
	}
}
function updateCountryDropdown(){
	if (!$('#attack-lower-UI').hasClass('hidden')){
		$('#defending-country-dropdown').empty();
		selectedCountry = $('#selected-country').text();
		if (selectedCountry != "Select Country"){
			selectedCountry = selectedCountry.replace(/\s+/g, '-').toLowerCase();
			j = findCountryIndex(selectedCountry);
			for (var k=0; k<countryGraph[j].length; k++){
				neighbour = countryGraph[j][k];
				neighbour = neighbour.replace(/-+/g, ' ');			
				neighbour = neighbour.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				var neighbourCountry = $('<option></option>').attr("value", "option value").text(neighbour);
				$('#defending-country-dropdown').append(neighbourCountry);
			}
		}
	
	
	} else if (!$('#fortification-lower-UI').hasClass('hidden')){
		$('#fortify-country-dropdown').empty();
		if (selectedCountry != "Select Country"){
			selectedCountry = selectedCountry.replace(/\s+/g, '-').toLowerCase();
			connectedCountries = findConnectedCountries(selectedCountry);
			displayStrings = convertToDisplay(connectedCountries);
			displayStrings.forEach(function(element){
				var neighbourCountry = $('<option></option>').attr("value", "option value").text(element);
					$('#fortify-country-dropdown').append(neighbourCountry);
			});	
		}
	}
}

function updateNumDropdown(activeTroops){
	var prevSelectedNum;
	if (!$('#reinforcements-lower-UI').hasClass('hidden')){
		if ($('#reinforcements-num-dropdown option').length > 1){
			prevSelectedNum = Number($('#reinforcements-num-dropdown option:selected').text());
		} else prevSelectedNum = 1;
		activeTroops = $('#reinforcements-remaining-number').text();
		changeNumDropdown($('#reinforcements-num-dropdown'), activeTroops, prevSelectedNum);
	} else if (!$('#attack-lower-UI').hasClass('hidden')){
		if ($('#attack-force-num-dropdown option').length > 1){
			prevSelectedNum = Number($('#attack-force-num-dropdown option:selected').text());
		} else prevSelectedNum = 1;
		changeNumDropdown($('#attack-force-num-dropdown'), activeTroops, prevSelectedNum);
	
	} else if (!$('#fortification-lower-UI').hasClass('hidden')){
		if ($('#fortify-num-dropdown option').length > 1){
			prevSelectedNum = Number($('#fortify-num-dropdown option:selected').text());
		} else prevSelectedNum = 1;
		changeNumDropdown($('#fortify-num-dropdown'), activeTroops, prevSelectedNum);
	}
}

function changeNumDropdown(dropdown, activeTroops, prevSelectedNum){
	dropdown.empty();
	for (var i=1; i <= activeTroops; i++){
		var option = $('<option></option>').attr("value", "option value").text(i);
		if (i == Math.min(prevSelectedNum, activeTroops)){
			option.attr("selected", "selected");
		}
		dropdown.append(option);
	}
}

function findCountryIndex(country){
	country = country.replace(/\s+/g, '-').toLowerCase();
	var i;
		for (i=0; i<countryArray.length; i++){
			if (countryArray[i] == country){
				break;
			}
		}
	return i;
}

function setMapAttributes(){
	countryCoordArray = [["west-australia", 1220, 760],["east-australia", 1365, 780],["new-guinea", 1286, 606],["indonesia", 1172, 630],
	["sian", 1138, 482],["india", 1030, 449],["china", 1104, 378],["mongolia", 1140, 292],["japan", 1287, 292],["irkutsk", 1120, 209],
	["kamchatka", 1232, 103],["yakutsk", 1134, 92],["middle-east", 868, 456],["afghanistan", 942, 317],["ural", 962, 200],
	["siberia", 1032, 138],["south-africa", 782, 789],["madagascar", 907, 782],["congo", 771, 657],["east-africa", 855, 615],
	["north-africa", 655, 540],["egypt", 770, 500],["argentina", 364, 729],["brazil", 453, 588],["peru", 325, 594],["venizuela", 328, 494],
	["ukraine", 825, 227],["southern-europe", 718, 355],["northern-europe", 702, 284],["scandinavia", 705, 155],["western-europe", 607, 384],
	["great-britain", 576, 272],["iceland", 596, 162],["central-america", 228, 406],["eastern-united-states", 323, 322],["quebec", 390, 212],
	["greenland", 481, 69],["western-united-states", 216, 290],["ontario", 306, 205],["alberta", 206, 185],["northwest-territory", 231, 110],
	["alaska", 82, 114]];
	var xCoord, yCoord,
	gameBoardHeight = $("#game-board-image").height(),
	gameBoardWidth = $("#game-board-image").width(),
	imageHeight = 892,
	imageWidth = 1407,
	mapArea = Math.round(30 / imageHeight * gameBoardHeight);	
	countryCoordArray.forEach(function(element){
		countryName = convertToDisplay([element[0]])[0];
		xCoord = Math.round((element[1] / imageWidth) * gameBoardWidth);
		yCoord = Math.round((element[2] / imageHeight) * gameBoardHeight);
		$(("." + element[0])).attr('coords', xCoord + "," + yCoord + "," + mapArea);
		$(('#' + element[0] + "-troops")).css({
			"left": Math.round(xCoord-(mapArea/2))+"px",
			"top" : Math.round(yCoord-(mapArea/2))+"px"
		})
	});
}

function assignCountries(numberOfPlayers){
	var localCountryArray = countryArray.slice();
	var countriesPerPlayer = Math.floor((42 / numberOfPlayers));
	var leftOverCountries = 42 % numberOfPlayers;
	var remainingCountries = 42;
	for (var i=0; i < numberOfPlayers; i++){
		for (var j=0; j < countriesPerPlayer; j++){
			randomNum = Math.floor(Math.random() * remainingCountries);
			remainingCountries--;
			playerArray[i].push([[localCountryArray[randomNum]][0],0]);
			localCountryArray.splice(randomNum,1);
		}
	}
	for (var i=0; i < remainingCountries; i++){
		randomNum = Math.floor(Math.random() * remainingCountries)
		playerArray[i].push([[localCountryArray[randomNum]][0],0]);
	}
	for (var i=0; i < numberOfPlayers; i++){
		for (var j=0; j < playerArray[i].length; j++){
			currentCountry = document.getElementById(playerArray[i][j][0] + "-troops");
			switch(i){
				case 0:
					currentCountry.style.color="black";
					break;
				case 1:
					currentCountry.style.color="white";
					break;
				case 2:
					currentCountry.style.color="blue";
					break;
				case 3:
					currentCountry.style.color="red";
					break;
				case 4:
					currentCountry.style.color="yellow";
					break;
				case 5:
					currentCountry.style.color="green";
					break;
			}
		}
	}
}

function assignTroops(numberOfPlayers){
	var troopsPerPlayer;
	switch(numberOfPlayers){
		case 3:
			troopsPerPlayer = 35;
			break;
		case 4:
			troopsPerPlayer = 30;
			break;
		case 5:
			troopsPerPlayer = 25;
			break;
		case 6:
			troopsPerPlayer = 20;
			break;
		default:
			break;
	}
	for (var i=0; i < numberOfPlayers; i++){
		numControlledCountries = playerArray[i].length;
		troopsPerCountry = Math.floor(troopsPerPlayer / numControlledCountries);
		leftOverTroops = troopsPerPlayer % numControlledCountries;
		for (var j=0; j < leftOverTroops; j++){
			playerArray[i][j][1] += 1;
		}
		for (var j=0; j < numControlledCountries; j++){
			playerArray[i][j][1] += troopsPerCountry;
		}
	}
}

function displayTroops(numberOfPlayers){
	for (var i=0; i < numberOfPlayers; i++){
		for (var j=0; j < playerArray[i].length; j++){
			currentCountry = playerArray[i][j][0];
			document.getElementById(currentCountry + "-troops").innerHTML = playerArray[i][j][1];
		}
	}
}

function hideReinforcementsOptions(){
	$('#reinforcements-lower-UI').toggleClass("hidden");
}

function hideAttackOptions(){
	$('#attack-lower-UI').toggleClass("hidden");
}

function hideFortificationOptions(){
	$('#fortification-lower-UI').toggleClass("hidden");
}

function showReinforcementsOptions(){
	$('#reinforcements-lower-UI').toggleClass("hidden");
}

function showAttackOptions(){
	$('#attack-lower-UI').toggleClass("hidden");
}

function showFortificationOptions(){
	$('#fortification-lower-UI').toggleClass("hidden");
}

function setPlayerStats(numberOfPlayers){
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

function updatePlayerStats(numberOfPlayers){
	for (var i=0; i < numberOfPlayers; i++){
		currentPlayerCountries = playerArray[i].length;
		currentPlayerTroops = 0;
		for (var j=0; j < currentPlayerCountries; j++){
			currentPlayerTroops += playerArray[i][j][1];
		}
		switch(i){
			case 0:
				statsCountryID = document.getElementById("black-countries");
				statsTroopsID = document.getElementById("black-troops");
				break;
			case 1:
				statsCountryID = document.getElementById("white-countries");
				statsTroopsID = document.getElementById("white-troops");
				break;
			case 2:
				statsCountryID = document.getElementById("blue-countries");
				statsTroopsID = document.getElementById("blue-troops");
				break;
			case 3:
				statsCountryID = document.getElementById("red-countries");
				statsTroopsID = document.getElementById("red-troops");
				break;
			case 4:
				statsCountryID = document.getElementById("yellow-countries");
				statsTroopsID = document.getElementById("yellow-troops");
				break;
			case 5:
				statsCountryID = document.getElementById("green-countries");
				statsTroopsID = document.getElementById("green-troops");
				break;
		}
		statsCountryID.innerHTML = currentPlayerCountries;
		statsTroopsID.innerHTML = currentPlayerTroops;
	}
}

function calculateReinforcements(){
	return 10;
}

function getCurrentPlayerColor(){
	switch(playerTurn){
		case 0:
			return "black";
		case 1:
			return "white";
		case 2:
			return "blue";
		case 3:
			return "red";
		case 4:
			return "yellow";
		case 5:
			return "green";
	}
}
	
	
function displayRoll(attackingRoll, defendingRoll, attackingDie){
	var attackingRollDisplay = document.getElementById("attackers-roll");
	var defendingRollDisplay = document.getElementById("defenders-roll");
	attackingRollDisplay.innerHTML = attackingRoll;
	defendingRollDisplay.innerHTML = defendingRoll;
}

function findConnectedCountries(originCountry){
	var originIndex;
	var connectedCountries = [];
	var unprocessedCountries = [];
	unprocessedCountries.push(originCountry.replace(/\s+/g, '-').toLowerCase());
	while (unprocessedCountries.length > 0){
		workingCountry = unprocessedCountries.pop();
		workingCountryIndex = findCountryIndex(workingCountry);
		for (var i=0; i<countryGraph[workingCountryIndex].length; i++){
			neighbour = countryGraph[workingCountryIndex][i];
			for (var j=0; j<playerArray[playerTurn].length; j++){
				if (playerArray[playerTurn][j][0] == neighbour && 
					connectedCountries.indexOf(neighbour) == -1){
					connectedCountries.push(neighbour);
					unprocessedCountries.push(neighbour);
				}
			}
		}
	}
	return connectedCountries;
}

function convertToDisplay(unprocessedStrings){
	var processedStrings = [];
	unprocessedStrings.forEach(function(element){
		element = element.replace(/-+/g, ' ');
		element = element.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	processedStrings.push(element);	
	});
	return processedStrings;
}

function convertToSearchString(unprocessedStrings){
	var processedStrings = []
	unprocessedStrings.forEach(function(element){
		processedStrings.push(element.replace(/\s+/g, '-').toLowerCase());
	});
	return processedStrings;
}

function findActiveTroops(country){
	var i, j;
	var found = false;
	for (i=0; i < numberOfPlayers; i++){
		for (j=0; j < playerArray[i].length; j++){
			if (playerArray[i][j][0] == selectedCountry){
				found = true;
				break;
			}
		}
		if (found == true){
			break;
		}
	}
	return playerArray[i][j][1] - 1; //-1 as one troop must stay on country
}

function findIndexOfPlayerCountry(playerIndex, country){
	for (i=0; i<playerArray[playerIndex].length; i++){
		if (playerArray[playerIndex][i][0] == country){
			return i;
		}
	}
}

function getActiveTroops(playerIndex, country){
	var countryIndex = findIndexOfPlayerCountry(playerIndex, country);
	return (playerArray[playerIndex][countryIndex][1] - 1);
}

function setMapBounderies(){
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
}
