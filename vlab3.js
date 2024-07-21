function simulasi3(){
aturCanvas();
setJudul("Bullet Motion");
hapusLayar("#b3cfe5");

//listener untuk membaca event mouse
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var graf = {startX:180, startY:150, dataW:10, dataH:4, tileW:40, skalaX:10, skalaY:10, desimalX:0, desimalY:0, offsetX:0, offsetY:4, xLabel:'x (m)', yLabel:'y (m)', fontLabel:'12pt Calibri', warnaBG:'#daf6fb', warnaGaris:'#000', warnaLabel:'#000'}

var slider1 = {tipe:"H", nama:"Kecepatan", x:280,y:460, p:200, minS:10, maxS:30, valS:20, desimal:1, label:"m/s"}
var slider2 = {tipe:"H", nama:"Sudut", x:280,y:520, p:200, minS:0, maxS:90, valS:45, desimal:0, label:"⁰"}

var index = -1;
var xBase = 180;
var yBase = 150;
var yStart = yBase+160;
var warnaGaris = 'green';
var radius = 3;
var a = -10.0;
var vInit = 20.0;
var angle = 45.0;
var theta = angle*Math.PI/180.0;
var vInitx = vInit*Math.cos(theta);
var vInity = vInit*Math.sin(theta);
var maxTime = -2.0*vInity/a;
var time = 0.0;
var range = vInitx*maxTime;
var maxHeight = -vInity*vInity/(2.0*a);
var timer;
var simAktif = 1;

function setSimulasi(){
	if ((yPos < 0 ) || (time == maxTime)) simAktif = 0;
	//jika animasi aktif
	if (simAktif == 1) index = index + 1;
	//hapus layar
	hapusLayar();

	//menampilkan teks
	teks("Bullet Motion", 0.5*(canvas.width), 40, 'bold 18pt Calibri', 'blue', 'center');
	teks("Simulation of the motion of a bullet launched with an initial speed and a certain angle", 0.5*(canvas.width), 75, "12pt Calibri", "#000");

	grafik(graf);

	teks("Initian Velocity = "+vInit+ " m/s", 260, 440, "bold 13pt Calibri", "black", "left");
	slider(slider1);
	teks("Angle = "+angle+ " ⁰", 260, 500, "bold 13pt Calibri", "black", "left");
	slider(slider2);

	//tombol control
	tombol("Play", 150,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Pause", 240,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("<< Step", 330,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Step >>", 420,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Reset", 510,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	
	//menggambar grafis parabola
	var vscale = 4;
	konten.strokeStyle = warnaGaris;
	konten.lineWidth = 3;
	konten.beginPath();
	konten.moveTo(xBase, yStart);
	for (var ival = 1; ival <=index; ival++) {
		var posX = xBase+vscale*vInitx*ival/20.0;
		var posY = yStart-vscale*vInity*(ival/20.0)-vscale*0.5*a*(ival/20.0)*(ival/20.0);
		konten.lineTo(posX, posY);
	}
	konten.stroke();
	
	//menggambar peluru lingkaran	
	time = index/20.0;
	posX = xBase+vscale*vInitx*time;
	posY = yStart-vscale*vInity*time-vscale*0.5*a*time*time;
	lingkaran(posX, posY, radius, 1, "#000", "red");
	
	var yPos = vInity*time+0.5*a*time*time;
	if (yPos < 0.0){
		time = maxTime;
		yPos = 0.0;
	}

	//menambahkan teks
	var timeLabel = 't = ';
	timeLabel = timeLabel + time.toFixed(2) + ' s';
	teks(timeLabel, 130, 380, "bold 14pt Calibri", "#000", "left");

	var xPos = vInitx*time;
	var xPosLabel = 'x = ';
	xPosLabel = xPosLabel + xPos.toFixed(2) + ' m';
	teks(xPosLabel, 230, 380, "bold 14pt Calibri", "#000", "left");

	var yPosLabel = 'y = ';
	yPosLabel = yPosLabel + yPos.toFixed(2) + ' m';
	teks(yPosLabel, 330, 380, "bold 14pt Calibri", "#000", "left");

	teks("g = 10 m/s²", 430, 380, "bold 14pt Calibri", "#000", "left");

	var maxHLabel = 'tinggi max = ';
	maxHLabel = maxHLabel + maxHeight.toFixed(2) + ' m';
	teks(maxHLabel, 550, 380, "bold 14pt Calibri", "#000", "left"); 
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseUp(event){
	//prosedure mengecek tombol
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "Play"){
			window.clearTimeout(timer);
			simAktif = 1;
			index = 0;
			yPos = 0;
			jalankanSimulasi();
		}
		if (tombolAktif == "Reset")	reset();
		if (tombolAktif == "Pause"){
			window.clearTimeout(timer);
			simAktif = 0;
		}
		if (tombolAktif == "<< Step"){
			window.clearTimeout(timer);
			index = index-5;
			if (index < -1) index = -1;
			time = index/20;
			xPos = xBase;
			simAktif = 1;
			setSimulasi();
		}
		if (tombolAktif == "Step >>"){
			window.clearTimeout(timer);
			if ((yPos > 0 ) || (time < maxTime))index = index+5;
			simAktif = 1;
			setSimulasi();
		}
	}
	//menetralisir drag
	canvas.onmousemove = null;
}

function mouseDrag(event){
	//prosedur mengecek slider
	var sliderAktif = cekSlider(event);
	if (sliderAktif != null){
		if (sliderAktif.nama == "Kecepatan") {
			index = 0;
			vInit = Number(sliderAktif.valS);
			vInitx = vInit*Math.cos(theta);
			vInity = vInit*Math.sin(theta);
			maxTime = -2.0*vInity/a;
			range = vInitx*maxTime;
			maxHeight = -vInity*vInity/(2.0*a);
		}
		if (sliderAktif.nama == "Sudut") {
			index = 0;
			angle = Number(sliderAktif.valS);
			theta = angle*Math.PI/180.0;
			vInitx = vInit*Math.cos(theta);
			vInity = vInit*Math.sin(theta);
			maxTime = -2.0*vInity/a;
			range = vInitx*maxTime;
			maxHeight = -vInity*vInity/(2.0*a);
		}
		simAktif = 0;
		setSimulasi();
	}
}

function jalankanSimulasi() {
	setSimulasi();
	if (simAktif == 1) {
		timer = window.setTimeout(jalankanSimulasi, 20);
		mainTimer = timer;
	}
}

function reset(){
	window.clearTimeout(timer);
	simAktif = 0;
	index = 0;
	time = 0.0;
	xPos = xBase;
	jalankanSimulasi();
}

setSimulasi();
}