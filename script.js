var Stopwatch = function(elem, options) {
    // Pengaturan Default
    options = options || {};
    options.delay = options.delay || 1;

    // Deklarasi Keperluan Variabel
    var timer       = createTimer(),
        startButton = createButton("start", start),
        stopButton  = createButton("stop", stop),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;
   
    // Elemen Di Tambahkan     
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(stopButton);
    elem.appendChild(resetButton);
    
    // Pembuatan Waktu
    function createTimer() {
      return document.createElement("span");
    }

    // Pembuatan Tombol / Aktivasi Program
    function createButton(action, handler) {
      var a = document.createElement("button");
      a.href = "#" + action;
      a.innerHTML = action;
      a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
      });
      return a;
    }
    
    // Jalankan Program
    function start() {
      if (!interval) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
    
    // Hentikan Program
    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
    
    // Kembalikan Ke Awal (Reset)
    function reset() {
      clock = 0;
      render(0);
    }
    
    // Atur Perubahan Waktu
    function update() {
      clock += delta();
      render();
    }
    
    // Menyesuaikan Waktu Dengan Frame Yang Di Tetapkan
    function render() {
      timer.innerHTML = clock/1000; 
    }
    
    // Hitung Delta-nya
    function delta() {
      var now = Date.now(), d = now - offset;      
      offset = now;
      return d;
    }
    
    //Inisalisasi Data Global & Local
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;

    // Inisialisasi 
    reset();
};
  
// Panggil Elemen-nya & Tampilkan Komponen Stopwatch  
var elems = document.getElementsByClassName("stopwatch");
  
for (var i=0, len=elems.length; i<len; i++) {
  new Stopwatch(elems[i]);
}