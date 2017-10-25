var W43S27 = {
    
     
     run: function(){ 
         
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeID == 1);
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.homeID == 1);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.homeID == 1);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.homeID == 1);
        var sharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sharvester' && creep.memory.homeID == 1);
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair' && creep.memory.homeID == 1);
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.homeID == 1);
        var towerHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHauler' && creep.memory.homeID == 1);
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.homeID == 1);
        var remotes = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote' && creep.memory.homeID == 1);
        var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.homeID == 1);
        var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer' && creep.memory.homeID == 1);
        var roleDismantlers = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismantler' && creep.memory.homeID == 1);
        var linkHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkHauler' && creep.memory.homeID == 1);
        var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer' && creep.memory.homeID == 1);
        var minerals =_.filter(Game.creeps, (creep) => creep.memory.role == 'mineral' && creep.memory.homeID == 1);
        var attackers =_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.homeID == 1);
        
        
        
     }
};

module.exports = W43S27;