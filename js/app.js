
$(document).ready(function(){

	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	//variables
	var secretNumber, userGuess, pastGuesses, userFeedback, count, alreadyGuessed;
	//dom objects
	var $newButton = $('a.new');
	var $form = $('form');
	var $input = $form.find('#userGuess');
	var $feedback = $('#feedback');
	var $count = $('#count');
	var $guessList = $('#guessList');

	//event handlers
	// Start a new game on window load
	newGame();

	//Start a new game with new game button
	$newButton.click (function() {
		event.preventDefault();
		newGame();
	});

	// Submit Guess
	$form.submit(function(event) {
		event.preventDefault();
		userNumber();
	});

	// new game function
	function newGame() {
		resetVariables();
		render();
		$('#guessList li').detach();
		generateNumber();
		$input.val('');
	}

	// Generate a random number between 1 and 100
	function generateNumber(){
		var n = Math.floor((Math.random() * 100) + 1);
		secretNumber = +n;
	}

	//User Guess
	function userNumber() {
		// Validate guess is a number
		n = $input.val().trim();
		userGuess = +n;
		if (userGuess === parseInt(userGuess, 10)) {
			checkpastGuess();
		}
		else {
			alert("Please only enter numbers");
			$input.val('');
			return;
		}
		if (userGuess >= 101 || userGuess <= 0) {
			alert("Please enter a number between 1 & 100");
			$input.val('');
		}
	}

	//check past guesses
	function checkpastGuess() {
		$.each(pastGuesses,function(guess,value){
			if(userGuess == value){
				alreadyGuessed = true;
			}
		});
		if(alreadyGuessed){
			alreadyGuessed =false;
			alert('You guessed this number already');
			$input.val('');
			return true
		}
		else {
			compareNumbers();
			guessCount();
			guessList();
			render();
			$input.val('');
		}
	}

	//function to compare numbers
	function compareNumbers() {
		if (userGuess == secretNumber) {
			userFeedback = 'Winner! Winner! Winner! Click New Game to Play Again!';
		}
		//if userGuess - secretNumbGuess<= 10 - hot
		else if (Math.abs(userGuess - secretNumber) <= 10) {
			userFeedback = 'Hot!';
		}
		//if userGuess - secretNumber is >10 and less than 25 - warm
		else if (Math.abs(userGuess - secretNumber) > 10 && Math.abs(userGuess - secretNumber) <= 25) {
			userFeedback = 'Warm';
		}
		//if userGuess - secretNumber is >25 and less than 50 - cold
		else if (Math.abs(userGuess - secretNumber) > 25 && Math.abs(userGuess - secretNumber) <= 50) {
			userFeedback = 'Cold';
		}
		//if userGuess - secretNumber is >=50 freezing
		else if (Math.abs(userGuess - secretNumber) > 50 && Math.abs(userGuess - secretNumber) <= 100) {
			userFeedback = 'Freezing Cold';
		}
		$input.focus();
	}

	//count number of guesses
	function guessCount () {
		count++;
	}

	//keep track of numbers guessed
	function guessList() {
		pastGuesses.push(userGuess);
	}
	//render HTML
	function render () {
		$feedback.html(userFeedback);
		$guessList.append('<li>' + userGuess + '</li>');
		$count.html(count);
	}

	//reset variables
	function resetVariables() {
		count = 0;
		pastGuesses = [];
		userGuess = '';
		userFeedback = 'Make your Guess!';
	}
});


