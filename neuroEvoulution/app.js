const n = 50;
const m = 40;
var generation=0;
function mutation(){

    return Math.random() * (-1 - (+1)) + (+1);

};
const errorConst = 0.01;

var individual = [];

const upperLimit = +1;
const lowerLimit = -1;
var result=[];
var stopGen = 705
var finalInd;
var fileName = "NN-DATA.csv"
var milliTime = 0;

var fs = require('fs');
var csv = require('fast-csv');
var Stopwatch = require('timer-stopwatch');


var arr=[]

process.on ('SIGINT',() => {
    console.log('generation: ' +generation);
    test(finalInd);
    printArray(result);
    process.exit(1);
  });



fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", function (data) {

        /*  console.log(data); */
        arr.push(data);
    })
    .on("end", function () {
        console.log(fileName + " file readed successfully!")
        console.log('Error: '+errorConst)
        console.log('Mutation: '+mutation());
     
    mainProg();
        /*        console.log(arr[1])
               console.log(Number(arr[1][0])) */
    });
function mainProg(){
    var find=false;
   
  
    generateIndividual();
    var x=0;
    var y =0;
    for(x=0;x<n;x++){
        var score = calculateFitness(individual[x]);

        individual[x][6]=score;
       }
       
     var myInterval=  setInterval(() => {
      
     
      //  while (find!==true){
          
               

  //7200000

            for(y=0;y<m/2;y++){

                // select random 1st parent
        var index1 = (Math.floor(Math.random() * n) + 1)-1;

      
    
      
        //select random 2nd parent
        var index2 = (Math.floor(Math.random() * n) + 1)-1;

      
      
      
      
        //check for no open parent is select with itself
       while(index1===index2){
         index2 = (Math.floor(Math.random() * n) + 1)-1;
       }

      var parent1 = individual[index1];
       var parent2 = individual[index2];

       var parentArray1 = convertToArray(parent1);
       var parentArray2 = convertToArray(parent2);

       //crossover
       var child1 = [parentArray1[0],parentArray1[1],parentArray1[2],parentArray1[3],parentArray1[4],parentArray1[5],parentArray2[6],parentArray2[7],parentArray2[8],parentArray2[9],parentArray2[10]];
       var child2 = [parentArray2[0],parentArray2[1],parentArray2[2],parentArray2[3],parentArray2[4],parentArray2[5],parentArray1[6],parentArray1[7],parentArray1[8],parentArray1[9],parentArray1[10]];
       



       //mutation
       //child1
       if(probability(90)){
          
           var u =0;
        var range = Math.floor(Math.random() * (11 - (1) + 1)) + (1);
        var indexArr = []
       
        for(u=0;u<range;u++){
            var index=Math.floor(Math.random() * (10 - (0) + 1)) + (0);
            while(indexArr.indexOf(index)!=-1){
                index=Math.floor(Math.random() * (10 - (0) + 1)) + (0);
            }
            indexArr.push(index);
           
           if(probability(50)){
            var mut = mutation();
           
               //+ve
               child1[index]=child1[index]+mut;
               if(child1[index]>=upperLimit){
                child1[index]=child1[index]-mut;  
                child1[index]=child1[index]-mut; 
               }
              
           }
           else{
              // -ve
              var mut = mutation();
             
              child1[index]=child1[index]-mut;
               if(child1[index]<=lowerLimit){
                child1[index]=child1[index]+mut;  
                child1[index]=child1[index]+mut; 
                
               }
           }

        }
       
       }







       //child2
       if(probability(90)){
          
        var u =0;
     var range = Math.floor(Math.random() * (11 - (1) + 1)) + (1);
     var indexArr = []
    
     for(u=0;u<range;u++){
         var index=Math.floor(Math.random() * (10 - (0) + 1)) + (0);
         while(indexArr.indexOf(index)!=-1){
             index=Math.floor(Math.random() * (10 - (0) + 1)) + (0);
         }
         indexArr.push(index);
        
        if(probability(50)){
         
            var mut = mutation();
        
            //+ve
            child2[index]=child2[index]+mut;
            if(child2[index]>=upperLimit){
             child2[index]=child2[index]-mut;  
             child2[index]=child2[index]-mut; 
            }
           
        }
        else{
           // -ve
           var mut = mutation();
          
           child2[index]=child2[index]-mut;
            if(child2[index]<=lowerLimit){
             child2[index]=child2[index]+mut;  
             child2[index]=child2[index]+mut; 
             
            }
        }

     }
    
    }

      var childNeuron1 = convertToNeuron(child1);
      var childScore = calculateFitness(childNeuron1);
       childNeuron1[6]=childScore;

     var  childNeuron2 = convertToNeuron(child2);
     childScore = calculateFitness(childNeuron2);
 childNeuron2[6]=childScore;
      

      
        individual.push(childNeuron1) 
        individual.push(childNeuron2)

       
            }

            var byFitness = individual.slice(0);
            byFitness.sort(function(a,b) {
                return b[6] - a[6];
            });

           
           
            var e = 0 ;
            var tempArr = [];
            for(e=0;e<n;e++){
                tempArr[e] = byFitness[e];
                
            }
          finalInd=tempArr[0];

            individual=[];
           
            individual = tempArr
        
            
             generation++;
             console.log('Generation: '+generation+' ---- Fitness: '+individual[0][6])
         
             if(individual[0].indexOf(705)!=-1){
                clearInterval(myInterval);
                 console.log('generation: ' +generation);
             test(finalInd);
             printArray(result);
     
                
             }

           
        }, 0)
        
       
       /*  console.log('generation: ' +generation);
        test(finalInd);
        printArray(result);
 */
       /*  console.log(individual) */
  
    
}


function probability(ratio){

    var num = Math.floor(Math.random() * 100) + 1 
    
    if(num<=ratio){
        return false
    }

    else{
        return true
    }

}
function generateIndividual(){
var i=0;
var j=0;
        for(i=0;i<n;i++){
            var neuron = [];
          var  neuron_1 = {
                name: 1,
                input: null,
                output: null,
                type: 'input',
                bias: null,
                link: [
                    {
                        linkTo: 4,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    },
        
                    {
                        linkTo: 5,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    }
                ]
            }
        
        
            var  neuron_2 = {
                name: 2,
                input: null,
                output: null,
                type: 'input',
                bias: null,
                link: [
                    {
                        linkTo: 4,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    },
        
                    {
                        linkTo: 5,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    }
                ]
            }
        
        
            var  neuron_3 = {
                name: 3,
                input: null,
                output: null,
                type: 'input',
                bias: null,
                link: [
                    {
                        linkTo: 4,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    },
        
                    {
                        linkTo: 5,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    }
                ]
            }
        
        
            var   neuron_4 = {
                name: 4,
                input: null,
                output: null,
                type: 'hidden',
                bias: (Math.random() * (-1 - (+1)) + (+1)),
                link: [
                    {
                        linkTo: 6,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    }
                ]
            }
        
        
            var   neuron_5 = {
                name: 5,
                input: null,
                output: null,
                type: 'hidden',
                bias: (Math.random() * (-1 - (+1)) + (+1)),
                link: [
                    {
                        linkTo: 6,
                        weight: (Math.random() * (-1 - (+1)) + (+1))
                    }
                ]
            }
        
        
            var    neuron_6 = {
                name: 6,
                input: null,
                output: null,
                type: 'output',
                bias: (Math.random() * (-1 - (+1)) + (+1)),
                link: null,
                error : null
            }
            var fitnessScore = null;
            neuron.push(neuron_1, neuron_2, neuron_3, neuron_4, neuron_5, neuron_6,fitnessScore);
            individual.push(neuron);
        }
}



function calculateFitness(individual){
var fitnessScore = 0;
var i = 1;


    //for 4 
    var temp = individual

    for(i=1;i<arr.length;i++){
     
        temp[0].input=arr[i][0];
        temp[0].output=arr[i][0];

        temp[1].input=arr[i][1];
        temp[1].output=arr[i][1];

        temp[2].input=arr[i][2];
        temp[2].output=arr[i][2];

    var input = Number((temp[0].link[0].weight * temp[0].input) + (temp[1].link[0].weight * temp[1].input) + (temp[2].link[0].weight * temp[2].input) + (temp[3].bias))

    var output =  1 / (1+Math.exp(-(input)));

    temp[3].input=input;
    temp[3].output=output;

     input = Number((temp[0].link[1].weight * temp[0].input) + (temp[1].link[1].weight * temp[1].input) + (temp[2].link[1].weight * temp[2].input)+ (temp[4].bias))
   
     output =  1 / (1+Math.exp(-(input)));

     temp[4].input=input;
     temp[4].output=output;

     input = Number((temp[3].link[0].weight * temp[3].output) + (temp[4].link[0].weight * temp[4].output)+ (temp[5].bias) )

     output =  1 / (1+Math.exp(-(input)));
    

     temp[5].input=input;
     temp[5].output=output;

     var err = Math.abs((Number(arr[i][3])-temp[5].output)*(Number(temp[5].output))*(Number(1-temp[5].output)));
     temp[5].error=err;
       if(err<=errorConst){
           fitnessScore++;
       } 
      
      

    }
    
/* 
    if(fitnessScore >= stopGen){
      finalInd=temp;
    } */
    
    
  
    return fitnessScore
    
}

function convertToArray(individual){

    var indArr = [individual[0].link[0].weight,
                  individual[0].link[1].weight,
                  individual[1].link[0].weight,
                  individual[1].link[1].weight,
                  individual[2].link[0].weight,
                  individual[2].link[1].weight,
                  individual[3].link[0].weight,
                  individual[4].link[0].weight,
                  individual[3].bias, 
                  individual[4].bias,
                  individual[5].bias, ]

                  return indArr;
}

function convertToNeuron(array){

    var  neuron_1 = {
        name: 1,
        input: null,
        output: null,
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: array[0]
            },

            {
                linkTo: 5,
                weight: array[1]
            }
        ]
    }


    var  neuron_2 = {
        name: 2,
        input: null,
        output: null,
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: array[2]
            },

            {
                linkTo: 5,
                weight: array[3]
            }
        ]
    }


    var  neuron_3 = {
        name: 3,
        input: null,
        output: null,
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: array[4]
            },

            {
                linkTo: 5,
                weight: array[5]
            }
        ]
    }


    var   neuron_4 = {
        name: 4,
        input: null,
        output: null,
        type: 'hidden',
        bias: array[8],
        link: [
            {
                linkTo: 6,
                weight: array[6]
            }
        ]
    }


    var   neuron_5 = {
        name: 5,
        input: null,
        output: null,
        type: 'hidden',
        bias: array[9],
        link: [
            {
                linkTo: 6,
                weight: array[7]
            }
        ]
    }


    var    neuron_6 = {
        name: 6,
        input: null,
        output: null,
        type: 'output',
        bias: array[10],
        link: null,
        error : null
    }
    var fitnessScore = null;
    var neuron=[];
    neuron.push(neuron_1, neuron_2, neuron_3, neuron_4, neuron_5, neuron_6,fitnessScore);
                  return neuron;
}

/* generateIndividual();
console.log(individual); */


function clearArray(arr){
    while (arr.length) {
        arr.pop();
      }
}


function printArray(arr){
    console.log('***')
    var count=0;
    while (count<arr.length) {
       console.log(arr[count]);
       count++;
      } 
}


function test(individual){
   console.log(individual)
    var i = 1;
    var tempResArr=[];
    
        //for 4 
        var temp = individual
    
        for(i=1;i<arr.length;i++){
         
            temp[0].input=arr[i][0];
            temp[0].output=arr[i][0];
    
            temp[1].input=arr[i][1];
            temp[1].output=arr[i][1];
    
            temp[2].input=arr[i][2];
            temp[2].output=arr[i][2];
    
        var input = Number((temp[0].link[0].weight * temp[0].input) + (temp[1].link[0].weight * temp[1].input) + (temp[2].link[0].weight * temp[2].input) + (temp[3].bias))
    
        var output =  1 / (1+Math.exp(-(input)));
    
        temp[3].input=input;
        temp[3].output=output;
    
         input = Number((temp[0].link[1].weight * temp[0].input) + (temp[1].link[1].weight * temp[1].input) + (temp[2].link[1].weight * temp[2].input)+ (temp[4].bias))
       
         output =  1 / (1+Math.exp(-(input)));
    
         temp[4].input=input;
         temp[4].output=output;
    
         input = Number((temp[3].link[0].weight * temp[3].output) + (temp[4].link[0].weight * temp[4].output)+ (temp[5].bias) )
    
         output =  1 / (1+Math.exp(-(input)));
        
    
         temp[5].input=input;
         temp[5].output=output;
    
        
           
          
           result.push(temp[5].output);
    
        }
       
            
        
            
        
        
      
       
        
    }

    