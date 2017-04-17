var overhead_map_canvas = document.getElementById('overhead_map');
if (overhead_map_canvas.getContext) {
	var overhead_map_context = overhead_map_canvas.getContext('2d');
}

var player_pov_canvas = document.getElementById('player_pov');
if (player_pov_canvas.getContext) {
	var player_pov_context = player_pov_canvas.getContext('2d');
}

var compass = { 'north' : 0, 'east' : 90, 'south': 180, 'west': 270 };

var map;

//Players starting position
var player_pos_x = 6;
var player_pos_y = 10;

//Players starting orientation
player_orientation = compass['north'];

function init_world() {
	loadJSON("world_data/map_0_1.json", function(text){
		var data = JSON.parse(text);
		map = data.map_data;

		draw_map(map);
		draw_player_to_map(player_pos_x, player_pos_y, player_orientation);	
		draw_pov();	
	});
}

function create_world() {
	draw_map(map);
	draw_player_to_map(player_pos_x, player_pos_y, player_orientation);	
	draw_pov();	
}

function init_imgs(imgs) {
	for (img in imgs) {
		var wall_img = new Image();
		wall_img.src = 'img/'+img+'.png';
	}
}


function loadJSON(file, callback) {
    var json_file = new XMLHttpRequest();
    json_file.overrideMimeType("application/json");
    json_file.open("GET", file, true);
    json_file.onreadystatechange = function() {
        if (json_file.readyState === 4 && json_file.status == "200") {
            callback(json_file.responseText);
        }
    }
    json_file.send(null);
}