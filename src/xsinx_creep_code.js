getGenericModel: function(maxCost, roads) {
       var cost= 0;
       var body= [];

       for (;;) {
           var partsCost= 200;
           var parts= [];

           parts.push(WORK);
           parts.push(CARRY);
           parts.push(MOVE);

           if (!roads) {
               parts.push(MOVE);
               partsCost+= 50;
           }

           if (cost + partsCost > maxCost) break;

           for (var part in parts) {
               body.push(parts[part]);
           }

           cost+= partsCost;
       }

       if (maxCost - cost == 100) {
           body.push(CARRY);
           body.push(MOVE);
           cost+= 100;
       }

       return body;
   },

   getRunnerModel: function(maxCost, roads, work) {
       if (work == undefined) work= true;

       var cost= work == true ? 150 : 0;
       var body= [];

       for (;;) {
           var partsCost= 100;
           var parts= [];

           if (roads) {
               parts.push(CARRY);
               partsCost+= 50;
           }

           parts.push(CARRY);
           parts.push(MOVE);

           if (cost + partsCost > maxCost) break;

           for (var part in parts) {
               body.push(parts[part]);
           }

           cost+= partsCost;
       }

       if (work) {
           body.push(WORK);
           body.push(MOVE);
       }

       return body;
   },


   bodyCost: function(body) {
       return body.reduce(function (cost, part) {
           return cost + BODYPART_COST[part];
       }, 0);
   },
