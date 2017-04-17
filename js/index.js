//listen for keyboard input
window.addEventListener("keydown", move_player, false);

var overhead_map_canvas = document.getElementById('overhead_map');
if (overhead_map_canvas.getContext) {
	var overhead_map_context = overhead_map_canvas.getContext('2d');
}

var player_pov_canvas = document.getElementById('player_pov');
if (player_pov_canvas.getContext) {
	var player_pov_context = player_pov_canvas.getContext('2d');
}

//Map with values
var map = [
	['1', '0', '0', '1', '0', '0', '0', '0', '0', '1', '1', '0', '0'],
	['0', '0', '1', '0', '0', '0', '1', '0', '0', '1', '0', '0', '0'],
	['0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
	['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0'],
	['0', '0', '0', '1', '0', '0', '1', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '0', '1', '0', '1', '0', '1', '0', '0', '0', '0'],
	['0', '0', '0', '1', '0', '0', '0', '1', '0', '1', '0', '0', '0'],
	['0', '1', '0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0'],
	['0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1', '0'],
	['1', '1', '0', '1', '1', '1', '0', '0', '1', '1', '0', '0', '0']
];

//Players starting position
var player_pos_x = 6;
var player_pos_y = 10;
//Players starting orientation
var compass = { 'north' : 0, 'east' : 90, 'south': 180, 'west': 270 };

orientation = compass['north'];

var cone_of_vision = {
	'col_-2_row_3':'', 'col_-1_row_3':'', 'col_2_row_3':'', 'col_1_row_3':'', 'col_0_row_3':'',
	'col_-2_row_2':'', 'col_-1_row_2':'', 'col_2_row_2':'', 'col_1_row_2':'', 'col_0_row_2':'',
	'col_-2_row_1':'', 'col_-1_row_1':'', 'col_2_row_1':'', 'col_1_row_1':'', 'col_0_row_1':'',
					'col_-1_row_0':'', 			   			'col_1_row_0':''
};

init_imgs(cone_of_vision);

function create_world() {
	draw_map();
	draw_player(player_pos_x, player_pos_y, orientation);	
	draw_pov();	
}


function draw_map() {
	//Clear Contents of Previous Map Canvas
	overhead_map_context.clearRect(0, 0, overhead_map_canvas.width, overhead_map_canvas.height);
	//Give Map a White Background
	overhead_map_context.fillStyle = '#FFFFFF';
	overhead_map_context.fillRect(0, 0, overhead_map_canvas.width, overhead_map_canvas.height);

	overhead_map_context.strokeStyle = '#757374';

	var current_row = 0;
	var current_column = 0;

	for (var i=0; i < map.length; i++) {
		for (var j=0; j < map[i].length; j++) {
			if (map[i][j] == 1) {
				overhead_map_context.fillStyle = '#757374';

				overhead_map_context.fillRect(current_row, current_column, 10, 10);
			} else {
				overhead_map_context.strokeRect(current_row, current_column, 10, 10);
			}

			current_row = current_row + 10;
		}
		current_row = 0;
		current_column = current_column + 10;
	}
}

function draw_player(x, y, orientation) {
	overhead_map_context.beginPath();

	switch(orientation) {
		case 0:
			overhead_map_context.moveTo((x * 10 + 5), (y * 10 + 2)); //compass point
			overhead_map_context.lineTo((x * 10 + 2), (y * 10 + 8));
			overhead_map_context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
		case 90:
			overhead_map_context.moveTo((x * 10 + 8), (y * 10 + 5)); //compass point
			overhead_map_context.lineTo((x * 10 + 2), (y * 10 + 2));
			overhead_map_context.lineTo((x * 10 + 2), (y * 10 + 8));
			break;
		case 180:
			overhead_map_context.moveTo((x * 10 + 5), (y * 10 + 8)); //compass point
			overhead_map_context.lineTo((x * 10 + 2), (y * 10 + 2));
			overhead_map_context.lineTo((x * 10 + 8), (y * 10 + 2));
			break;
		case 270:
			overhead_map_context.moveTo((x * 10 + 2), (y * 10 + 5)); //compass point
			overhead_map_context.lineTo((x * 10 + 8), (y * 10 + 2));
			overhead_map_context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
		
		default:
			context.moveTo((x * 10 + 5), (y * 10 + 2)); //compass point
			context.lineTo((x * 10 + 2), (y * 10 + 8));
			context.lineTo((x * 10 + 8), (y * 10 + 8));
			break;
	}

	overhead_map_context.fillStyle = '#B6091A';
	overhead_map_context.fill();
	overhead_map_context.closePath();
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
			turn_player(player_move);

			break;
		case 38:
			player_move = 'forward';
			turn_player(player_move);

			break;
		case 39:
			player_move = 'right';
			turn_player(player_move);

			break;
		case 40:
			player_move = 'backward';
			turn_player(player_move);

			break;
	}

}





function draw_pov() {
	var x = player_pos_x;
	var y = player_pos_y;

	//Clear Contents of Previous Map Canvas
	player_pov_context.clearRect(0, 0, player_pov_canvas.width, player_pov_canvas.height);
	//Give Map a White Background
	player_pov_context.fillStyle = '#FFFFFF';
	player_pov_context.fillRect(0, 0, player_pov_canvas.width, player_pov_canvas.height);

	switch(orientation) {
		case 0:
			cone_of_vision = {
				'col_-2_row_3':[(y - 3), (x - 2)], 'col_-1_row_3':[(y - 3), (x - 1)], 'col_2_row_3':[(y - 3), (x + 2)], 'col_1_row_3':[(y - 3), (x + 1)], 'col_0_row_3':[(y - 3), (x)],
				'col_-2_row_2':[(y - 2), (x - 2)], 'col_-1_row_2':[(y - 2), (x - 1)], 'col_2_row_2':[(y - 2), (x + 2)], 'col_1_row_2':[(y - 2), (x + 1)], 'col_0_row_2':[(y - 2), (x)],
				'col_-2_row_1':[(y - 1), (x - 2)], 'col_-1_row_1':[(y - 1), (x - 1)], 'col_2_row_1':[(y - 1), (x + 2)], 'col_1_row_1':[(y - 1), (x + 1)], 'col_0_row_1':[(y - 1), (x)],
												   'col_-1_row_0':[(y - 0), (x - 1)], 									'col_1_row_0':[(y - 0), (x + 1)]
			};
			break;
		case 90:
			cone_of_vision = {
				'col_-2_row_3':[(y - 2), (x + 3)], 'col_-1_row_3':[(y - 1), (x + 3)], 'col_2_row_3':[(y + 2), (x + 3)], 'col_1_row_3':[(y + 1), (x + 3)], 'col_0_row_3':[(y), (x + 3)],
				'col_-2_row_2':[(y - 2), (x + 2)], 'col_-1_row_2':[(y - 1), (x + 2)], 'col_2_row_2':[(y + 2), (x + 2)], 'col_1_row_2':[(y + 1), (x + 2)], 'col_0_row_2':[(y), (x + 2)],
				'col_-2_row_1':[(y - 2), (x + 1)], 'col_-1_row_1':[(y - 1), (x + 1)], 'col_2_row_1':[(y + 2), (x + 1)], 'col_1_row_1':[(y + 1), (x + 1)], 'col_0_row_1':[(y), (x + 1)],
												   'col_-1_row_0':[(y - 1), (x + 0)], 									'col_1_row_0':[(y + 1), (x + 0)]
			};
			break;
		case 180:
			cone_of_vision = {
				'col_-2_row_3':[(y + 3), (x + 2)], 'col_-1_row_3':[(y + 3), (x + 1)], 'col_2_row_3':[(y + 3), (x + 2)], 'col_1_row_3':[(y + 3), (x - 1)], 'col_0_row_3':[(y + 3), (x)],
				'col_-2_row_2':[(y + 2), (x + 2)], 'col_-1_row_2':[(y + 2), (x + 1)], 'col_2_row_2':[(y + 2), (x + 2)], 'col_1_row_2':[(y + 2), (x - 1)], 'col_0_row_2':[(y + 2), (x)],
				'col_-2_row_1':[(y + 1), (x + 2)], 'col_-1_row_1':[(y + 1), (x + 1)], 'col_2_row_1':[(y + 1), (x + 2)], 'col_1_row_1':[(y + 1), (x - 1)], 'col_0_row_1':[(y + 1), (x)],
												   'col_-1_row_0':[(y + 0), (x + 1)], 									'col_1_row_0':[(y + 0), (x - 1)]
			};
			break;
		case 270:
			cone_of_vision = {
				'col_-2_row_3':[(y + 2), (x - 3)], 'col_-1_row_3':[(y + 1), (x - 3)], 'col_2_row_3':[(y - 2), (x - 3)], 'col_1_row_3':[(y - 1), (x - 3)], 'col_0_row_3':[(y), (x - 3)],
				'col_-2_row_2':[(y + 2), (x - 2)], 'col_-1_row_2':[(y + 1), (x - 2)], 'col_2_row_2':[(y - 2), (x - 2)], 'col_1_row_2':[(y - 1), (x - 2)], 'col_0_row_2':[(y), (x - 2)],
				'col_-2_row_1':[(y + 2), (x - 1)], 'col_-1_row_1':[(y + 1), (x - 1)], 'col_2_row_1':[(y - 2), (x - 1)], 'col_1_row_1':[(y - 1), (x - 1)], 'col_0_row_1':[(y), (x - 1)],
												   'col_-1_row_0':[(y + 1), (x - 0)], 									'col_1_row_0':[(y - 1), (x - 0)]
			};
			break;
		default:
			break;
	}
	
	for (wall_location in cone_of_vision) {

		var wall_y = cone_of_vision[wall_location][0];
		var wall_x = cone_of_vision[wall_location][1];

		
		if (map[wall_y] != null && map[wall_y][wall_x] != null && wall_y >= 0 && wall_x >= 0 ) {
			if (map[wall_y][wall_x] == 1 ) {
				place_wall(wall_location);
			}
		} else {
			place_wall(wall_location);
		}

		
	}
}

function init_imgs(imgs) {
	for (img in imgs) {
		var wall_img = new Image();
		wall_img.src = 'img/'+img+'.png';
	}
}

function place_wall(wall_location) {
	var wall_img = new Image();
	wall_img.onload = function() {
		var	y = (player_pov_canvas.height - this.height) * 0.5;
		player_pov_context.drawImage(wall_img, 0, y);
	}

	wall_img.src = 'img/'+wall_location+'.png';
}