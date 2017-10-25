findWay = function(creep, verbose){

    if(!verbose){
        if(!creep.memory.state) {
            creep.memory.state = 'One';
        }

        switch(creep.memory.state) {
            case 'One':
                creep.moveTo(Game.flags['One']);
                if(creep.pos.toString() == Game.flags['One'].pos.toString()){
                    creep.memory.state = 'Four';
                }
                break;
            case 'Four':
                creep.moveTo(Game.flags['Four']);
                if(creep.pos.toString() == Game.flags['Four'].pos.toString()){
                    creep.memory.state = 'Five';
                }
                break;
            case 'Five':
                creep.moveTo(Game.flags['Five']);
                if(creep.pos.toString() == Game.flags['Five'].pos.toString()){
                    creep.memory.state = 'Want';
                }
                break;
            case 'Want':
                creep.moveTo(Game.flags['Want']);
                break;
        }
    }


    /*if(!verbose){
        const route = Game.map.findRoute(creep.room, Game.room['W49S27'], {
            routeCallback(roomName, fromRoomName) {
        if(roomName == 'W48S26') {    // avoid this room
            return Infinity;
        }
        return 1;
    }});
    console.log(route);
    } */

    if(verbose){
        let from = new RoomPosition(25, 25, 'W43S27');
        let to = new RoomPosition(25, 25, 'W49S27');

        // Use `findRoute` to calculate a high-level plan for this path,
        // prioritizing highways and owned rooms
        let allowedRooms = { [ from.roomName ]: true };
        Game.map.findRoute(from.roomName, to.roomName, {
            routeCallback(roomName) {
                let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
                let isHighway = (parsed[1] % 10 === 0) ||
                                (parsed[2] % 10 === 0);
                let isMyRoom = Game.rooms[roomName] &&
                    Game.rooms[roomName].controller &&
                    Game.rooms[roomName].controller.my;
                if (isHighway || isMyRoom) {
                    return 1;
                } else {
                    return 2.5;
                }
            }
        }).forEach(function(info) {
            allowedRooms[info.room] = true;
        });

        // Invoke PathFinder, allowing access only to rooms from `findRoute`
        let ret = PathFinder.search(from, to, {
            roomCallback(roomName) {
                if (allowedRooms[roomName] === undefined) {
                    return false;
                }
            }
        });

        console.log(ret.path);
    }
}

module.exports = findWay;
