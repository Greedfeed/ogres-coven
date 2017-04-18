function startup_screen() {
	// Score
	hud_context.fillStyle = "#B6091A";
	hud_context.textAlign = "center";
	hud_context.textBaseline = "top";

	hud_context.font = "48px Helvetica";
  	hud_context.strokeText('Ogre\'s Coven', hud_canvas.width * 0.5, 150);

	hud_context.font = "28px Helvetica";
  	hud_context.fillText('New Game', hud_canvas.width * 0.5, 300);
  	hud_context.strokeText('New Game', hud_canvas.width * 0.5, 300);

  	hud_context.strokeText('Continue', hud_canvas.width * 0.5, 350);

  	hud_canvas.addEventListener("click", select_option, false);
}

function draw_hud() {
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
	hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);

	//Create Pespective Lines
	hud_context.strokeStyle = "#CDCDCD";
	hud_context.beginPath();
	hud_context.moveTo(hud_canvas.width * 0.5, hud_canvas.height * 0.5);
	hud_context.lineTo(120, hud_canvas.height);
	hud_context.stroke();
	hud_context.closePath();

	hud_context.beginPath();
	hud_context.moveTo(hud_canvas.width * 0.5, hud_canvas.height * 0.5);
	hud_context.lineTo(904, hud_canvas.height);
	hud_context.stroke();
	hud_context.closePath();

	hud_context.beginPath();
	hud_context.moveTo(hud_canvas.width * 0.5, hud_canvas.height * 0.5);
	hud_context.lineTo(120, 0);
	hud_context.stroke();
	hud_context.closePath();

	hud_context.beginPath();
	hud_context.moveTo(hud_canvas.width * 0.5, hud_canvas.height * 0.5);
	hud_context.lineTo(904, 0);
	hud_context.stroke();
	hud_context.closePath();

	hud_context.fillStyle = '#CDCDCD';
	hud_context.fillRect(0, (hud_canvas.height - 70) * 0.5, hud_canvas.width, 70);

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
				'col_-2_row_3':[(y + 3), (x + 2)], 'col_-1_row_3':[(y + 3), (x + 1)], 'col_2_row_3':[(y + 3), (x - 2)], 'col_1_row_3':[(y + 3), (x - 1)], 'col_0_row_3':[(y + 3), (x)],
				'col_-2_row_2':[(y + 2), (x + 2)], 'col_-1_row_2':[(y + 2), (x + 1)], 'col_2_row_2':[(y + 2), (x - 2)], 'col_1_row_2':[(y + 2), (x - 1)], 'col_0_row_2':[(y + 2), (x)],
				'col_-2_row_1':[(y + 1), (x + 2)], 'col_-1_row_1':[(y + 1), (x + 1)], 'col_2_row_1':[(y + 1), (x - 2)], 'col_1_row_1':[(y + 1), (x - 1)], 'col_0_row_1':[(y + 1), (x)],
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
		var	y = (hud_canvas.height - this.height) * 0.5;
		hud_context.drawImage(wall_img, 0, y);
	}

	wall_img.src = 'img/'+wall_location+'.png';
}