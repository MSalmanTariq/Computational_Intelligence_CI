

const n = 25;
const m = 20;
var ln = 0;

var individuals = [];
var generation =0;
var getFitness = false;
var fitArray = [];



mainFunction();
/* crossover(); */

function evolutionFunction(individual) {

    var i;
    var array = [];
    array = individual;

    var length = individual.length;
    var score = 0;

    for (i = 0; i < length; i++) {

        var r = i;
        var c = array[i];

                if (leftBackDiagnal(individual, r, c, length)) {

                    if (leftForwardDiagnal(individual, r, c, length)) {

                        if (rightBackDiagnal(individual, r, c, length)) {

                            if (rightForwardDiagnal(individual, r, c, length)) {

                                score++;
                            }

                        }
                    }

                }

            }



    return score


}

function leftBackDiagnal(individual, r, c, length) {

    var temp = individual;
    if (r !== 0 && c !== 0) {

        while (c !== 0 && r !== 0) {

            c = c - 1;
            r = r - 1;

            if (temp[r] === c) {
                return false;
            }

        }
    }
    else {
        return true
    }


    return true
}

function leftForwardDiagnal(individual, r, c, length) {

    var temp = individual;
    if (r !== length && c !== length) {

        while (c !== length && r !== length) {

            c = c + 1;
            r = r + 1;

            if (temp[r] === c) {

                return false;
            }

        }
    }
    else {
        return true
    }


    return true
}


function rightBackDiagnal(individual, r, c, length) {

    var temp = individual;
    if (r !== 0 && c !== length) {

        while (c !== length && r !== 0) {

            c = c + 1;
            r = r - 1;

            if (temp[r] === c) {
              
                return false;
            }

        }
    }
    else {
        return true
    }


    return true
}

function rightForwardDiagnal(individual, r, c, length) {

    var temp = individual;
    if (r !== length && c !== 0) {

        while (c !== 0 && r !== length) {

            c = c - 1;
            r = r + 1;

            if (temp[r] === c) {
               
                return false;
            }

        }
    }
    else {
        return true
    }


    return true
}


/* function upCol(individual, r, c, length) {

    var temp = individual;
    if (r !== 0) {

        while (r !== 0) {


            r = r - 1;

            if (temp[r] === c) {
                console.log(r, c)
                return false;
            }

        }
    }
    else {
        return true
    }


    return true
} */

/* 
function downCol(individual, r, c, length) {

    var temp = individual;
    if (r !== length) {

        while (r !== length) {


            r = r + 1;

            if (temp[r] === c) {
                console.log(r, c)
                return false;
            }

        }
    }
    else {
        return true
    }


    return true
} */
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

function createIndividual(length){
    

var arr = []
while(arr.length < length){
    var randomnumber = Math.floor(Math.random()*ln) + 0;
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
}
return arr;
}


function mainFunction(){
    ln = 50;
    var i;

    for(i=0;i<n;i++){
       var ind = createIndividual(ln);
       var score = evolutionFunction(ind);
       
      
      
        while(score==ln){
           
            ind = createIndividual(ln);
            score = evolutionFunction(ind)
           } 
      
     
       

        var indObj = {

            individual : ind,
            fitnessScore : score
        }
        individuals.push(indObj)

    }
    i=0;
    console.log('Initial population : ')
    while(individuals[i]){
        console.log('Individual: '+individuals[i].individual+'     Fitness Score: '+individuals[i].fitnessScore);
        i++;
    }

    while (!getFitness){
        generation++;
       
        for(d=0;d<m/2;d++){

            
        // select random 1st parent
        var index1 = Math.floor(Math.random()*n) + 0;

      
    
      
        //select random 2nd parent
        var index2 = Math.floor(Math.random()*n) + 0;

        while(index1===index2){
            index2 = Math.floor(Math.random()*n) + 0;

           
          }

          var parent1 = individuals[index1];
          var parent2 = individuals[index2];

        //***************************   Crossover -- 2 point   ***************************8 */
    var x,y;
    var ans = Math.floor(ln / 2);

  
    var A = 0;
    var B = 0;
    var C = 0;

    var arrayA=[];
    var arrayB=[];






   //***************************   For Child 1   ***************************8 */
        A,B,C=0;
 //for A

    

 for(x=0;x<ans;x++){
     
     arrayA.push(parent1.individual[x])
   
 }


 
 // for B
 
 for(x=ans ;x<ln;x++){
    var found = arrayA.indexOf(parent2.individual[x]);
    if(found!=-1){

    }
    else{
    arrayA.push(parent2.individual[x])
    }
    
 }


 //for C

 
 var p = 0;
 
while(arrayA.length<ln){

   
  
        var found = arrayA.indexOf(parent1.individual[p]);
        if(found!=-1){
            p++;
        }
        else{
        arrayA.push(parent1.individual[p])
        p++;
        } 
    
}







//***************************   For Child 2   ***************************8 */

 A,B,C=0;
 //for A

    
 
 for(x=0;x<ans;x++){
     arrayB.push(parent2.individual[x])
 }


  // for B
  
  for(x=ans ;x<ln;x++){
     var found = arrayB.indexOf(parent1.individual[x]);
     if(found!=-1){
 
     }
     else{
     arrayB.push(parent1.individual[x])
     }
     
  }
 
 
  //for C
 
 
   p = 0;

 while(arrayB.length<ln){
 
   
         var found = arrayB.indexOf(parent2.individual[p]);
         if(found!=-1){
             p++;
         }
         else{
         arrayB.push(parent2.individual[p])
         p++;
         } 
     
 }





 //*********************************  Mutation *****************************************/


 //***************************   For Child 1   ****************************/

    if(probability(75)){
     
        //mutation
        var mutationIndex1 = Math.floor(Math.random()*ln) + 0;
        var mutationIndex2 = Math.floor(Math.random()*ln) + 0;
        while(mutationIndex1===mutationIndex2){
            mutationIndex2 = Math.floor(Math.random()*ln) + 0;
           
          }


          //swap

          var tempVar = arrayA[mutationIndex1];
          arrayA[mutationIndex1] = arrayA[mutationIndex2];
          arrayA[mutationIndex2] = tempVar;


          
    }
    else{
        //not mutated
      

    }

        //calculate fitness of child1
        var childScore1 = evolutionFunction(arrayA);

        

            var individualObj1 = {

                individual : arrayA,
                fitnessScore : childScore1

            }
            if(childScore1==ln){
            getFitness=true;
            fitArray.push(individualObj1)

            }
            individuals.push(individualObj1);




//***************************   For Child 2   ****************************/

    if(probability(75)){
      
        //mutation
        var mutationIndex1 = Math.floor(Math.random()*ln) + 0;
        var mutationIndex2 = Math.floor(Math.random()*ln) + 0;
        while(mutationIndex1===mutationIndex2){
            mutationIndex2 = Math.floor(Math.random()*ln) + 0;
           
          }


          //swap

          var tempVar = arrayB[mutationIndex1];
          arrayB[mutationIndex1] = arrayB[mutationIndex2];
          arrayB[mutationIndex2] = tempVar;


          
    }
    else{
        //not mutated
      


    }

        //calculate fitness of child1
        var childScore2 = evolutionFunction(arrayB);

            var individualObj2 = {

                individual : arrayB,
                fitnessScore : childScore2

            }
            if(childScore2==ln){
                getFitness=true;
                fitArray.push(individualObj2)
    
                }
            individuals.push(individualObj2);



 
        
        }
        var byFitness = individuals.slice(0);
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
      

        individuals=[];
       
        individuals = tempArr;
        e=0;
        console.log('generation: ' + generation)
        while(individuals[e]){
            console.log('Individual: '+individuals[e].individual+'     Fitness Score: '+individuals[e].fitnessScore);
            e++;
        }
      
       
    }

  
    console.log("Total Generations : " +generation);
  
    console.log("Fit Answers in Generation : ");
    var o = 0;
    while(fitArray[o]){
        console.log('Individual: '+fitArray[o].individual+'     Fitness Score: '+fitArray[o].fitnessScore);
        o++;
    }
    


    
    var w = 0;
    console.log('')
    for(w=0;w<ln;w++){
        
        var indArr = fitArray[0].individual;

        var t=0;

        for(t=0;t<ln;t++){
            if(t==indArr[w]){
                
                process.stdout.write(' 1 ');
            }
            else{
                
                process.stdout.write(' 0 ');
            }
        }
        
        console.log('')
    }

}


