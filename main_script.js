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
console.log(i+' '+j);
i++;


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
	
	if((img_data[i]!=255) && (img_data[i+1]!=255) && (img_data[i+2]!=255) /* (img_data[i+3]!=0)*/){
		
		enters[j] = 1.0;
	
	}else{
		
		enters[j] = 0.0;
		
	}
	
	j++;
}
	
//console.log(enters);
}


//Basic go-----------------------
max = 0;
id_max = 0;	 
function recognize(){
max = 0;
id_max = 0;	
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
	
	
for(i = 0; i<10; i++){
	
	if(output[i]>max){
	id_max = i;
	max = output[i];
	}
}
//console.log(output);
	
}


p = 0;
epoh = 7500;

learn_img = [];

for(u = 0; u<10; u++){
		
	learn_img[u] = new Image;	
	learn_img[u].src = u+'.png';

}

function preparation(){
	u = Math.round(Math.random()*9);
	u1 = Math.round(Math.random()*9);
	u2 = Math.round(Math.random()*4);
	ctx.drawImage(learn_img[u], u1*32, u2*32, 32, 32, 0, 0, 32, 32);
}

basic_error = [];

function train(){

learn_rate = 1;
error = 0;
errors = [];
weights_delta = [];
weights_delta_2 = [];
weights_delta_3 = [];

//for(p = 0; p < epoh; p++){

progress = Math.round((p / epoh)*100);

	//for(u = 0; u < 4; u++){
	
	//console.log(values[u]+' '+x);
	preparation();
	read();
	recognize();
	
	//count basic errors
	for(i = 0; i<10; i++){
		
		if(i==id_max){
			basic_error[i] = output[i] - 1;
		}else{  
			basic_error[i] = output[i] - 0;
		}
	
	}
	//console.log('3;5ijnn ');
//последний слой 
for(i = 0; i<10; i++){

	weights_delta[i] = new Array();
	
	for(j = 0; j<30; j++){
		weights_delta[i][j] = basic_error[i]*output[i]*(1 - output[i]);
			//console.log('1  '+basic_error[i]+'    '+weights_delta[i][j]);
		weights_3[i][j] = weights_3[i][j] - values_2[j]*weights_delta[i][j]*learn_rate;
	}
}
	
//предпоследний слой	
	//отдельно считаем ошибку
	for(i = 0; i<30; i++){
		weights_delta_2[i] = new Array();
		for(j = 0; j<10; j++){	
		errors[i] = weights_3[j][i]*weights_delta[j][i];
		}
	}
	
	for(i = 0; i<30; i++){
		weights_delta_2[i] = new Array();
		for(j = 0; j<30; j++){	
			
		weights_delta_2[i][j] = (errors[i]*values_2[j])*(1 - values_2[i]);
			//console.log('1  '+errors[i]+'    '+weights_delta_2[i][j]);
		weights_2[i][j] = weights_2[i][j] - values_1[j]*weights_delta_2[i][j]*learn_rate;
		}

	}
//второй слой	
	//jnltkmyj cxbnftv jib,re
	
	for(i = 0; i<30; i++){
		
		for(j = 0; j<30; j++){	
			
		errors[i] = weights_2[i][j]*weights_delta_2[i][j];
		}

	}
	
	for(i = 0; i<30; i++){
		weights_delta_3[i] = new Array();
		for(j = 0; j<1024; j++){	
		
		weights_delta_3[i][j] = (errors[i]*enters[j])*(1 - enters[j]);//дельта будет всегда равняться нулю
			//console.log('1  '+errors[i]+'    '+weights_delta_3[i][j]);
		weights_1[i][j] = weights_1[i][j] - enters[j]*weights_delta_3[i][j]*learn_rate;
		}

	}

	//document.getElementById("results").innerHTML = 'Progress: '+progress+'%<br>Error: '+error;

	//}
//}
p++;
if(p == epoh){

clearInterval(timerId_train);
alert("Stop");
document.getElementById("results").innerHTML += '<br>'+id_max+'<br>';

}
console.log(p);
}



function go_train(){
timerId_train = setInterval(train, 10);
}
