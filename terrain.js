function get_terrain(grid_num) {
    let terrain_id = window.terrainmap[grid_num];
    let terrain = terrain[terrain_id] ? terrain[terrain_id] : terrain['ocean'];

    return terrain;
}

var terrain = {
    plain: {
        id: 'plain',
        cover: 0.0,
        enlarge: 0,
        colour: "LawnGreen",
        need_boat: false,
    },
    grass: {
        id: 'grass',
        cover: 0.4,
        enlarge: 0,
        colour: "SpringGreen",
        need_boat: false
    },
    mountain: {
        id: 'mountain',
        cover: 0.0,
        enlarge: 0.1,
        colour: "white",
        need_boat: false
    },
    forest: {
        id: 'forest',
        cover: 1.0,
        enlarge: 0,
        colour: "ForestGreen",
        need_boat: false
    },
    ocean: {
        id: 'ocean',
        cover: 0,
        enlarge: 0,
        colour: "blue",
        need_boat: true
    }
};


// Holds terrain information for each grid item
var terrainmap = {};
