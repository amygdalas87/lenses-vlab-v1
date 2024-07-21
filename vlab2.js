function simulasi2(){
aturCanvas();
setJudul("Lenses");
hapusLayar("#b3cfe5");

//listener untuk membaca event mouse
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var x1 = 310;
var y1 = 210;
var radius = 150;
var jarakBenda = -100;
var tinggiBenda = 20;
var warnaBenda = '#933';
var warnaBayangan = '#339';
var f = 50;
var jarakBayangan;
var tinggiBayangan;
var slope;
var jenisLensa = 1;
var lensRadius = 100;
var label = "Convex Lens";

var slider1 = {tipe:"H", nama:"jarak", x:150,y:440, p:200, minS:-200, maxS:-25, valS:-100, desimal:0, label:"cm"}
var slider2 = {tipe:"H", nama:"tinggi", x:150,y:500, p:200, minS:-50, maxS:50, valS:20, desimal:0, label:"cm"}
var slider3 = {tipe:"H", nama:"fokus", x:150,y:560, p:200, minS:30, maxS:100, valS:50, desimal:0, label:"cm"}

var simAktif = 1;

function setSimulasi(){
	hapusLayar();
	//menampilkan teks
	teks(label, 0.5*(canvas.width), 40, 'bold 18pt Calibri', 'blue', 'center');
	teks("Simulation of light in convex and concave lenses", 0.5*(canvas.width), 60, "12pt Calibri", "#000", "center");

	//tombol control
	tombol("Convex Lens", 500, 540, 120, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Concave Lens", 640,540, 120, 30, "bold 11pt Calibri", "white", "black", "gray", "r");

	//slider
	teks("Object Distance = "+slider1.valS+" cm", slider1.x - 20, slider1.y-20, "bold 13pt Calibri", "black", "left");
	slider(slider1);
	teks("Object Height = "+slider2.valS+" cm", slider1.x - 20, slider2.y-20, "bold 13pt Calibri", "black", "left");
	slider(slider2);
	teks("Lens Focus =  "+slider3.valS+" cm", slider3.x - 20, slider3.y-20, "bold 13pt Calibri", "black", "left");
	slider(slider3);

	//gambar lensa
	if (jenisLensa == 1) {
		lensaCembung(x1, y1, radius, lensRadius, f);
	} else {
		lensaCekung(x1, y1, radius, lensRadius, f);
	}
	 
	// gambar sumbu utama
	garis(0, y1,canvas.width, y1, 2, "black");

	// gambar titik fokus
	lingkaran(x1+radius-0.29*radius-2*f, y1, 4, 2, "purple", "purple");
	lingkaran(x1+radius-0.29*radius-4*f, y1, 4, 2, "purple", "none");
	lingkaran(x1+radius-0.29*radius+2*f, y1, 4, 2, "purple", "purple");
	lingkaran(x1+radius-0.29*radius+4*f, y1, 4, 2, "purple", "none");

	jarakBayangan = -jarakBenda*f/(-jarakBenda-f);
	tinggiBayangan = jarakBayangan*tinggiBenda/(jarakBenda);

	garis(x1+radius-0.29*radius+2*jarakBenda, y1-2*tinggiBenda, x1+radius-0.29*radius, y1-2*tinggiBenda, 2, "red");
	slope = tinggiBenda/f;
	garis(x1+radius-0.29*radius, y1-2*tinggiBenda,x1+radius-0.29*radius+420, y1-2*tinggiBenda+slope*420, 2, "red");

	if (jarakBayangan < 0.0) {
		garis(x1+radius-0.29*radius, y1-2*tinggiBenda, x1+radius-0.29*radius-420, y1-2*tinggiBenda-slope*420, 2, "#fbb");
	}
	slope = -tinggiBenda/jarakBenda;
	garis(x1+radius-0.29*radius+2*jarakBenda, y1-2*tinggiBenda, x1+radius-0.29*radius+420, y1-2*tinggiBenda+slope*(420-2*jarakBenda), 2, "blue");
	 
	if (jarakBayangan < 0.0) {
		garis(x1+radius-0.29*radius+2*jarakBenda, y1-2*tinggiBenda, x1+radius-0.29*radius-420, y1-2*tinggiBenda-slope*(420+2*jarakBenda, 2, "#bbf"));
	}

	// gambar garis cahaya
	slope = tinggiBenda/(jarakBenda+f);
	garis(x1+radius-0.29*radius+2*jarakBenda, y1-2*tinggiBenda, x1+radius-0.29*radius, y1-2*tinggiBenda+slope*(2*jarakBenda), 2, "green");
	garis( x1+radius-0.29*radius, y1-2*tinggiBenda+slope*(2*jarakBenda), x1+radius-0.29*radius+420, y1-2*tinggiBenda+slope*(2*jarakBenda), 2, "green");
	 
	if (jarakBayangan < 0.0) {
		garis(x1+radius-0.29*radius, y1-2*tinggiBenda+slope*(2*jarakBenda),x1+radius-0.29*radius-420, y1-2*tinggiBenda+slope*(2*jarakBenda), 2, "#bfb");
	}

	// objek
	if (tinggiBenda > 0)  panah(x1+radius-0.29*radius+2*jarakBenda,y1,0,tinggiBenda, 2, 2, warnaBenda);
	if (tinggiBenda < 0)  panah(x1+radius-0.29*radius+2*jarakBenda,y1,0,tinggiBenda, 2, 2, warnaBenda);

	// bayangan
	if (tinggiBayangan > 0)  panah(x1+radius-0.29*radius+2*jarakBayangan,y1,0,tinggiBayangan, 2, 2, warnaBayangan);
	if (tinggiBayangan < 0)  panah(x1+radius-0.29*radius+2*jarakBayangan,y1,0,tinggiBayangan, 2, 2, warnaBayangan);
	 
	teks("Shadow Distance = "+jarakBayangan.toFixed(2)+" cm", 500, 420, "bold 13pt Calibri", "black", "left");
	teks("Shadow Height = "+tinggiBayangan.toFixed(2)+" cm", 500, 450, "bold 13pt Calibri", "black", "left");
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseDrag(event){
	//prosedur mengecek slider
	var sliderAktif = cekSlider(event);
	if (sliderAktif != null){
		if (sliderAktif.nama == "jarak") {
			jarakBenda = Number(sliderAktif.valS);
			setSimulasi();
		}
		if (sliderAktif.nama == "tinggi") {
			tinggiBenda = Number(sliderAktif.valS);
			setSimulasi();
		}
		if (sliderAktif.nama == "fokus") {
			f = Number(sliderAktif.valS);
			if (jenisLensa == 2) f=(-f);
			setSimulasi();
		}
	}
}

function mouseUp(event){
	//prosedure mengecek tombol
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "Convex Lens"){
			f=Math.abs(f);
			jenisLensa = 1;
			label = "Convex Lens";
			setSimulasi();
		}
		if (tombolAktif == "Concave Lens"){
			f=-1*Math.abs(f);
			jenisLensa = 2;
			label = "Concave Lens";
			setSimulasi();
		}
	}
	canvas.onmousemove = null;
}

setSimulasi();
}
function jalankanSimulasi() {
	setSimulasi();
	if (simAktif == 1) {
		timer = window.setTimeout(jalankanSimulasi, 20);
		mainTimer = timer;
	}
}