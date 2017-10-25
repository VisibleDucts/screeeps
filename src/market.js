var market = {


    run: function(){

        global.whatIs = function(fun){
            switch(fun){
                case 'Calc': return console.log('Calc(amount, roomName, destination)'); break;
                case 'dealCalc': return console.log('dealCalc(amt, price)'); break;
                case 'deal': return console.log('deal(dealID, amt, roomName, destination)'); break;
                case 'send': return console.log('send(roomName, destination, resource, amt, test, cap, message, recurring) -- message and recurring optional.'); break;
                default: return console.log(fun + ' Not a function in market.js.');
            }
        }

        global.Calc = function(amount, roomName, destination){
            return Game.market.calcTransactionCost(amount, roomName, destination);
        }

        global.dealCalc = function(amt, price){
            return amt * price;
        }

        global.deal = function(dealID, amt, roomName, destination){
            if(dealID === undefined || dealID === null){
                console.log('NO DEAL');
                return;
            }
            if(amt === undefined || amt === null){
                console.log('You want to make a deal for nothing?!');
                return;
            }
            if(roomName === undefined || roomName === null){
                console.log('You want to make a deal for nothing?!');
                return;
            }
            let energyCost = Game.market.calcTransactionCost(amt,roomName,destination);
            let terminal = Game.rooms[roomName].terminal;
            let termTotal = _.sum(terminal.store);


            if(terminal.store[RESOURCE_ENERGY] > energyCost && (termTotal + amt) < terminal.storeCapacity){
                if(Game.market.deal(dealID, amt, roomName) === 0){
                    return console.log('Deal succesful');
                }
                else{
                    return Game.market.deal(dealID, amt, roomName);
                }
            }
        }

        global.send = function(roomName, destination, resource, amount, test,cap,message, recurring){

            let term = Game.rooms[roomName].terminal;
            let dest = destination;
            let res = resource;
            let amt = amount;
            let room = roomName;
            if(cap !== 0){
                var capped = cap + amt;
            }
            if(cap === 0) {
                var capped = cap;
            }
            let msg = message;
            //let recurring = recurring;
            var playerRooms = {
                'mnuck': 'W37S34',
            }
            const cost = Game.market.calcTransactionCost(amt, room, dest);

            /*  ===   Idea is to setup automatic sending based on if I have enough resources left after sending.
            /*    But I can't "see" the terminal space of another person
            if(recurring != undefined || recurring != null){
                let capped = cap + amount;
                if(term.store[resource] > capped){

                }
            }
            */
            if(test){
                console.log(cost);
                console.log(term.store[RESOURCE_ENERGY] > cost);
                console.log(capped);
            }
            if(term.store[RESOURCE_ENERGY] > cost && term.store[res] > capped && !test){
                if(Game.rooms[roomName].terminal.send(resource, amount, destination, msg) === 0){
                    return console.log('Send success.')
                }
            }
            else if(term.store[RESOURCE_ENERGY] < cost){
                return console.log('ERROR: Not enough energy to cover cost. ' + cost + ' ' + term.store[RESOURCE_ENERGY]);
            }
            else if(term.store[res] < capped){
                return console.log('ERROR: Not enough resources to send.');
            }
        }

    }

};

module.exports = market;
