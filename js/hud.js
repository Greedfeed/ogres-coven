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

function select_option(e) {
	cursor_position = get_cursor_position(e);

	//New Game Selected
	if (cursor_position[0] >= 660 && cursor_position[0] <= 800
		&& cursor_position[1] >= 300 && cursor_position[1] <= 328) {
			document.getElementById('overhead_map').style.display = "block";
			document.getElementById('inventory').style.display = "block";
			init_world('0_0');

  		hud_canvas.removeEventListener("click", select_option, false);
	}
}

function draw_hud() {
	var x = player_pos_x;
	var y = player_pos_y;
	var cone_of_vision;

	//Clear Contents of Previous Map Canvas
	hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);

	//Create Pespective Lines
	hud_context.strokeStyle = "#CDCDCD";

	//Ceiling Perspective Lines
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, 120, hud_canvas.height)
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, 120, 0)

	//Floor Perspective Lines
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, 904, hud_canvas.height)
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, 904, 0)
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, hud_canvas.width, 561)
	draw_line(hud_context, hud_canvas.width * 0.5, hud_canvas.height * 0.5, 0, 561)

	//Floor grid
	draw_line(hud_context, 0, 656, hud_canvas.width, 656)
	draw_line(hud_context, 0, 539, hud_canvas.width, 539)
	draw_line(hud_context, 0, 479, hud_canvas.width, 479)

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
	
	for (entity_location in cone_of_vision) {

		var entity_y = cone_of_vision[entity_location][0];
		var entity_x = cone_of_vision[entity_location][1];

		if (map[entity_y] != null && map[entity_y][entity_x] != null && entity_y >= 0 && entity_x >= 0 ) {
			//Determine the object to place
			switch(map[entity_y][entity_x]) {
				case '1':
					place_entity(entity_location);
					break;
				case '2':
					if (entities[entity_y+'_'+entity_x] == null) {
						console.log('Incorrect placement on map, use:'+entity_y+'_'+entity_x);
					}

					entity_img_path = entities[entity_y+'_'+entity_x].img_path;

					place_entity(entity_img_path, entity_location);
					break;
			}
		} else {
			place_entity(entity_location);
		}

	}
}

function place_entity(img_location, coords) {
	var hud_img = new Image();

	if (coords != null) {
		var coords_array = coords.split("_");
		var coords_x = coords_array[1];
		var coords_y = coords_array[3];

		hud_img.onload = function() {
			//center this image
			var	y = (hud_canvas.height - (1/coords_y)*this.height) * 0.5;
			var	x = (hud_canvas.width - (1/coords_y)*this.width) * 0.5;

			if (coords_x == -2) {
				x =  ((hud_canvas.width - (1/coords_y)*this.width) * 0.5) - (((1/coords_y)*this.width)*2.75);
			} else if (coords_x == -1) {
				x =  ((hud_canvas.width - (1/coords_y)*this.width) * 0.5) - (((1/coords_y)*this.width)*1.35);
			} else if (coords_x == 1) {
				x =  ((hud_canvas.width - (1/coords_y)*this.width) * 0.5) + (((1/coords_y)*this.width)*1.35);
			} else if (coords_x == 2) {
				x =  ((hud_canvas.width - (1/coords_y)*this.width) * 0.5) + (((1/coords_y)*this.width)*2.75);
			}

			hud_context.drawImage(hud_img, x, y, (1/coords_y)*this.width,  (1/coords_y)*this.height);
		}
	} else {
		hud_img.onload = function() {
			var	y = (hud_canvas.height - this.height) * 0.5;
			hud_context.drawImage(hud_img, 0, y);
		}
	}

	hud_img.src = 'img/'+img_location+'.png';

}