var current = 0;
var memory = 0;
var action = "";
var eqFlag = false;

function actionIsEmpty() {
	if(action === "") return true;
	else return false;
}

function updateDisplay(value) {
	$(".text-main").empty();
	$(".text-main").text(value);
}

function clear() {
	current = 0;
	memory = 0;
	action = "";
	eqFlag = false;
}

function multiply() {
	memory *= current;
}

function divide() {
	if(current === 0) return false;
	else {
		memory = memory / current;
		return true;
	}
}

function add() {
	memory += current;
}

function subtract() {
	memory -= current;
}

function doArithmatic(input) {
	switch(action){
		case 'mul':
			multiply();
			return true;
		case 'div':
			return divide();
		case 'add':
			add();
			return true;
		case 'min':
			subtract();
			return true;
		default:
			break;
	}
}


function processNumbers(num) {
	updateDisplay("");
	if(eqFlag) {
		clear();
		current = +(num);
		updateDisplay(""+current);
		return 0;
	}
	if(current !== 0) {
		current = +(""+current+""+num);
	}
	else {
		current = current + (+num);
	}
	eqFlag = false;
	updateDisplay(""+current);
}

function processModifiers(mod) {
	if(mod === 'pm') {
		if(current === 0 && memory !== 0) {
			memory = -memory;
			updateDisplay(""+memory);
		}
		else {
			current = -current
			updateDisplay(""+current);
		}
	}
}



function processActions(input) {
	if(input === "pm") {
		processModifiers(input);
		return 0;
	}
	if(input === "cl") {
		clear();
		updateDisplay("CLEAR");
		setTimeout(function() { updateDisplay("0");},300);
		return 0;
	}
	if(input === "cm") {
		memory = 0;
		updateDisplay("Memory clear");
		setTimeout(function() {
			updateDisplay(current)
		}, 300);

		return 0;
	}
	if(actionIsEmpty()){
		if(input !== 'eq')	action = input;
		else {
			memory = current;
			updateDisplay("0");
		}
		if(memory === 0) {
			memory = current;
			current = 0;
			updateDisplay("0");

		}
		else current = 0;
		eqFlag = false;

	}
	else {
		if(input === 'eq')
			if(doArithmatic(action)){
				updateDisplay(""+memory);
				action = "";
				current = 0;
				eqFlag = true;
			}
			else {
				clear();
				updateDisplay("ERROR");
				setTimeout(function() { updateDisplay("0");},300);
				eqFlag = false;
			}
		else {
			if(doArithmatic(action)) {
				action = input;
				updateDisplay(""+memory);
				current = 0;
				eqFlag = false;
			}
			else {
				clear();
				updateDisplay("ERROR");
				setTimeout(function() { updateDisplay("0");},300);
				eqFlag = false;

			}
		}
	}
}

function parseInput(val) {
	if(val.val().match(/[0-9]/))
		processNumbers(val.val());
	else
		processActions(val.val());

}

$(document).ready(function(){

	$(":button").on("click", function() {
		parseInput($(this));
	});

});
