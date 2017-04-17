function draw_pov() {
	var x = player_pos_x;
	var y = player_pos_y;

	var cone_of_vision = {
		'col_-2_row_3':'', 'col_-1_row_3':'', 'col_2_row_3':'', 'col_1_row_3':'', 'col_0_row_3':'',
		'col_-2_row_2':'', 'col_-1_row_2':'', 'col_2_row_2':'', 'col_1_row_2':'', 'col_0_row_2':'',
		'col_-2_row_1':'', 'col_-1_row_1':'', 'col_2_row_1':'', 'col_1_row_1':'', 'col_0_row_1':'',
						'col_-1_row_0':'', 			   			'col_1_row_0':''
	};

	init_imgs(cone_of_vision);

	//Clear Contents of Previous Map Canvas
	player_pov_context.clearRect(0, 0, player_pov_canvas.width, player_pov_canvas.height);

	//Create Pespective Lines
	player_pov_context.strokeStyle = "#CDCDCD";
	player_pov_context.beginPath();
	player_pov_context.moveTo(player_pov_canvas.width * 0.5, player_pov_canvas.height * 0.5);
	player_pov_context.lineTo(120, player_pov_canvas.height);
	player_pov_context.stroke();
	player_pov_context.closePath();

	player_pov_context.beginPath();
	player_pov_context.moveTo(player_pov_canvas.width * 0.5, player_pov_canvas.height * 0.5);
	player_pov_context.lineTo(904, player_pov_canvas.height);
	player_pov_context.stroke();
	player_pov_context.closePath();

	player_pov_context.beginPath();
	player_pov_context.moveTo(player_pov_canvas.width * 0.5, player_pov_canvas.height * 0.5);
	player_pov_context.lineTo(120, 0);
	player_pov_context.stroke();
	player_pov_context.closePath();

	player_pov_context.beginPath();
	player_pov_context.moveTo(player_pov_canvas.width * 0.5, player_pov_canvas.height * 0.5);
	player_pov_context.lineTo(904, 0);
	player_pov_context.stroke();
	player_pov_context.closePath();

	player_pov_context.fillStyle = '#CDCDCD';
	player_pov_context.fillRect(0, (player_pov_canvas.height - 70) * 0.5, player_pov_canvas.width, 70);

	switch(player_orientation) {
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

function place_wall(wall_location) {
	var wall_img = new Image();
	wall_img.onload = function() {
		var	y = (player_pov_canvas.height - this.height) * 0.5;
		player_pov_context.drawImage(wall_img, 0, y);
	}

	wall_img.src = 'img/'+wall_location+'.png';
}