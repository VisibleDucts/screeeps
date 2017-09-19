var harvesters
var harvesters2
var defenders
var defenders2
var builders
var builders2
var upgraders
var upgraders2
var sharvester
var sharvesterR2
var sharvesterR2_1
var sharvester2
var repairers
var repairers2
var haulers
var haulers2
var haulers3
var towerHaulers
var towerHaulers2
var claimers
var remotes
var remotes2
var remotes3
var remotes4
var remoteHaulers
var remoteHaulers2
var remoteHaulers3
var remoteRepairers
var remoteRepairers2
var remoteRepairers3
var roleDismantlers
var attackers
var linkHaulers
var healers
var minerals
var rangedAttackers


for(const name in Game.creeps) {
    const startCpu = Game.cpu.getUsed();

    // creep logic goes here

    const elapsed = Game.cpu.getUsed() - startCpu;
    console.log('Creep '+name+' has used '+elapsed+' CPU time');
}
  var roless = [];

for(const name in Game.creeps) {

       // console.log(Game.creeps[name.toString()].memory.role);
         roless.push(Game.creeps[name.toString()].memory.role);

 }
// roless.sort();
 //console.log(roless[0]);
