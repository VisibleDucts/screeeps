var Zombie = {
    spawn: function(spawner, master, shape) {
        return spawner.createCreep(
            shape,
            undefined,
            {
                role: "zombie",
                master: master
            }
        );
    },
    run: function(creep) {
    }
};

module.exports = Zombie;