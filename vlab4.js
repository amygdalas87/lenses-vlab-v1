function simulasi4(){
aturCanvas();
setJudul("Circular Motion");
hapusLayar("#b3cfe5");

//listener untuk membaca event mouse
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var index = -1;
var yBase = 280;
var xSupport = 250;
var ySupport = yBase;
var xBase = xSupport-180;
var xGraph = xSupport+270;
var yGraph = ySupport-160;
var time = 0.0;
var length = 1.2;
var rodLength = 100;
var omega = 2.0;
var radius = 6;
var xPos;
var yPos;
var timer;
var simAktif = 1;


var slider1 = {tipe:"H", nama:"omega", x:100,y:515, p:200, minS:1, maxS:4, valS:2, desimal:2, label:"rad/s"}
var slider2 = {tipe:"H", nama:"radius", x:420,y:515, p:200, minS:0.5, maxS:1.2, valS:1.2, desimal:2, label:"m"}

var pegas1 = {x1:xBase, y1:yBase+150, x2:xBase+0.95*(xPos-xBase), y2:yBase+150, putaran:10, lebar:20, offset:10, warna1:"#2e2e2e", warna2:"#b7b7b7", tebal:"5"}
var pegas2 = {x1:xSupport+150, y1:ySupport-180, x2:xSupport+150, y2:ySupport-180+1.0*(yPos-(ySupport-180)), putaran:10, lebar:20, offset:10, warna1:"#2e2e2e", warna2:"#b7b7b7", tebal:"5"}
   
var graf = {startX:xGraph, startY:yGraph, dataW:5, dataH:8, tileW:40, skalaX:2, skalaY:0.4, desimalX:0, desimalY:1, offsetX:0, offsetY:4, xLabel:'t (s)', yLabel:'y (m)', fontLabel:'12pt Calibri', warnaBG:'#daf6fb', warnaGaris:'#000', warnaLabel:'#000'}

function setSimulasi() {
	if (time >= 100.0) simAktif = 0;
	if (simAktif == 1) {  
		hapusLayar();
		//menampilkan teks
		teks("Circular Motion", 0.5*(canvas.width), 40, 'bold 18pt Calibri', 'blue', 'center');
		teks("Simulation of the movement of objects on a circular path", 0.5*(canvas.width), 60, "12pt Calibri", "#000", "center");

		//tombol control
		tombol("Play", 150,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
		tombol("Pause", 240,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
		tombol("<< Step", 330,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
		tombol("Step >>", 420,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
		tombol("Reset", 510,560, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");

		//slider
		teks("Omega = "+omega+" rad/s", slider1.x-15, slider1.y-20, "bold 13pt Calibri", "black", "left");
		slider(slider1);
		teks("Radius = "+length+" m", slider2.x-15, slider2.y-20, "bold 13pt Calibri", "black", "left");
		slider(slider2);

		// pusat lingkaran dan lintasan
		lingkaran(xSupport, ySupport, radius, 2, "black", "black");
		lingkaran(xSupport, ySupport, length*rodLength, 1, "black", "none");		 
		for (i=0; i<=5; i++) {
			garis(xSupport-length*rodLength*Math.sin(30*i*Math.PI/180),ySupport-length*rodLength*Math.cos(30*i*Math.PI/180),xSupport+length*rodLength*Math.sin(30*i*Math.PI/180),ySupport+length*rodLength*Math.cos(30*i*Math.PI/180), 1, "black");
		}

		// bola yang bergerak melingkar
		index = index + 1;
		time = index/100.0;
		xPos = xSupport + length*rodLength*Math.cos(omega*time);
		yPos = ySupport - length*rodLength*Math.sin(omega*time);  
		lingkaran(xPos,yPos, 2*radius, 1, "red", "red");
		 
		// garis indikator Horisontal
		for (i = -2; i<=2; i++) {
			garis(xSupport+60*i, yBase+130, xSupport+60*i, yBase+170);
		}

		// Bola pada pegas dengan Gerakan Harmonik Sederhana
		lingkaran(xPos, yBase+150, 2*radius, 2, "black", "#f6f");
		
		// Tumpuan Pegas dan Pegas Horisontal
		garis(xBase, yBase+130, xBase, yBase+170, 4);	  
		pegas1.x2 = xBase+(xPos-xBase)-2*radius;
		pegas(pegas1);
	 
		// garis indikator vertikal
		for (i = -2; i<=2; i++) {
			garis(xSupport+130, ySupport+60*i, xSupport+170, ySupport+60*i);
		}
		// Bola pada pegas dengan Gerakan Harmonik Sederhana
		lingkaran(xSupport+150, yPos, 2*radius, 2, "black", "#6ff");
		 
		// tumpuan Pegas dan Pegas vertikal
		garis(xSupport+130, ySupport-180,xSupport+170, ySupport-180, 4);
		pegas2.y2=ySupport-180+1.0*(yPos-(ySupport-180)-2*radius);
		pegas(pegas2);

		// Grafik untuk menampilkan gerakan bola
		grafik(graf);
		konten.strokeStyle = "red";
		konten.beginPath();
		konten.moveTo(xGraph, yGraph+40*4);
		var maxIndex = 1000;
		if (maxIndex > index) maxIndex = index;
		for (var ival = 1; ival <=maxIndex; ival++) {
			konten.lineTo(xGraph+ival/5, ySupport - length*rodLength*Math.sin(omega*ival/100));
		}
		konten.stroke();

		var timeLabel = 'waktu (t) = ';
		timeLabel = timeLabel + time.toFixed(2) + ' s';
		teks(timeLabel, 120,100);
	}
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseDrag(event){
	//prosedur mengecek slider
	var sliderAktif = cekSlider(event);
	if (sliderAktif != null){
		//console.log(sliderAktif.nama);
		if (sliderAktif.nama == "omega") {
			omega = Number(sliderAktif.valS);
			reset();
		}
		if (sliderAktif.nama == "radius") {
			length = Number(sliderAktif.valS);
			reset();
		}
	}
}

function mouseUp(event){
	//prosedure mengecek tombol
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "Play"){
			window.clearTimeout(timer);
			simAktif = 1;
			jalankanSimulasi();  
		}
		if (tombolAktif == "Reset")	reset();
		if (tombolAktif == "Pause"){
			window.clearTimeout(timer);
			simAktif = 0;
		}
		if (tombolAktif == "<< Step"){
			window.clearTimeout(timer);
			index -= 2;
			if (index < -1) index = -1;
			simAktif = 1;
			setSimulasi();
		}
		if (tombolAktif == "Step >>"){
			window.clearTimeout(timer);
			simAktif = 1;
			setSimulasi();
		}
	}
	canvas.onmousemove = null;
}

function reset() {
	window.clearTimeout(timer);
	index = -1;
	time = 0.0;
	omega = Number(slider1.valS);
	length = Number(slider2.valS);
	simAktif = 1;
	setSimulasi();
}

function jalankanSimulasi() {
	setSimulasi();
	if (simAktif == 1) {
		timer = window.setTimeout(jalankanSimulasi, 1);
		mainTimer = timer;
	}
}

setSimulasi();
}