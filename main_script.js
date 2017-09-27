function sigmoid(t) {
   return 1/(1+Math.pow(Math.E, -t));
   //return (Math.pow(Math.E, 2*t) - 1)/(Math.pow(Math.E, 2*t) + 1);
}

var enters = []; // entered data(pixels)

var weights_1 = []; //weights for neurons on first layer [1024, 30]

values_1 = []; //values second layer [30]

weights_2 = []; //weights for neurons on second layer [30, 30]

values_2 = []; //values second layer [30]

weights_3 = []; //weights for neurons on third layer [30, 10]

output = []; //values fifth layer [10]


i = 0;
j = 0;
//Important!: создание вторых массивов
weights_1[0] = new Array();
weights_2[0] = new Array();
weights_3[0] = new Array();
//--------------

//---
function identify_weights(){

//for(i = 0; i<10000;	i++){

	//for(j = 0; j<3000; j++){
		
		
		weights_1[j][i] = Math.random();
		
		if((i<30)&&(j<30)){
		
		weights_2[j][i] = Math.random();
		}
		
		if((i<30)&&(j<10)){
		
		weights_3[j][i] = Math.random();
		}
		
//	}
//}
i++;
console.log(i+' '+j);

if((i >= 1024)&&(j >= 30)){
clearInterval(timerId);

console.log(weights_3);
}

if(i == 1024){
i = 0;
j++;	
//Important!: создание вторых массивов
weights_1[j] = new Array();
weights_2[j] = new Array();
weights_3[j] = new Array();
//----
}



}

function go(){
timerId = setInterval(identify_weights, 0.3);
}



//For reading img data

function read(){
var img_data = ctx.getImageData(0,0,32,32).data; //get all information about all pixels

j = 0;

for(i = 0; i < 4*32*32; i+=4){
	
	if((img_data[i]!=0) || (img_data[i+1]!=0) || (img_data[i+2]!=0) || (img_data[i+3]!=0)){
		
		enters[j] = 1.0;
	
	}else{
		
		enters[j] = 0.0;
		
	}
	
	j++;
}
	
console.log(enters);
}


//Basic go-----------------------

function recognize(){
	
//first layer
for(i = 0; i<30; i++){
	
	values_1[i] = 0;
	
	for(j = 0; j<1024; j++){
		
		values_1[i] += weights_1[i][j]*enters[j];
		
	}
	values_1[i] = sigmoid(values_1[i]);
	//console.log(values_1);

}

//second layer

for(i = 0; i<30; i++){
	
	values_2[i] = 0;
	
	for(j = 0; j<30; j++){
		
		values_2[i] += weights_2[i][j]*values_1[j];
		
	}
	values_2[i] = sigmoid(values_2[i]);
//console.log(values_2);
}

//third layer

for(i = 0; i<10; i++){
	
	output[i] = 0;
	
	for(j = 0; j<30; j++){
		
		output[i] += weights_3[i][j]*values_2[j];
		
	}
	output[i] = sigmoid(output[i]);
//console.log(output);
}
	
console.log(output);
	
}