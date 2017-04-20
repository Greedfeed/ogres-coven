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
//Init map variables
var map = [];
var entities;
//Players starting position
var player_pos_x = 6;
var player_pos_y = 10;
//Players starting orientation
player_orientation = compass['north'];
//Players cone of vision, I'm not happy with how I'm handling this so far, but for now it's the best I can think of
var cone_of_vision = {
	'col_-2_row_3':'', 'col_-1_row_3':'', 'col_2_row_3':'', 'col_1_row_3':'', 'col_0_row_3':'',
	'col_-2_row_2':'', 'col_-1_row_2':'', 'col_2_row_2':'', 'col_1_row_2':'', 'col_0_row_2':'',
	'col_-2_row_1':'', 'col_-1_row_1':'', 'col_2_row_1':'', 'col_1_row_1':'', 'col_0_row_1':'',
					   'col_-1_row_0':'', 			   		'col_1_row_0':''
};

//Pass in a zone to load it
function init_world(zone) {
	loadJSON("world_data/map_"+zone+".json", function(text){
		var data = JSON.parse(text);
		map_data = data;

		set_map(map_data);
	});
}

function set_map(map_data) {
	map = map_data.map;
	entities = map_data.entities;
	draw_game();
}

function draw_game() {
	//listen for keyboard input
	window.addEventListener("keydown", move_player, false);
	
	init_imgs(cone_of_vision);

	var sprites = {};
	for (entity in entities) {
		sprites[entities[entity].img_path] = '';
	}
	init_imgs(sprites);


	draw_mini_map();
	draw_player_to_map(player_pos_x, player_pos_y, player_orientation);
	draw_inventory();
	draw_hud();
}

function init_imgs(imgs) {
	for (img in imgs) {
		var hud_img = new Image();
		hud_img.src = 'img/'+img+'.png';
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

function draw_line(context, start_x, start_y, end_x, end_y) {
	context.beginPath();
	context.moveTo(start_x, start_y);
	context.lineTo(end_x, end_y);
	context.stroke();
	context.closePath();
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