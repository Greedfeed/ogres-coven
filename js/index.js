//Create the small overhead map
var overhead_map_canvas = document.getElementById('overhead_map');
if (overhead_map_canvas.getContext) {
	var overhead_map_context = overhead_map_canvas.getContext('2d');
}

//Create the POV field
var hud_canvas = document.getElementById('hud');
if (hud_canvas.getContext) {
	var hud_context = hud_canvas.getContext('2d');
}

//Create the inventory field
var inventory_canvas = document.getElementById('inventory');
if (inventory_canvas.getContext) {
	var inventory_context = inventory_canvas.getContext('2d');
}

/**SET SOME INITIAL VARIABLES**/
//cardinal directions
var compass = { 'north' : 0, 'east' : 90, 'south': 180, 'west': 270 };
//Init map var
var map = [];
//Players starting position
var player_pos_x = 6;
var player_pos_y = 10;
//Players starting orientation
player_orientation = compass['north'];


//Pass in a zone to load it
function init_world(zone) {
	loadJSON("world_data/map_"+zone+".json", function(text){
		var data = JSON.parse(text);
		map = data.map_data;

		set_map(map);
	});
}

function set_map(new_map) {
	map = new_map;

	draw_game();
}

function draw_game() {
	//listen for keyboard input
	window.addEventListener("keydown", move_player, false);

	draw_map();
	draw_player_to_map(player_pos_x, player_pos_y, player_orientation);
	draw_inventory();
	draw_hud();	
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

window.onload = function() {
	startup_screen();
}

function select_option(e) {
	cursor_position = get_cursor_position(e);

	//New Game Selected
	if (cursor_position[0] >= 660 && cursor_position[0] <= 800
		&& cursor_position[1] >= 300 && cursor_position[1] <= 328) {
			document.getElementById('overhead_map').style.display = "block";
			document.getElementById('inventory').style.display = "block";
			init_world('0_1');
	}
}

function get_cursor_position(e) {
	var x;
	var y;
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	x -= hud_canvas.offsetLeft;
	y -= hud_canvas.offsetTop;

	return [x,y];
}


function draw_inventory() {
	//Clear Contents of Previous Map Canvas
	inventory_context.clearRect(0, 0, inventory_canvas.width, inventory_canvas.height);

	//Give Map a White Background
	inventory_context.fillStyle = '#FAFAFA';
	inventory_context.fillRect(0, 0, inventory_canvas.width, inventory_canvas.height);
}