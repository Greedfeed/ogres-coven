function move_player(e) {
	var player_move;

	if (e.keyCode == 38 || e.keyCode == 87) { // Player holding up
		player_move = 'forward';
		turn_player(player_move);
	}
	if (e.keyCode == 40 || e.keyCode == 83) { // Player holding down
		player_move = 'backward';
		turn_player(player_move);
	}
	if (e.keyCode == 37 || e.keyCode == 65) { // Player holding left
		player_move = 'left';
		turn_player(player_move);
	}
	if (e.keyCode == 39 || e.keyCode == 68) { // Player holding right
		player_move = 'right';
		turn_player(player_move);
	}
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

function turn_player(move) {
	if (move == 'left') {
		if (player_orientation > 0 && player_orientation <= 270) {
			player_orientation = player_orientation - 90;
		} else if (player_orientation == 0) {
			player_orientation = compass["west"];
		}
	}

	if (move == 'right') {
		if (player_orientation >= 0 && player_orientation < 270) {
			player_orientation = player_orientation + 90;
		} else if (player_orientation == 270) {
			player_orientation = compass["north"];
		}
	}

	if (move == 'backward') {
		if (player_orientation >= 0 && player_orientation < 180) {
			player_orientation = player_orientation + 180;
		} else if (player_orientation >= 180 && player_orientation <= 270) {
			player_orientation = player_orientation - 180;;
		}
	}

	if (move == 'forward') {
		var new_player_pos_x = player_pos_x;
		var new_player_pos_y = player_pos_y;

		switch(player_orientation) {
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

	draw_game();
}

