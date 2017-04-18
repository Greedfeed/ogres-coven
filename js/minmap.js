function draw_map() {
	map = map; 
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

function draw_player_to_map(x, y, orientation) {
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