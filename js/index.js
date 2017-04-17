//listen for keyboard input
window.addEventListener("keydown", move_player, false);

var canvas = document.getElementById('world_map');
if (canvas.getContext) {
	var context = canvas.getContext('2d');
}

//Map with values
var map = [
	['1', '0', '0', '1', '0', '0', '0', '0', '0', '1', '1', '0', '0'],
	['0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0'],
	['0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
	['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
	['0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '1', '0', '0', '0', '1', '0', '1', '0', '0', '0'],
	['0', '1', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0'],
	['0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1', '0'],
	['1', '1', '0', '1', '1', '1', '0', '0', '1', '1', '0', '0', '0']
];

//Players starting position
var player_pos_x = 6;
var player_pos_y = 10;
//Players starting orientation
var compassOLD = ['north', 'east', 'south', 'west'];
var compass = { 'north' : 0, 'east' : 90, 'south': 180, 'west': 270 };


orientation = compass['north'];



function create_world() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	draw_grid();
	draw_player(player_pos_x, player_pos_y, orientation);		
}


function draw_grid() {
	context.strokeStyle = '#757374';

	var current_row = 0;
	var current_column = 0;

	for (var i=0; i < map.length; i++) {
		for (var j=0; j < map[i].length; j++) {
			if (map[i][j] == 1) {
				context.fillStyle = '#757374';

				context.fillRect(current_row, current_column, 10, 10);
			} else {
				context.strokeRect(current_row, current_column, 10, 10);
			}

			current_row = current_row + 10;
		}
		current_row = 0;
		current_column = current_column + 10;
	}
}

function draw_player(x, y, orientation) {
	context.beginPath();

	switch(orientation) {
		case 0:
			context.moveTo((x * 10 + 5), (y * 10 + 2)); //compass point
			context.lineTo((x * 10 + 2), (y * 10 + 8));
			context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
		case 90:
			context.moveTo((x * 10 + 8), (y * 10 + 5)); //compass point
			context.lineTo((x * 10 + 2), (y * 10 + 2));
			context.lineTo((x * 10 + 2), (y * 10 + 8));
			break;
		case 180:
			context.moveTo((x * 10 + 5), (y * 10 + 8)); //compass point
			context.lineTo((x * 10 + 2), (y * 10 + 2));
			context.lineTo((x * 10 + 8), (y * 10 + 2));
			break;
		case 270:
			context.moveTo((x * 10 + 2), (y * 10 + 5)); //compass point
			context.lineTo((x * 10 + 8), (y * 10 + 2));
			context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
		
		default:
			context.moveTo((x * 10 + 5), (y * 10 + 2)); //compass point
			context.lineTo((x * 10 + 2), (y * 10 + 8));
			context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
	}

	context.fillStyle = '#B6091A';
	context.fill();
	context.closePath();
}

function turn_player(move) {

	if (move == 'left') {
		if (orientation > 0 && orientation <= 270) {
			orientation = orientation - 90;
		} else if (orientation == 0) {
			orientation = compass["west"];
		}
	}

	if (move == 'right') {
		if (orientation >= 0 && orientation < 270) {
			orientation = orientation + 90;
		} else if (orientation == 270) {
			orientation = compass["north"];
		}
	}

	if (move == 'backward') {
		if (orientation >= 0 && orientation < 180) {
			orientation = orientation + 180;
		} else if (orientation >= 180 && orientation <= 270) {
			orientation = orientation - 180;;
		}
	}

	if (move == 'forward') {
		var new_player_pos_x = player_pos_x;
		var new_player_pos_y = player_pos_y;

		switch(orientation) {
			case 0:
				new_player_pos_y = player_pos_y - 1;
				break;
			case 90:
				new_player_pos_x = player_pos_x + 1;
				break;
			case 180:
				new_player_pos_y = player_pos_y + 1;
				break;
			case 270:
				new_player_pos_x = player_pos_x - 1;
				break;
			default:
				new_player_pos_x = player_pos_x;
				new_player_pos_y = player_pos_y;
				break;
		}

		validate_move(new_player_pos_x, new_player_pos_y)
	}

	create_world();
}

function validate_move(x, y) {
	//Make sure we haven't gone out of bounds
	if(y >= 0 && map.length > y && x >= 0 && map[y].length > x) {
		if (map[y][x] == 0) {
			player_pos_x = x;
			player_pos_y = y;
		} else {
			console.log("You've hit a wall!");
		}
	} else {
		console.log("You can't leave the map from here!");
	}
}

function move_player(e) {
	var player_move;

	switch(e.keyCode) {
		case 37:
			player_move = 'left';
			break;
		case 38:
			player_move = 'forward';
			break;
		case 39:
			player_move = 'right';
			break;
		case 40:
			player_move = 'backward';
			break;
	}

	turn_player(player_move);
}