function sigmoid(x){
	
	x = 1/(1 + Math.exp(-x));
	return x;

}


inputs = [0, 0, 0, 0];

W = [];

hidden = [0, 0];

V = [];

Y = 0;

//инициализация весов случайными значениями [0, 1]
for(let i = 0; i < 2; i++){
	
	W[i] = [];
	
	for(j = 0; j < 3; j++){
		W[i][j] = Math.random()*Math.pow(-1, (Math.round(Math.random()*2 + 1)));
	}
	
}

for(let i = 0; i < 2; i++){
	V[i] = Math.random()*Math.pow(-1, (Math.round(Math.random()*2 + 1)));
}

function go(inputs){
	
	for(let i = 0; i < 2; i++){
		
		hidden[i] = 0;
		
		for(let j = 0; j < 3; j++){
			
			hidden[i] += inputs[j]*W[i][j];
		
		}
		
		hidden[i] = sigmoid(hidden[i]);
		
	}
	
	Y = sigmoid(hidden[0]*V[0] + hidden[1]*V[1]);
	
	//console.log(Y);
	
}



epoch = 1000000;
inter = 0;

function train(){
	
error = 0;
d = 0;				//дельта для весов скрытого слоя
offset = 0; 		//смещение для весов нейронов скрытого слоя
offsets = [];		//смещения для весов нейронов входного слоя
h = 1;    			//скорость обучения
d1 = [];			//дельты весов входных нейронов
	

for(inter = 0; inter < epoch; inter++){
	
for(let i1 = 0; i1 < training_sample.length; i1++){
	
	go(training_sample[i1]);
	
	error = 1/2 * (Y - training_sample[i1][3])*(Y - training_sample[i1][3]);
	
	//считаем дельту для Y
	d = Y - training_sample[i1][3];
	
	//Считаем смещение для веса первого нейрона из скрытого слоя
	
	offset = d*(Y*(1 - Y))*hidden[0];
	
	//Изменяем вес этого нейрона
	V[0] = V[0] - h*offset;
	
	
	//Считаем смещение для веса второго нейрона из скрытого слоя
	
	offset = d*(Y*(1 - Y))*hidden[1];
	
	//Изменяем вес этого нейрона
	V[1] = V[1] - h*offset;
	
	//----------------переходим к весам входных нейронов
	
	for(let j = 0; j < 2; j++){
		
		d1[j] = d*(Y*(1 - Y))*V[0] + d*(Y*(1 - Y))*V[1];
		offsets[j] = [];
		
		for(let k = 0; k < 3; k++){
			
			offsets[j][k] = d1[j]*hidden[j]*(1.01 - hidden[j])*training_sample[i1][k];
	
			W[j][k] = W[j][k] - h*offsets[j][k];	

		}

	}

	// d1[0] = d*(Y(1 - Y))*V[0] + d*(Y(1 - Y))*V[0];
	
	// offsets[0] = d1[0]*hidden[0]*(1 - hidden[0])*training_sample[i][0];
	
	// W[0][0] = W[0][0] - h*offsets[0];
	
	
}

}
console.log(inter);
	
}


// sum zp quantity Y
// scale: 1000 - 1; 100 - 1; 10 - 1;
training_sample = [
	[0.15, 0.5, 0, 1],
	[0.150, 0.30, 1, 1],
	[0.900, 0.10, 0, 0],
	[0.900, 0.10, 1, 0],
	[0.900, 3.00, 0, 1],
	[0.900, 2.00, 1, 1],
	[0.900, 0.50, 1.5, 1],
	[0.900, 0.40, 2, 1],
	[0.900, 0.50, 1, 0],
	[0.500, 1.00, 0, 0],
	[0.500, 1.00, 1, 1],
	[1.000, 1.00, 0, 0],
	[1.000, 1.00, 1, 1],
	[0.100, 0.10, 1.2, 1],
	[0.100, 0.10, 0, 0],
	[0.300, 0.30, 0.5, 1],
	[0.300, 0.30, 0, 0],
	[0.350, 0.30, 0.5, 0],
	[0.350, 0.30, 0.7, 1],
	[0.100, 0, 52, 0],
	[0.100, 0.10, 0.5, 1],
	[0.100, 1.00, 0, 1],
	[0.800, 0.70, 0.3, 1],
	[0.800, 0.30, 2, 1],
	[0.800, 0.40, 1.5, 1],
	[0.800, 2.50, 0, 1],
	[0.800, 2.20, 0.5, 1],
	[0.800, 0.50, 1, 1]
];


