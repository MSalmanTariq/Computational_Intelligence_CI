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

generateParent();
/* fitnessProportion(individual,2);
rankBased(individual,1); */
/* mainProgram();
setTimeout(function() {
    plotGraph();  
}, 1000);
 */

 tournamentSelection(individual,2)


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


function generateParent(){

    var i = 0 ;
    for(i=0;i<n;i++){

        var x_y = getXandY();
        var fitness = solveEquation(x_y.x,x_y.y);

        var obj = {
            x  : x_y.x,
            y :  x_y.y,
            fitness : fitness
        }

        individual.push(obj);
    }
}

/*
fitness proportion function 
 param : 1 = population array
         2 = mode (1 => parent selection / 2 => survival selection)



*/


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
            console.log(newArr)

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
            console.log(randomNum)
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
            console.log(randomNum)
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
            console.log(newArr)

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         while(parentArr.length!=n){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
            console.log(randomNum)
             while(find===false){
                 if(newArr[j].commutative>=randomNum){

                    if(i!=0){
                        console.log('this1')
                        if(parentArr.indexOf(newArr[j])===-1){
                            console.log('this2')
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

       console.log(parentArr);

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

            console.log(population)
            var newArr = [];

            //total fitness
            var totalFitness =getTotalFitness(population);
            console.log(totalFitness)
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
            console.log(newArr)

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         for(i=0;i<2;i++){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
            console.log(randomNum)
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
            console.log(randomNum)
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

            console.log(population)
            //total fitness
            var totalFitness =getTotalFitness(population);
            console.log(totalFitness)

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
            console.log(newArr)

            // create 2 random number from 0 - 1

          
          

         // find commutation against random number
        

         i=0;
         j=0;
         parentArr=[];

         while(parentArr.length!=n){
            var randomNum = (Math.random() * (1 - 0) + 0);
             var find = false;
            j=0;
            console.log(randomNum)
             while(find===false){
                 if(newArr[j].commutative>=randomNum){

                    if(i!=0){
                        console.log('this1')
                        if(parentArr.indexOf(newArr[j])===-1){
                            console.log('this2')
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

                console.log(ran1,ran2)

                preSelect.push(population[ran1]);
                preSelect.push(population[ran2]);

                console.log(preSelect)

                var byFitness = preSelect.slice(0);
                byFitness.sort(function(a,b) {
                    return b.fitnessScore - a.fitnessScore;
                });

                console.log(byFitness);

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
                  

                var ran1 = (Math.floor(Math.random() * n) + 1)-1;
                var ran2 = (Math.floor(Math.random() * n) + 1)-1;

                while(ran1 === ran2){
                    ran2 = (Math.floor(Math.random() * 25) + 1)-1;
                }

                console.log(ran1,ran2)

                preSelect.push(population[ran1]);
                preSelect.push(population[ran2]);

                console.log(preSelect)

                var byFitness = preSelect.slice(0);
                byFitness.sort(function(a,b) {
                    return b.fitnessScore - a.fitnessScore;
                });

                console.log(byFitness);

                selection.push(byFitness[0]);


            

            }
            console.log(selection);
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

      var parent1 = [];
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

