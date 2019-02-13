var n=50 ;
const lowerX = -2;
const upperX = 2;

const lowerY = -1;
const upperY = 3;

var individual = [];
var velocity=[];
var pBest = [];
var gBest;


var diff_prev ;

const C1=2;
const C2 = 2;
var initialize=false
var j = 0;

run();

function getXandY() {


    // get random X
    var randomX = (Math.random() * (upperX - lowerX) + lowerX);

    //get random Y
    var randomY = (Math.random() * (upperY - lowerY) + lowerY);

    //return X and Y in object
    var returnObj = {
        x: randomX,
        y: randomY
    }

    return returnObj;
}

function solveEquation(x, y) {

    var ans = (100 * (Math.pow((Math.pow(x, 2) - (y)), 2)) + (Math.pow(1 - (x), 2)));


    return Number(ans)

}


function initializePopulation() {

    var i;

    for (i = 0; i < n; i++) {
        var obj = getXandY();

        individual.push(obj);
        velocity[i] = {
            x : 0.0,
            y : 0.0
        };
       
    }

  
   



}

function run() {
   

        
    
      
    initializePopulation();
    



  while(check()===false){
            runIteration()
        var p=0;
        for(p=0;p<n;p++){
            console.log("individual "+(p+1)+" : X="+individual[p].x+"    Y="+individual[p].y+"   fitness="+individual[p].fitness)
        }
         console.log('G-best: '+gBest.fitness)
  }
  console.log('Program Completed in '+(j+1)+" iterations");
       
    
}



function runIteration() {

   console.log('iteration: '+(j+1))
    if (initialize === false) {
        var i = 0;
        for (i = 0; i < n; i++) {

            individual[i].fitness = solveEquation(individual[i].x, individual[i].y);

            pBest[i] = individual[i];


        }

       
        var sorted = pBest.slice(0);
        sorted.sort(function (a, b) {
            return b.fitness - a.fitness;
        });
       

        gBest = sorted[0];
    
        initialize=true;
    }
    else{
        for (i = 0; i < n; i++) {
            individual[i].fitness = solveEquation(individual[i].x, individual[i].y);
            if(individual[i].fitness>pBest[i].fitness){
                pBest[i]=individual[i];
            }
        }
        var sorted = pBest.slice(0);
        sorted.sort(function (a, b) {
            return b.fitness - a.fitness;
        });

        if(sorted[0].fitness>gBest.fitness){
            gBest=sorted[0];
        }
    }
  
    var i=0;
   /*  console.log(individual) */
    for(i=0;i<n;i++){
      
        //velocity x
        velocity[i].x = Number(Number((velocity[i].x  )) + Number( [C1 * (rand()/10000) * (pBest[i].x - individual[i].x)])+ Number([C2 *(rand()/10000) * (gBest.x - individual[i].x)]));

        // velocity y
        velocity[i].y = Number(Number((velocity[i].y  )) +Number(  [C1 * (rand()/10000) * (pBest[i].y - individual[i].y)])+ Number([C2 * (rand()/10000) * (gBest.y - individual[i].y)]));
/* console.log("Velocity of X: "+velocity[i].x)
console.log("Velocity of Y: "+velocity[i].y); */


        var pX = Number(individual[i].x + velocity[i].x);
       /*  console.log("pX: "+pX); */
        if(pX> upperX || pX < lowerX){
           
        }
        else{
            individual[i].x = pX;
        }
     

        var pY = Number(individual[i].y + velocity[i].y);
        if(pY> upperY || pY < lowerY){
           
        }
        else{
            individual[i].y = pY;
        }
     /*    console.log("pY: "+pY); */
     
      

    }
  
    j++;
  /*   console.log(pBest) */

}

function rand(){
    return Math.random();
}



function check(){
    if(initialize===false){
        return false
        console.log("this")
    }
    else{
    var f=0;
    var tempFitness = [];
    for(f=0;f<n;f++){
   /*      console.log(individual[f]); */
        tempFitness[f] = individual[f].fitness;
     
    }
    var fitnessTotal = tempFitness.reduce(getSum);
    var fitnessAvg = fitnessTotal/n;
if(j<=1){
 diff_prev = Number(gBest.fitness - fitnessAvg) ;

 return false;
}
else{
    var diff = Number(gBest.fitness - fitnessAvg) ;
  
 
    if(diff==diff_prev){
       
        return true;
    }
    else{
        diff_prev = diff;
        return false;
    }


}
 
}
}

//get sum of array 
function getSum(total, num) {
    return total + num;
}