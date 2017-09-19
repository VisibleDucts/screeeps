var Runner = {
    spawn: function(spawner, flagName) {
        return spawner.createCreep(
            [MOVE],
            undefined,
            {
                role: "runner",
                flag: flagName
            }
        );
    },
    run: function(creep) {
        var flag = Game.flags[creep.memory.flag];
        if (flag == null) {
            creep.say("no flag");
            return;
        }
        if (!creep.pos.isEqualTo(flag.pos)) {
            creep.moveTo(flag, {ignoreCreeps: false});
        }
    }
};

module.exports = Runner;
