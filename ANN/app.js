var fs = require('fs');
var csv = require('fast-csv');
var arr = [];
var errors=[];
var errPtr=-1;
var start = 1;
var tuple = 3;
var learningRate = 0.5
var fileName = "NN-DATA.csv"
fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", function (data) {

        /*  console.log(data); */
        arr.push(data);
    })
    .on("end", function () {
        console.log(fileName + " file readed successfully!")

        mainAnn();
        /*        console.log(arr[1])
               console.log(Number(arr[1][0])) */
    });
var neurons = [];
function mainAnn() {

    //initializing network



    neuron_1 = {
        name: 1,
        input: Number(arr[tuple][0]),
        output: Number(arr[tuple][0]),
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: 0.2
            },

            {
                linkTo: 5,
                weight: -0.3
            }
        ]
    }


    neuron_2 = {
        name: 2,
        input: Number(arr[tuple][1]),
        output: Number(arr[tuple][1]),
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: 0.4
            },

            {
                linkTo: 5,
                weight: 0.1
            }
        ]
    }


    neuron_3 = {
        name: 3,
        input: Number(arr[tuple][2]),
        output: Number(arr[tuple][2]),
        type: 'input',
        bias: null,
        link: [
            {
                linkTo: 4,
                weight: -0.5
            },

            {
                linkTo: 5,
                weight: 0.2
            }
        ]
    }


    neuron_4 = {
        name: 4,
        input: null,
        output: null,
        type: 'hidden',
        bias: null,
        link: [
            {
                linkTo: 6,
                weight: -0.3
            }
        ]
    }


    neuron_5 = {
        name: 5,
        input: null,
        output: null,
        type: 'hidden',
        bias: null,
        link: [
            {
                linkTo: 6,
                weight: -0.2
            }
        ]
    }


    neuron_6 = {
        name: 6,
        input: null,
        output: null,
        type: 'output',
        bias: null,
        link: null
    }

    neurons.push(neuron_1, neuron_2, neuron_3, neuron_4, neuron_5, neuron_6);

    

   
      
        do{
            //for hidden layer
        neurons.forEach(calculateHiddenLayer);

        //for output layer
         neurons.forEach(calculateOutputLayer);
            backpropagation();
        
            errPtr++;
        }
        while(Number(errors[errors.length-1])>0.005);

    }



function calculateHiddenLayer(item, index) {
    var name;
    var counter = 0;
    var links = [];
    var inputAns = 0;
    var outputAns = 0;
    var bais = -0.4;


    if (item.type === 'hidden') {
        name = item.name;


        while (counter != neurons.length) {
            var temp = 0;
            if (neurons[counter].link != null) {
                for (temp = 0; temp < neurons[counter].link.length; temp++) {
                    if (neurons[counter].link[temp].linkTo === name) {
                        var obj = neurons[counter].link[temp];
                        obj.input = neurons[counter].input;
                        links.push(obj);


                    }
                }
            }
            counter++;
        }
       
        //hidden layer
        //input

        var temp = 0;
        for (temp = 0; temp < links.length; temp++) {
            var tempAns = links[temp].weight * links[temp].input;
            inputAns = inputAns + tempAns;
        }
        inputAns=inputAns + bais;

       


        //output

        outputAns = 1 / (1+Math.exp(-(inputAns)));
      

        var tempCount = 0;
        var pointer ;
        for(tempCount=0;tempCount<neurons.length;tempCount++){
            if(neurons[tempCount].name===name){
                pointer=tempCount;
            }
        }

        neurons[pointer].input=inputAns;
        neurons[pointer].output=outputAns;

        console.log(neurons[pointer])

    }

    


}

function calculateOutputLayer(item, index) {
    var name;
    var counter = 0;
    var links = [];
    var inputAns = 0;
    var outputAns = 0;
    var bais = -0.4;


    if (item.type === 'output') {
        name = item.name;


        while (counter != neurons.length) {
            var temp = 0;
            if (neurons[counter].link != null) {
                for (temp = 0; temp < neurons[counter].link.length; temp++) {
                    if (neurons[counter].link[temp].linkTo === name) {
                        var obj = neurons[counter].link[temp];
                        obj.input = neurons[counter].output;
                        links.push(obj);


                    }
                }
            }
            counter++;
        }
    
        //output layer
        //input

        var temp = 0;
        for (temp = 0; temp < links.length; temp++) {
            var tempAns = links[temp].weight * links[temp].input;
            inputAns = inputAns + tempAns;
        }
        inputAns=inputAns + bais;

       


        //output

        outputAns = 1 / (1+Math.exp(-(inputAns)));
      

        var tempCount = 0;
        var pointer ;
        for(tempCount=0;tempCount<neurons.length;tempCount++){
            if(neurons[tempCount].name===name){
                pointer=tempCount;
            }
        }

        neurons[pointer].input=inputAns;
        neurons[pointer].output=outputAns;

        console.log(neurons[pointer])
    }

}

function backpropagation(){
    console.log('iteration: '+start)
    start++;
    var err1 = errCalculateOutput();
    errors.push(err1);

    //for node 4
    var sum1 = Number(neurons[3].link[0].weight)*Number(err1);
    var err2 = errCalculateHidden(sum1,3);

    //for node 5
    var sum2 = Number(neurons[4].link[0].weight)*Number(err1);
    var err3 = errCalculateHidden(sum2,4);
  

    //weight 46

    var dW = Number((learningRate)*(err1)*(neurons[3].output))
    var newWeight = Number((neurons[3].link[0].weight)+(dW));
    neurons[3].link[0].weight=newWeight
    console.log(newWeight)  

    //weight 56

    dW = Number((learningRate)*(err1)*(neurons[4].output))
    newWeight = Number((neurons[4].link[0].weight)+(dW));
    neurons[4].link[0].weight=newWeight
    console.log(newWeight)  

    //weight 14

    dW = Number((learningRate)*(err2)*(neurons[0].output))
    newWeight = Number((neurons[0].link[0].weight)+(dW));
    neurons[0].link[0].weight=newWeight;
    console.log(newWeight) 
    
    
    //weight 15

    dW = Number((learningRate)*(err3)*(neurons[0].output))
    newWeight = Number((neurons[0].link[1].weight)+(dW));
    neurons[0].link[1].weight=newWeight
    console.log(newWeight) 


    //weight 24

    dW = Number((learningRate)*(err2)*(neurons[1].output))
    newWeight = Number((neurons[1].link[0].weight)+(dW));
    neurons[1].link[0].weight=newWeight
    console.log(newWeight) 


    //weight 25

    dW = Number((learningRate)*(err3)*(neurons[1].output))
    newWeight = Number((neurons[1].link[1].weight)+(dW));
    neurons[1].link[1].weight=newWeight
    console.log(newWeight) 


    //weight 34

    dW = Number((learningRate)*(err2)*(neurons[2].output))
    newWeight = Number((neurons[2].link[0].weight)+(dW));
    neurons[2].link[0].weight=newWeight
    console.log(newWeight) 


      //weight 35

      dW = Number((learningRate)*(err3)*(neurons[2].output))
      newWeight = Number((neurons[2].link[1].weight)+(dW));
      neurons[2].link[1].weight=newWeight
      console.log(newWeight) 

    
  
   /*  console.log(err1)
    console.log(err2)
    console.log(err3) */
   


}

function errCalculateOutput(){
    var err = ((Number(arr[tuple][3])-neurons[5].output)*(Number(neurons[5].output))*(Number(1-neurons[5].output)));
    return err;
}


function errCalculateHidden(sum,ind){
    var err = ((Number(neurons[ind].output))*(Number(1-neurons[ind].output))*Number(sum));
   
    return err;
}

