var links = {

    run: function(links, roomName){

        var room1 = Game.rooms['W43S27'];
        var room2 = Game.rooms['W43S28'];

        if(roomName == room1){
            if(links){
                if(links[1].energy <= links[0].energyCapacity){
                    links[1].transferEnergy(links[0]);
                }
            }
            if(links.length > 2){
                if(links[2].energy <= links[0].energyCapacity){
                    links[2].transferEnergy(links[0]);
                }
            }
        }
        else if(roomName == room2){
            if(links){
                if(links[0].energy <= links[1].energyCapacity){
                    links[0].transferEnergy(links[1]);
                }
            }
        }




    /********************* Link ids ***********************/
    /*Room 1
    var storage_r1 =    '59c1b3dac2426e29b9ff9880'; //links[0]
    var harvest0 =      '59c1c26dfb610e2e0a6a2b76'; //links[1]
    var exit_left =     '59c1dbaeb9340c0cb707f8dd'; //links[2]
    //Room 2
    var storage_r2 =    '59bb5f4d080cf410740c0f93'; //links[0]
    var controller_r2 = '59bb6c597368b41214a8e5e8'; //links[1]
    var exit_right =    '59c06512b74fe7285184fd2d'; //links[2]

    Room 1 logic: harvest and exit to storage  (1 and 2 to 0)
    Room 2 logic: storage to controller. ... exit not sure cause storage is busyyy (0 to 1)
    /*******************************************************/

  }

};

module.exports = links;
