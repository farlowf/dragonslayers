function get_terrain(grid_num) {
    let terrain_id = window.terrainmap[grid_num];
    let terrain_def = terrain[terrain_id] ? terrain[terrain_id] : terrain['ocean'];

    return terrain_def;
}

function draw_terrain_editor() {
    for (var grid_id in terrainmap) {
        terrain = get_terrain(grid_id);
    }
}

var terrain_squares = [];
var current_terrain = "ocean";
var show_terrain = false;

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
                    current_terrain = terrain_id;
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
        terrain_squares.push(draw_terrain_square(grid_num, terrain[current_terrain]));
    }
}


function load_terrainmap() {
    if (show_terrain){
        return;
    }
    show_terrain = true;

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
window.terrainmap = {"36236":"forest","36237":"forest","36243":"ocean","36244":"ocean","36490":"forest","36491":"forest","36492":"forest","36493":"forest","36494":"forest","36498":"ocean","36499":"ocean","36500":"ocean","36501":"ocean","36502":"ocean","36738":"plain","36739":"plain","36740":"plain","36741":"plain","36742":"plain","36743":"plain","36744":"forest","36745":"forest","36746":"forest","36747":"forest","36748":"forest","36749":"forest","36750":"forest","36751":"plain","36752":"plain","36753":"ocean","36754":"ocean","36755":"ocean","36756":"ocean","36757":"ocean","36758":"ocean","36759":"ocean","36760":"ocean","36761":"ocean","36762":"ocean","36763":"ocean","36764":"ocean","36765":"ocean","36766":"ocean","36767":"ocean","36995":"plain","36996":"plain","36997":"plain","36998":"plain","36999":"forest","37000":"forest","37001":"forest","37002":"forest","37003":"forest","37004":"forest","37005":"forest","37006":"forest","37007":"forest","37008":"forest","37009":"ocean","37010":"ocean","37011":"ocean","37012":"ocean","37013":"ocean","37014":"ocean","37015":"ocean","37016":"ocean","37017":"ocean","37018":"ocean","37019":"ocean","37020":"ocean","37021":"ocean","37022":"ocean","37252":"plain","37253":"plain","37254":"plain","37255":"forest","37256":"forest","37257":"forest","37258":"forest","37259":"forest","37260":"forest","37261":"forest","37262":"forest","37263":"forest","37264":"forest","37265":"ocean","37266":"ocean","37267":"ocean","37268":"ocean","37269":"ocean","37270":"ocean","37271":"ocean","37272":"ocean","37273":"ocean","37274":"ocean","37275":"ocean","37276":"ocean","37277":"ocean","37278":"ocean","37509":"plain","37510":"plain","37511":"forest","37512":"forest","37513":"forest","37514":"forest","37515":"forest","37516":"forest","37517":"forest","37518":"forest","37519":"forest","37520":"forest","37521":"plain","37522":"ocean","37523":"ocean","37524":"ocean","37525":"ocean","37526":"ocean","37527":"ocean","37528":"ocean","37529":"ocean","37530":"ocean","37531":"ocean","37532":"ocean","37533":"ocean","37534":"ocean","37766":"plain","37767":"plain","37768":"forest","37769":"forest","37770":"forest","37771":"forest","37772":"forest","37773":"forest","37774":"forest","37775":"forest","37776":"plain","37777":"ocean","37778":"ocean","37779":"ocean","37780":"ocean","37781":"ocean","37782":"ocean","37783":"ocean","37784":"ocean","37785":"ocean","37786":"ocean","37787":"ocean","37788":"ocean","37789":"ocean","37790":"ocean","38023":"plain","38024":"plain","38025":"plain","38026":"forest","38027":"forest","38028":"forest","38029":"forest","38030":"plain","38031":"plain","38032":"ocean","38033":"ocean","38034":"ocean","38035":"ocean","38036":"ocean","38037":"ocean","38038":"ocean","38039":"ocean","38040":"ocean","38041":"ocean","38042":"ocean","38043":"ocean","38044":"ocean","38045":"ocean","38279":"plain","38280":"plain","38281":"plain","38282":"plain","38283":"plain","38284":"plain","38285":"plain","38286":"plain","38287":"plain","38288":"ocean","38289":"ocean","38290":"ocean","38291":"ocean","38292":"ocean","38293":"ocean","38294":"ocean","38295":"ocean","38296":"ocean","38297":"ocean","38298":"ocean","38299":"ocean","38536":"plain","38537":"plain","38538":"plain","38539":"plain","38540":"plain","38541":"plain","38542":"plain","38543":"plain","38544":"plain","38545":"ocean","38546":"ocean","38547":"ocean","38548":"ocean","38549":"ocean","38550":"ocean","38551":"ocean","38552":"ocean","38553":"ocean","38554":"ocean","38793":"plain","38794":"plain","38795":"plain","38796":"plain","38797":"plain","38798":"plain","38799":"plain","38800":"plain","38801":"ocean","38802":"ocean","38803":"ocean","38804":"ocean","38805":"ocean","38806":"ocean","38807":"ocean","38808":"ocean","39050":"plain","39051":"plain","39052":"plain","39053":"plain","39054":"plain","39055":"plain","39056":"plain","39057":"plain","39058":"plain","39059":"ocean","39060":"ocean","39061":"ocean","39062":"ocean","39063":"ocean","39308":"plain","39309":"plain","39310":"plain","39311":"plain","39312":"plain","39313":"plain","39314":"plain","39315":"plain","39316":"plain","39317":"ocean","39318":"ocean","39319":"ocean","39320":"ocean","39321":"ocean","39322":"ocean","39573":"plain","39574":"plain"};