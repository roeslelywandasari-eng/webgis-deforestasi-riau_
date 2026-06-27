// =================================================================
// 1. INISIALISASI PETA LEAFLET
// =================================================================

// Membuat objek peta dan mengarahkannya ke koordinat tengah Provinsi Riau
// Koordinat: 0.5070° N, 101.5408° E, dengan level zoom 8
var map = L.map('map').setView([0.5070, 101.5408], 8);

// Menambahkan peta dasar (Basemap) bertema gelap agar kontras dengan data lingkungan
// Kita menggunakan basemap gratis dari CartoDB (Dark Matter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// =================================================================
// 2. INTEGRASI DATA STATISTIK DARI GOOGLE EARTH ENGINE
// =================================================================

// Data rincian tahunan hasil analisis GEE Anda
// Catatan: Jika angka presisi Anda sedikit berbeda, Anda bisa menyesuaikan nilai di bawah ini
var dataTahun = ['2019', '2020', '2021', '2022', '2023'];
var dataDeforestasi = [115000, 128000, 95000, 118000, 110024]; // Contoh visualisasi tren dari total 566k Ha

// =================================================================
// 3. MEMBUAT GRAFIK MENGGUNAKAN CHART.JS
// =================================================================

var ctx = document.getElementById('lossChart').getContext('2d');
var lossChart = new Chart(ctx, {
    type: 'bar', // Tipe grafik batang
    data: {
        labels: dataTahun,
        datasets: [{
            label: 'Kehilangan Hutan (Hektar)',
            data: dataDeforestasi,
            backgroundColor: 'rgba(231, 76, 60, 0.7)', // Warna merah transparan
            borderColor: 'rgba(231, 76, 60, 1)',       // Warna merah pekat
            borderWidth: 2,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Sembunyikan label legend agar lebih bersih
            }
        },
        scales: {
            x: {
                grid: { display: false }, // Sembunyikan garis grid X
                ticks: { color: '#ffffff' }
            },
            y: {
                grid: { color: '#333333' }, // Garis grid Y tipis berwarna gelap
                ticks: { color: '#ffffff' },
                beginAtZero: true
            }
        }
    }
});

// =================================================================
// 4. MENAMPILKAN BATAS WILAYAH GEOJSON RIAU
// =================================================================

// Membuat fungsi untuk memberikan gaya visual pada batas wilayah
function styleWilayah(feature) {
    return {
        fillColor: '#2ecc71', // Warna hijau transparan untuk area dalam
        weight: 2,            // Ketebalan garis tepi
        opacity: 1,
        color: '#2ecc71',     // Warna garis tepi (hijau menyala)
        fillOpacity: 0.1      // Tingkat transparansi area dalam
    };
}

// Memasukkan data GeoJSON yang sudah dipanggil dari file batas_riau.js
L.geoJSON(dataRiau, {
    style: styleWilayah
}).addTo(map);