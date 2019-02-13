var n ;
const lowerX = -2;
const upperX = 2;

const lowerY = -1;
const upperY = 3;

var individual = [];
var velocity=[];
var pBest = [];
var gBest;

var speed;
var diff_prev ;
var MAX_ITERATION = 700;
const C1=2;
const C2 = 2;
var initialize=false
var j = 0;

var accuracy = 100000

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
    var a = Number(document.getElementById('n').value);
    var b = Number(document.getElementById('speed').value);
   

        n=a;
        speed=b;
    
        document.getElementById('n').disabled=true;
        document.getElementById('speed').disabled=true;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('text').innerHTML = "-->  Start initializing <b>" + n + "</b> individuals ..."
    initializePopulation();
    document.getElementById('text').innerHTML += "<br/>-->  Initialization Completed!"
    
    document.getElementById('text').innerHTML += "<br/>-->  Iterations Started ..."



    setInterval(function () {
        if (/* j == MAX_ITERATION */ check()) { clearInterval(this); }
        else {
            runIteration()
            document.getElementById('pbest').innerHTML = "-->  G-Best: <b>" + gBest.fitness+"</b>"
            plotGraph();
        };
    }, speed);
    
}



function runIteration() {

    document.getElementById('iteration').innerHTML = "-->  Iteration: <b>" + (j+1)+"</b>"
    if (initialize === false) {
        var i = 0;
        for (i = 0; i < n; i++) {

            individual[i].fitness = solveEquation(individual[i].x, individual[i].y);

            pBest[i] = individual[i];


        }

        console.log(individual)
        var sorted = pBest.slice(0);
        sorted.sort(function (a, b) {
            return b.fitness - a.fitness;
        });
        console.log(pBest);

        gBest = sorted[0];
        console.log(gBest)
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
        velocity[i].x = Number(Number((velocity[i].x  )) + Number( [C1 * (rand()/accuracy) * (pBest[i].x - individual[i].x)])+ Number([C2 *(rand()/accuracy) * (gBest.x - individual[i].x)]));

        // velocity y
        velocity[i].y = Number(Number((velocity[i].y  )) +Number(  [C1 * (rand()/accuracy) * (pBest[i].y - individual[i].y)])+ Number([C2 * (rand()/accuracy) * (gBest.y - individual[i].y)]));
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

function plotGraph(){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: 'PSO',
            datasets: [{
                label: 'X and Y',
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
               
                data: individual,
                fill: false,
            }]
        },
        options: {
            animation: false,
            responsive: true,
            title: {
                display: true,
                text: 'PSO'
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
                    ticks: {
                        min: lowerX,
                        max: upperX,
                        stepSize: 0.5
                    },
                    gridLines: {
                        display:false
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'X'
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: lowerY,
                        max: upperY,
                        stepSize: 0.5
                    },
                    gridLines: {
                        display:false
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Y'
                    }
                }]
            }
        }
    });
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
 document.getElementById('diff').innerHTML = diff_prev;
 return false;
}
else{
    var diff = Number(gBest.fitness - fitnessAvg) ;
    document.getElementById('diff').innerHTML = "<b>Difference:</b> "+diff;
 
    if(diff==diff_prev){
        document.getElementById('diff').innerHTML = "";
        document.getElementById('pbest1').innerHTML="<b>"+gBest.x+'</b><br><b>'+gBest.y+"</b><br><br><div style=\"color:red\"><b>Done</b></div>"
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