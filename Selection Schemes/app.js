//initializing globle variable 

const g  = 50;
const n = 25;
const m = 20;
const mutation_positive = +0.25;
const mutation_negative = -0.25;

var majorIndividual = [];
var averageScore = [];
var maxFitness = [];
var generationNumber = [];
var genseValue =[];


const lowerX = -2;
const upperX = 2;

const lowerY = -1;
const upperY = 3;


initializePopulation();

//simple
console.log('Trucation Selection\n\n');
console.log('Trucation Parent / Truncation Survival \n')
mainProgram(simple,simple);
plotGraph('myChart1')
console.log('Trucation Parent / Fitness Proportion Survival \n')
mainProgram(simple,fitnessProportion);
plotGraph('myChart2')
console.log('Trucation Parent / Rank Based Survival \n')
mainProgram(simple,rankBased);
plotGraph('myChart3')
console.log('Trucation Parent / Tournament Survival \n')
mainProgram(simple,tournamentSelection);
plotGraph('myChart4')

//fitness proportion
console.log('Fitness Proportion Selection\n\n');
console.log('Fitness Proportion Parent / Truncation Survival \n')
mainProgram(fitnessProportion,simple);
plotGraph('myChart5')
console.log('Fitness Proportion Parent / Fitness Proportion Survival \n')
mainProgram(fitnessProportion,fitnessProportion);
plotGraph('myChart6')
console.log('Fitness Proportion Parent / Rank Based Survival \n')
mainProgram(fitnessProportion,rankBased);
plotGraph('myChart7')
console.log('Fitness Proportion Parent / Tournament Survival \n')
mainProgram(fitnessProportion,tournamentSelection);
plotGraph('myChart8')

//rank-based
console.log('Rank-based Selection\n\n');
console.log('Rank-based Parent / Truncation Survival \n')
mainProgram(rankBased,simple);
plotGraph('myChart9')
console.log('Rank-based Parent / Fitness Proportion Survival \n')
mainProgram(rankBased,fitnessProportion);
plotGraph('myChart10')
console.log('Rank-based Parent / Rank Based Survival \n')
mainProgram(rankBased,rankBased);
plotGraph('myChart11')
console.log('Rank-based Parent / Tournament Survival \n')
mainProgram(rankBased,tournamentSelection);
plotGraph('myChart12')

//tournament
console.log('Tournament Selection\n\n');
console.log('Tournament Parent / Truncation Survival \n')
mainProgram(tournamentSelection,simple);
plotGraph('myChart13')
console.log('Tournament Parent / Fitness Proportion Survival \n')
mainProgram(tournamentSelection,fitnessProportion);
plotGraph('myChart14')
console.log('Tournament Parent / Rank Based Survival \n')
mainProgram(tournamentSelection,rankBased);
plotGraph('myChart15')
console.log('Tournament Parent / Tournament Survival \n')
mainProgram(tournamentSelection,tournamentSelection);
plotGraph('myChart16')




//function which generate random X and Y 

function getXandY(){


    // get random X
    var randomX = (Math.random() * (upperX - lowerX) + lowerX);

    //get random Y
    var randomY = (Math.random() * (upperY - lowerY) + lowerY);

    //return X and Y in object
    var returnObj = {
        x : randomX,
        y : randomY
    }

    return returnObj;
}

//get sum of array 
function getSum(total, num) {
    return total + num;
}

//function to solve equation
function solveEquation(x,y){

    var ans =( 100*(Math.pow((Math.pow(x,2)-(y)),2)) + (Math.pow(1-(x),2)));
   

    return Number(ans)

}

//probability 

function probability(ratio){

    var num = Math.floor(Math.random() * 100) + 1 
    
    if(num<=ratio){
        return false
    }

    else{
        return true
    }

}

function initializePopulation(){
    var i = 0;
    for(i=0;i<n;i++){
        var X_Y = getXandY();
        var ans = solveEquation(X_Y.x,X_Y.y);
        var individualObj = {

            x : Number(X_Y.x),
            y : Number(X_Y.y),
            fitnessScore : Number(ans)
        }
        majorIndividual.push(individualObj);

    }
}
function mainProgram(parentSelection,survivalSelection){

    
     generationNumber = [];
     averageScore = [];
     maxFitness = [];

    //for M generation 
    //create M children
    var individual = majorIndividual;
    var c =0;
    var d = 0;
    tempIndividual = [];
    for(c=0;c<g;c++){

       for(d=0;d<m/2;d++){

        var parentArr = parentSelection(individual,1);
        
       
       
      var parent1 = parentArr[0];
       var parent2 =parentArr[1];
 
      
      
      
      
      
      
      
       //apply crossover

       var child1 = [parent1.x,parent2.y];
       var child2 = [parent2.x,parent1.y];

      /*  console.log(child1,child2) */

       
       
       
       
       //mutation section

      //for child 1:
      /*  console.log('child 1') */
             //check whether probility of mutation is true or false
             if(probability(75)){

                //mutated
             /*    console.log('mutated') */

                //check which gense to mutate
                if(probability(50)) {       

                    //mutate x
                /*     console.log("x mutated") */

                    //check mutate +ve or -ve
                    if(probability(50)){

                        //+ve
                      /*   console.log("+ve mutation"); */

                       var tempMutation1 =  child1[0] + mutation_positive;
                     /*   console.log(tempMutation1) */

                       //check for bounds

                       if(tempMutation1>=upperX){

                        tempMutation1 = tempMutation1 - mutation_positive;
                        tempMutation1 = tempMutation1 - mutation_positive;
                        

                     /*    console.log("-ve mutation due to bounds "); */
                     /*    console.log(tempMutation1) */
                       }
                       var fitans1 = solveEquation(tempMutation1,child1[1]);
                       var childObj1 = {
                           x : Number(tempMutation1),
                           y : child1[1],
                           fitnessScore : fitans1
                       }

                       individual.push(childObj1)
                    /*    console.log(individual) */

                      /*  console.log("");
                       console.log("");
                       console.log(""); */

                     

                    }

                    else{

                        //-ve
                      /*   console.log("-ve mutation") */

                          var tempMutation2 = child1[0] - mutation_positive;
                         /*  console.log(tempMutation2) */

                       //check for bounds

                       if(tempMutation2<=lowerX){

                        tempMutation2 = tempMutation2 + mutation_positive;
                        tempMutation2 = tempMutation2 + mutation_positive;
                      /*   console.log("+ve mutation due to bounds "); */
                     /*    console.log(tempMutation2) */
                    }

                    var fitans1 = solveEquation(tempMutation2,child1[1]);
                    var childObj1 = {
                        x : Number(tempMutation2),
                        y : child1[1],
                        fitnessScore : fitans1
                    }

                    individual.push(childObj1)
                  /*   console.log(individual) */

                  /*   console.log("");
                    console.log("");
                    console.log(""); */
                    }

                }

                else{

                    // mutate Y
                   /*  console.log("y mutated") */

                     //check mutate +ve or -ve
                    if(probability(50)){

                        //+ve
                      /*   console.log("+ve mutation") */

                       var tempMutation3 = child1[1] + mutation_positive;
                     /*   console.log(tempMutation3) */

                       //check for bounds

                       if(tempMutation3>=upperY){

                        tempMutation3 = tempMutation3 - mutation_positive;
                        tempMutation3 = tempMutation3 - mutation_positive;
                      /*   console.log("-ve mutation due to bounds ");
                        console.log(tempMutation3) */
                    }

                    var fitans1 = solveEquation(child1[0],tempMutation3);
                    var childObj1 = {
                        x : child1[0],
                        y : Number(tempMutation3),
                        fitnessScore : fitans1
                    }


                    individual.push(childObj1)
                   /*  console.log(individual)

                    console.log("");
                    console.log("");
                    console.log("");
 */
                    }

                    else{

                        //-ve
                      /*   console.log("-ve mutation") */
                          var tempMutation4 = child1[1] - mutation_positive;
                      /*     console.log(tempMutation4) */


                       //check for bounds

                       if(tempMutation4<=lowerY){

                        tempMutation4 = tempMutation4 + mutation_positive;
                        tempMutation4 = tempMutation4 + mutation_positive;
                      /*   console.log("+ve mutation due to bounds ");
                        console.log(tempMutation4) */
                    }
                    var fitans1 = solveEquation(child1[0],tempMutation4);
                    var childObj1 = {
                        x : child1[0],
                        y : Number(tempMutation4),
                        fitnessScore : fitans1
                    }

                    individual.push(childObj1)
                   /*  console.log(individual)

                    console.log("");
                    console.log("");
                    console.log(""); */
                    }

                }




             }

             else{

                //not mutated

                  /*   console.log('Not mutated, probability less than 70 '); */
                    var fitans1 = solveEquation(child1[0],child1[1]);
                    var childObj1 = {
                        x : child1[0],
                        y : child1[1],
                        fitnessScore : fitans1
                    }

                    individual.push(childObj1)
                   /*  console.log(individual)
                    console.log("");
                    console.log("");
                    console.log(""); */
             }




                   //for child 1:
      /*  console.log('child 2') */
       //check whether probility of mutation is true or false
       if(probability(75)){

          //mutated
      /*     console.log('mutated') */

          //check which gense to mutate
          if(probability(50)) {       

              //mutate x
           /*    console.log("x mutated") */

              //check mutate +ve or -ve
              if(probability(50)){

                  //+ve
                /*   console.log("+ve mutation"); */

                 var tempMutation1 =  child2[0] + mutation_positive;
              /*    console.log(tempMutation1) */

                 //check for bounds

                 if(tempMutation1>=upperX){

                  tempMutation1 = tempMutation1 - mutation_positive;
                  tempMutation1 = tempMutation1 - mutation_positive;
                  

               /*    console.log("-ve mutation due to bounds ");
                  console.log(tempMutation1) */
                 }
                 var fitans1 = solveEquation(tempMutation1,child2[1]);
                 var childObj1 = {
                     x : Number(tempMutation1),
                     y : child2[1],
                     fitnessScore : fitans1
                 }

                 individual.push(childObj1)
               /*   console.log(individual)

                 console.log("");
                 console.log("");
                 console.log("");
 */
               

              }

              else{

                  //-ve
                /*   console.log("-ve mutation") */

                    var tempMutation2 = child2[0] - mutation_positive;
                /*     console.log(tempMutation2) */

                 //check for bounds

                 if(tempMutation2<=lowerX){

                  tempMutation2 = tempMutation2 + mutation_positive;
                  tempMutation2 = tempMutation2 + mutation_positive;
                /*   console.log("+ve mutation due to bounds ");
                  console.log(tempMutation2) */
              }

              var fitans1 = solveEquation(tempMutation2,child2[1]);
              var childObj1 = {
                  x : Number(tempMutation2),
                  y : child2[1],
                  fitnessScore : fitans1
              }

              individual.push(childObj1)
             /*  console.log(individual)

              console.log("");
              console.log("");
              console.log(""); */
              }

          }

          else{

              // mutate Y
            /*   console.log("y mutated") */

               //check mutate +ve or -ve
              if(probability(50)){

                  //+ve
                /*   console.log("+ve mutation") */

                 var tempMutation3 = child2[1] + mutation_positive;
              /*    console.log(tempMutation3) */

                 //check for bounds

                 if(tempMutation3>=upperY){

                  tempMutation3 = tempMutation3 - mutation_positive;
                  tempMutation3 = tempMutation3 - mutation_positive;
                /*   console.log("-ve mutation due to bounds ");
                  console.log(tempMutation3) */
              }

              var fitans1 = solveEquation(child2[0],tempMutation3);
              var childObj1 = {
                  x : child2[0],
                  y : Number(tempMutation3),
                  fitnessScore : fitans1
              }


              individual.push(childObj1)
           /*    console.log(individual)

              console.log("");
              console.log("");
              console.log(""); */

              }

              else{

                  //-ve
              /*     console.log("-ve mutation") */
                    var tempMutation4 = child2[1] - mutation_positive;
              /*       console.log(tempMutation4) */


                 //check for bounds

                 if(tempMutation4<=lowerY){

                  tempMutation4 = tempMutation4 + mutation_positive;
                  tempMutation4 = tempMutation4 + mutation_positive;
               /*    console.log("+ve mutation due to bounds ");
                  console.log(tempMutation4) */
              }
              var fitans1 = solveEquation(child2[0],tempMutation4);
              var childObj1 = {
                  x : child2[0],
                  y : Number(tempMutation4),
                  fitnessScore : fitans1
              }

              individual.push(childObj1)
            /*   console.log(individual)

              console.log("");
              console.log("");
              console.log(""); */
              }

          }




       }

       else{

          //not mutated

             /*  console.log('Not mutated, probability less than 70 '); */
              var fitans1 = solveEquation(child2[0],child2[1]);
              var childObj1 = {
                  x : child2[0],
                  y : child2[1],
                  fitnessScore : fitans1
              }

              individual.push(childObj1)
             /*  console.log(individual)
              console.log("");
              console.log("");
              console.log(""); */
       }



      

            }
            survivalArr= survivalSelection(individual,2);
            individual = [];
            individual = survivalArr;


            var byFitness = individual.slice(0);
            byFitness.sort(function(a,b) {
                return b.fitnessScore - a.fitnessScore;
            });
          /*   console.log('by Fitness Score:');
            console.log(byFitness); */


           
           var f = 0;
           var C1 = c;
       /*     console.log('Generation: '+ Number(C1+1)) */
            var tempFitness = [];
           for(f=0;f<n;f++){
             /*   console.log(individual[f]); */
               tempFitness[f] = individual[f].fitnessScore;
            
           }

           var maxObj = {
               x : Number(C1+1),
               y : byFitness[0].fitnessScore
           }
           var genseObj = {
               generation : Number(C1+1),
               x :  byFitness[0].x,
               y :  byFitness[0].y
           }
           genseValue.push(genseObj);

           maxFitness.push(maxObj);
           generationNumber.push(C1+1)
           

         
        
            var fitnessTotal = tempFitness.reduce(getSum);
            var totalChild = n;
            var fitnessAvg = fitnessTotal/totalChild;

            avgObj = {
                x : Number(C1+1),
                y : fitnessAvg
            }

            averageScore.push(avgObj);

        
            if(C1===n){
                
            }
           

         

            
    }

    var l;
    console.log('Gense value per generation')
    for(l=0;l<g;l++){
        console.log(genseValue[l]);
    }
    //print average score;

    var q;
    console.log('Average Fitness score per generation (Where x-> Generation and y-> fitness Score)')
    for(q=0;q<g;q++){
        console.log(averageScore[q]);
    }


    //print Max Fitness score;

    console.log('Max Fitness score per generation (Where x-> Generation and y-> fitness Score)')

    for(q=0;q<g;q++){
        console.log(maxFitness[q]);
    }
}


function plotGraph(elementId){
    var ctx = document.getElementById(elementId).getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: generationNumber,
            datasets: [{
                label: 'Max Fitness Score Graph per Generation',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
               
                data: maxFitness,
                fill: false,
            },
           ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Evolutionary Algorithm graph'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Generations'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Fitness Score'
                    }
                }]
            }
        }
    });
}


function fitnessProportion(population,mode){
    switch(mode){

        case 1 : {   // parent selection mode

            var newArr = [];

            //total fitness
            var totalFitness =getTotalFitness(population);

            //calculate proportion
            var i;

            for(i=0;i<population.length;i++){
                var proportion = population[i].fitnessScore / totalFitness ;
                
                var obj = {
                    s_num : i+1,
                    x : population[i].x,
                    y : population[i].y,
                    fitnessScore : population[i].fitnessScore,
                    proportion : proportion
                }

                newArr.push(obj)
               
            }

            // calculte commutative

            var j;

            for(j=0;j<newArr.length;j++){

                var commutative ;

                if(j==0){
                    
                    commutative = newArr[j].proportion;

                }
                else{

                    commutative = Number(newArr[j].proportion + newArr[j-1].commutative)

                }

                var obj2 = {
                    s_num : newArr[j].s_num,
                    x : newArr[j].x,
                    y : newArr[j].y,
                    fitnessScore : newArr[j].fitnessScore,
                    proportion :newArr[j].proportion,
                    commutative : commutative
                }
                newArr[j] = obj2
            }
          

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
          
             while(find===false){
                 if(newArr[j].commutative>=randomNum){
                       parentArr.push(newArr[j]);
                     
                       find=true;
                 }
                 j++;
             }
         }

         while(parentArr[0].s_num == parentArr[1].s_num){
            i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
          
             while(find===false){
                 if(newArr[j].commutative>=randomNum){
                       parentArr.push(newArr[j]);
                    
                       find=true;
                 }
                 j++;
             }
         }

         }

        
       return clearArr(parentArr);
           
           
            
        }
        break;



        case 2 : {   // survival selection mode

            var newArr = [];

            //total fitness
            var totalFitness =getTotalFitness(population);

            //calculate proportion
            var i;

            for(i=0;i<population.length;i++){
                var proportion = population[i].fitnessScore / totalFitness ;
                
                var obj = {
                    s_num : i+1,
                    x : population[i].x,
                    y : population[i].y,
                    fitnessScore : population[i].fitnessScore,
                    proportion : proportion
                }

                newArr.push(obj)
               
            }

            // calculte commutative

            var j;

            for(j=0;j<newArr.length;j++){

                var commutative ;

                if(j==0){
                    
                    commutative = newArr[j].proportion;

                }
                else{

                    commutative = Number(newArr[j].proportion + newArr[j-1].commutative)

                }

                var obj2 = {
                    s_num : newArr[j].s_num,
                    x : newArr[j].x,
                    y : newArr[j].y,
                    fitnessScore : newArr[j].fitnessScore,
                    proportion :newArr[j].proportion,
                    commutative : commutative
                }
                newArr[j] = obj2
            }
          

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         while(parentArr.length!=n){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
        
             while(find===false){
                 if(newArr[j].commutative>=randomNum){

                    if(i!=0){
                      
                        if(parentArr.indexOf(newArr[j])===-1){
                         
                            parentArr.push(newArr[j]);
                      
                        find=true; 
                        }
                        find=true;
                      
                    }
                    else{
                        parentArr.push(newArr[j]);
                       
                        find=true;
                    }
                      
                 }
                 j++;
             }
             i++;
         }

     

       return clearArr(parentArr);

        }
        break;


    }
}

function rankBased(populationArray,mode){
    switch(mode){

        case 1 : {   // parent selection mode

            var population = populationArray.slice(0);
            population.sort(function(a,b) {
                return a.fitnessScore - b.fitnessScore;
            });

          
            var newArr = [];

            //total fitness
            var totalFitness =getTotalFitness(population);
           
            //calculate proportion
            var i;

            for(i=0;i<population.length;i++){
                var proportion = population[i].fitnessScore / totalFitness ;
                
                var obj = {
                    s_num : i+1,
                    x : population[i].x,
                    y : population[i].y,
                    fitnessScore : population[i].fitnessScore,
                    proportion : proportion
                }

                newArr.push(obj)
               
            }

            // calculte commutative

            var j;

            for(j=0;j<newArr.length;j++){

                var commutative ;

                if(j==0){
                    
                    commutative = newArr[j].proportion;

                }
                else{

                    commutative = Number(newArr[j].proportion + newArr[j-1].commutative)

                }

                var obj2 = {
                    s_num : newArr[j].s_num,
                    x : newArr[j].x,
                    y : newArr[j].y,
                    fitnessScore : newArr[j].fitnessScore,
                    proportion :newArr[j].proportion,
                    commutative : commutative
                }
                newArr[j] = obj2
            }
          

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
         
             while(find===false){
                 if(newArr[j].commutative>=randomNum){
                       parentArr.push(newArr[j]);
                  
                     
                       find=true;
                 }
                 j++;
             }
         }

         while(parentArr[0].s_num == parentArr[1].s_num){
            i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
           
             while(find===false){
                 if(newArr[j].commutative>=randomNum){
                     var newObj = newArr[j]
                       parentArr.push(newArr[j]);
                   
                   
                       find=true;
                 }
                 j++;
             }
         }

         }
      

      
        
       return clearArr(parentArr)
           
           
            
        }
        break;



        case 2 : {   // survival selection mode

            var newArr = [];
            var population = populationArray.slice(0);
            population.sort(function(a,b) {
                return a.fitnessScore - b.fitnessScore;
            });

           
            //total fitness
            var totalFitness =getTotalFitness(population);
          

            //calculate proportion
            var i;

            for(i=0;i<population.length;i++){
                var proportion = population[i].fitnessScore / totalFitness ;
                
                var obj = {
                    s_num : i+1,
                    x : population[i].x,
                    y : population[i].y,
                    fitnessScore : population[i].fitnessScore,
                    proportion : proportion
                }

                newArr.push(obj)
               
            }

            // calculte commutative

            var j;

            for(j=0;j<newArr.length;j++){

                var commutative ;

                if(j==0){
                    
                    commutative = newArr[j].proportion;

                }
                else{

                    commutative = Number(newArr[j].proportion + newArr[j-1].commutative)

                }

                var obj2 = {
                    s_num : newArr[j].s_num,
                    x : newArr[j].x,
                    y : newArr[j].y,
                    fitnessScore : newArr[j].fitnessScore,
                    proportion :newArr[j].proportion,
                    commutative : commutative
                }
                newArr[j] = obj2
            }
           

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         while(parentArr.length!=n){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
          
             while(find===false){
                 if(newArr[j].commutative>=randomNum){

                    if(i!=0){
                       
                        if(parentArr.indexOf(newArr[j])===-1){
                          
                            parentArr.push(newArr[j]);
                         
                        find=true; 
                        }
                        find=true;
                      
                    }
                    else{
                        parentArr.push(newArr[j]);
                       
                        find=true;
                    }
                      
                 }
                 j++;
             }
             i++;
         }

      

       return clearArr(parentArr);

        }
        break;


    }
}

function tournamentSelection(population,mode){

    switch(mode){

        case 1: {
            var i=0;
         
            var selection = [];
            for(i=0;i<2;i++){

              
                    var preSelect = []
                  

                var ran1 = (Math.floor(Math.random() * n) + 1)-1;
                var ran2 = (Math.floor(Math.random() * n) + 1)-1;

                while(ran1 === ran2){
                    ran2 = (Math.floor(Math.random() * 25) + 1)-1;
                }

              

                preSelect.push(population[ran1]);
                preSelect.push(population[ran2]);

              

                var byFitness = preSelect.slice(0);
                byFitness.sort(function(a,b) {
                    return b.fitnessScore - a.fitnessScore;
                });

               

                selection.push(byFitness[0]);


            

            }
            return selection;

        }
        break;

        case 2 : {
            var i=0;
         
            var selection = [];
            for(i=0;i<n;i++){

              
                    var preSelect = []
                  

                var ran1 = (Math.floor(Math.random() * population.length) + 1)-1;
                var ran2 = (Math.floor(Math.random() * population.length) + 1)-1;

                while(ran1 === ran2){
                    ran2 = (Math.floor(Math.random() * population.length) + 1)-1;
                }

             

                preSelect.push(population[ran1]);
                preSelect.push(population[ran2]);

              

                var byFitness = preSelect.slice(0);
                byFitness.sort(function(a,b) {
                    return b.fitnessScore - a.fitnessScore;
                });

             

                selection.push(byFitness[0]);


            

            }
           
            return selection;

        }
        break;
    }
}

function simple(population,mode){
    switch(mode){
        
        case 1 : {
             // select random 1st parent
        var index1 = (Math.floor(Math.random() * 25) + 1)-1;

      
        //select random 2nd parent
        var index2 = (Math.floor(Math.random() * 25) + 1)-1;

     
      
        //check for no open parent is select with itself
       while(index1===index2){
         index2 = (Math.floor(Math.random() * 25) + 1)-1;
       }

      var parent = [];
      parent.push( population[index1]);
      parent.push( population[index2]);

      return parent;
        }
        break;

        case 2: {
            populationArray = population
            var byFitness = populationArray.slice(0);
            byFitness.sort(function(a,b) {
                return b.fitnessScore - a.fitnessScore;
            });
          /*   console.log('by Fitness Score:');
            console.log(byFitness); */


            var e = 0 ;
            var tempArr = [];
            for(e=0;e<n;e++){
                tempArr[e] = byFitness[e];
                
            }

            return tempArr ;
        }
        break;
    }
}

function getTotalFitness(population){

    var h;
    var fitnessArr = []
    for(h=0;h<population.length;h++){
        fitnessArr.push(population[h].fitnessScore)
    }

    var fitnessTotal = fitnessArr.reduce(getSum);
    return fitnessTotal
}

//get sum of array 
function getSum(total, num) {
    return total + num;
}


function clearArr(array){

    cleanArray = array;
    var w;
    for(w=0;w<array.length;w++){

        delete cleanArray[w].s_num;
        delete cleanArray[w].proportion;
        delete cleanArray[w].commutative;

    }

    return cleanArray
}

