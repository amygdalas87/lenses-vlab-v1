aturCanvas();
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
var elem = document.getElementById("canvas");

setJudul("Virtual Lab");
hapusLayar("#1b53a8");

//listener untuk membaca event mouse
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var fileGUI = {
	bg: "img/bg1.jpg",
	judul: "img/text virtual lab medium.png",
	juduls: "img/text virtual lab small.png",
	bg_setting: "img/bg_setting.png",
	avatar: "img/avatar.png",
	tombol_home: "img/tombol_home.png",
	tombol_mulai: "img/tombol_mulai.png"
};

var inputNama = {nama:"Name", x:520, y:350, p:200, t:30, huruf:"13pt Calibri", val:"Name", max:30, limit:"*", warnaLayar:"#f0f0f0"};
var popup1 = {x:400, y:250, l:400, t:150, warnaBG:"#f7f7f7", warnaGaris:"#bababa", val:"", huruf:"14pt-Calibri-center-1.5", warnaHuruf:"#8c1515", tutup:"ok", func: ceknamaPengguna}

var namaPengguna = "";
var noSimulasi = 1;
var mainTimer;

preload(fileGUI, halamanJudul);

function halamanJudul(){
	hapusLayar();
	//menampilkan gui untuk judul
	gambar(dataGambar.bg, 0, 0);
	gambar(dataGambar.judul, 410, 42);
	tombolImg("mulai", 480, 250, 337, 103, dataGambar.tombol_mulai);
}

function halamanNama(){
	hapusLayar();
	//menampilkan gui untuk judul
	gambar(dataGambar.bg, 0, 0);
	kotak(0,0,canvas.width, canvas.height, 1, "none", "rgba(19,41,155,0.7)");
	gambar(dataGambar.juduls, 300, 150);
	gambar(dataGambar.avatar, 600, 50);
	gambar(dataGambar.bg_setting, 400, 250);
	//teks html
	teksHTML("Welcome to <b>VIRTUAL LAB</b>, <br>before starting, write your name first !", 500, 280, 250, "12pt-Arial-center-1.6", "#FFFFFF");
	teksInput(inputNama);
	//tombol OK
	tombol("OK/id=cek_nama", 575, 400, 80, 30, "bold 14pt Calibri", "white", "#12b098", "#12b098", "r");
}

function halamanMenu(){
	hapusLayar("#b3cfe5", {stat:"clear"});
	gambar(dataGambar.bg, 0, 0);
	kotak(0,0,canvas.width, canvas.height, 1, "none", "rgba(19,41,155,0.7)");
	gambar(dataGambar.juduls, 450, 50);

	//petunjuk
	kotakrs(300, 480, 600, 100, 10, 2, "#8f8f8f", "#e6e6e6", "black");
	gambar(dataGambar.avatar, 150, 380);
	teksHTML("Hello... <b>"+namaPengguna+"</b> Please <b>click on the physics simulation</b> you want<br>Click the home button if you want to re-select the simulation type!", 350, 500, 500, "12pt-Arial-center-1.6", "#690608");

	//tombol menu simulasi
	tombol("Temperature Measurement/id=simulasi1", 280, 200, 250, 60, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");
	tombol("Lenses/id=simulasi2", 650, 200, 250, 60, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");
	tombol("Bullet Motion/id=simulasi3", 280, 300, 250, 60, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");	
	tombol("Circular Motion/id=simulasi4", 650, 300, 250, 60, "bold 14pt Calibri", "white", "#d49715", "#d49715", "r");	
}

function tambahHome(){
	//tombol kembali
	gambar(dataGambar.juduls, 880, 10);
	tombolImg("home", 10, 10, 60, 60, dataGambar.tombol_home, keluarSimulasi);
}

function halamanSimulasi(){
	//hapus layar dan tambahkan tombol home di atas simulasi
	hapusLayar("#b3cfe5", {stat:"run", func:tambahHome});
	//jalankan simulasi dari file yang diload diawal file
	if (noSimulasi == 1) simulasi1();
	if (noSimulasi == 2) simulasi2();
	if (noSimulasi == 3) simulasi3();
	if (noSimulasi == 4) simulasi4();
}

function ceknamaPengguna(){
	if (namaPengguna == ""){
		halamanNama();
	}else{
		resetInteraktif();
		halamanMenu();
	}
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseDrag(event){
}

function mouseUp(event){
	cekTeksInput(event);
	cekPopup(event);
	//prosedure mengecek tombol
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "mulai"){
			resetInteraktif();
			halamanNama();
		}
		//mengecek nama pemain
		if (tombolAktif == "cek_nama"){
			//nama belum diinputkan
			if (inputNama.val == "nama" || inputNama.val == ""){
				popup1.val = "You have not typed in your name yet, please <b>click on the name column<b> and type your name!";
			}else{
			 //salam, setelah nama diinput
				namaPengguna = inputNama.val;
				popup1.val = "Hi  <b>"+namaPengguna+"</b>, Welcome to <b>Virtual Lab</b>. Here, you can try several physics simulations.";
			}
			popup(popup1); 
		}
		if (tombolAktif == "simulasi1"){
			noSimulasi = 1;
			resetInteraktif();
			halamanSimulasi();
		}
		if (tombolAktif == "simulasi2"){
			noSimulasi = 2;
			resetInteraktif();
			halamanSimulasi();
		}
		if (tombolAktif == "simulasi3"){
			noSimulasi = 3;
			resetInteraktif();
			halamanSimulasi();
		}
		if (tombolAktif == "simulasi4"){
			noSimulasi = 4;
			resetInteraktif();
			halamanSimulasi();
		}
	}
	canvas.onmousemove = null;
}
function keluarSimulasi(){
	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;
	window.clearTimeout(mainTimer);
	resetInteraktif();
	halamanMenu();
}