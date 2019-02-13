//initializing globle variable 

const g  = 50;
const n = 25;
const m = 20;
const mutation_positive = +0.25;
const mutation_negative = -0.25;
var individual = [];
var averageScore = [];
var maxFitness = [];
var generationNumber = [];


const lowerX = -2;
const upperX = 2;

const lowerY = -1;
const upperY = 3;

mainProgram();
setTimeout(function() {
    plotGraph();  
}, 1000);



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


function mainProgram(){

    //initialize population
    var i = 0;
    for(i=0;i<n;i++){
        var X_Y = getXandY();
        var ans = solveEquation(X_Y.x,X_Y.y);
        var individualObj = {

            x : Number(X_Y.x),
            y : Number(X_Y.y),
            fitnessScore : Number(ans)
        }
        individual.push(individualObj);

    }


    //for M generation 
    //create M children

    var c =0;
    var d = 0;
    tempIndividual = [];
    for(c=0;c<g;c++){

       for(d=0;d<m/2;d++){

      
       
        // select random 1st parent
        var index1 = (Math.floor(Math.random() * 25) + 1)-1;

      
    
      
        //select random 2nd parent
        var index2 = (Math.floor(Math.random() * 25) + 1)-1;

      
      
      
      
      
      
      
      
        //check for no open parent is select with itself
       while(index1===index2){
         index2 = (Math.floor(Math.random() * 25) + 1)-1;
       }

      var parent1 = individual[index1];
       var parent2 = individual[index2];
 
      
      
      
      
      
      
      
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

                       if(tempMutation3>=upperX){

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

                       if(tempMutation4<=lowerX){

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

                 if(tempMutation3>=upperX){

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

                 if(tempMutation4<=lowerX){

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

            var byFitness = individual.slice(0);
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
          

            individual=[];
           
            individual = tempArr
           
           var f = 0;
           var C1 = c;
           console.log('Generation: '+ Number(C1+1))
            var tempFitness = [];
           for(f=0;f<n;f++){
               console.log(individual[f]);
               tempFitness[f] = individual[f].fitnessScore;
            
           }

           var maxObj = {
               x : Number(C1+1),
               y : individual[0].fitnessScore
           }

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


function plotGraph(){
    var ctx = document.getElementById("myChart").getContext('2d');
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
            {
                label: 'Average Fitness Score Graph per Generation',
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
              
                data: averageScore,
                fill: false,
            }]
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

