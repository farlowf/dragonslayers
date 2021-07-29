function get_terrain(grid_num) {
    let terrain_id = window.terrainmap[grid_num];
    let terrain = terrain[terrain_id] ? terrain[terrain_id] : terrain['ocean'];

    return terrain;
}

function draw_terrain_editor() {
    for (var grid_id in terrainmap) {
        terrain = get_terrain(grid_id);
    }
}

var terrain_squares = [];

function terrain_click_grid(grid_num) {
    var square_exists = false;
    for (var idx in terrain_squares) {
        let terrain_square = terrain_squares[idx];
        if (terrain_square.grid_num == grid_num) {
            square_exists = true;
            // Rotate terrain type
            let go_to_next = false
            if (terrain_square.terrain.id == 'ocean') {
                go_to_next = true;
            }
            for (var terrain_id in terrain) {
                if (go_to_next) {
                    terrain_squares[idx].destroy();
                    terrain_squares[idx] = draw_terrain_square(grid_num, terrain[terrain_id]);
                    break;
                }
                if (terrain_square.terrain.id == terrain_id) {
                    go_to_next = true;
                }
            }

            break;
        }
    }
    if (!square_exists) {
        terrain_squares.push(draw_terrain_square(grid_num, terrain['ocean']));
    }
}


function load_terrainmap() {
    for (grid_num in window.terrainmap) {
        let terrain_id = window.terrainmap[grid_num];
        terrain_squares.push(draw_terrain_square(grid_num, terrain[terrain_id]));
    }
}

function save_terrainmap() {
    for (square of terrain_squares) {
        window.terrainmap[square.grid_num] = square.terrain.id
    }

    console.log(JSON.stringify(window.terrainmap));
}

function draw_terrain_square(grid_num, terrain) {
    let { x, y } = grid_pixel_origin(grid_num);
    var terrain_square = context.add.rectangle(x, y, 16, 16, terrain.colour);
    terrain_square.alpha = 0.8;
    terrain_square.grid_num = grid_num;
    terrain_square.terrain = terrain;

    return terrain_square;
}

var terrain = {
    plain: {
        id: 'plain',
        cover: 0.0,
        enlarge: 0,
        colour: 0x76D7C4,
        need_boat: false,
    },
    grass: {
        id: 'grass',
        cover: 0.4,
        enlarge: 0,
        colour: 0xABEBC6,
        need_boat: false
    },
    mountain: {
        id: 'mountain',
        cover: 0.0,
        enlarge: 0.1,
        colour: 0xBDC3C7,
        need_boat: false
    },
    forest: {
        id: 'forest',
        cover: 1.0,
        enlarge: 0,
        colour: 0x196F3D,
        need_boat: false
    },
    ocean: {
        id: 'ocean',
        cover: 0,
        enlarge: 0,
        colour: 0x2874A6,
        need_boat: true
    }
};


// Holds terrain information for each grid item
window.terrainmap = { "38036": "ocean", "38037": "ocean", "38038": "ocean", "38039": "ocean", "38040": "ocean" };
