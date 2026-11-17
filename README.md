# Website Rental Equipment — Sarana Visual Kreasi

Website statis (HTML + CSS + JS biasa, tanpa build). 406 equipment dari
`Catalog_Sarana_Visual_Kreasi.pdf`, dengan pencarian, filter, daftar sewa,
hitung total otomatis, dan kirim permintaan via WhatsApp.

## Menjalankan
Buka `index.html` langsung di browser, atau jalankan server lokal:

    python -m http.server 8137

Font memakai Google Fonts, jadi perlu koneksi internet (tanpa itu tampil dengan font cadangan).

## Yang perlu Anda isi: `js/config.js`
- `whatsapp` — nomor tujuan permintaan sewa, format `6281234567890` (tanpa `+`).
  Kosong = pelanggan memilih sendiri kontak tujuan di WhatsApp.
- `email`, `phone`, `address`, `hours`, `instagram` — tampil di footer bila diisi.

## Mengubah / menambah equipment: `js/data.js`
Satu baris = satu item. Contoh:

    {"id": "kamera-047", "cat": "kamera", "sub": "Kamera", "name": "Sony FX6 Full-Frame Cinema", "brand": "Sony", "title": "FX6 Full-Frame Cinema", "price": 1500000, "unit": "hari"}

- `cat`: kamera, router, multicam, lighting, audio, monitor, rigging, support, genset
- `unit`: `hari`, `10 jam`, atau `meter`; tambahkan `"mode": "beli"` bila item dijual (bukan sewa)
- `pkg`: isi dengan nama grup bila ingin tampil di "Paket siap pakai"
- `id` harus unik. Jumlah item, kategori, dan harga terendah di halaman terhitung otomatis.

## Foto
Tiap kartu memakai satu dari tiga jenis tampilan, dalam urutan prioritas:
1. **Foto produk resmi per model** (situs pabrikan, tampil di panel terang). Saat ini 45 item: Aputure (21), Hollyland (10), Zhiyun (4), serta masing-masing 1–2 item dari Zoom, Roland, Midas, ARRI, Samsung, AJA, Easyrig, Manfrotto, dan Sachtler.
2. **Foto stok per jenis alat** (Wikimedia Commons / Openverse, lisensi terbuka) untuk item yang belum punya foto produk.
3. **Placeholder netral** bila belum ada foto yang cocok (mis. baterai, monitor lapangan, LED panel).

Foto tampil hitam-putih, lalu berwarna saat hover (layar sentuh: saat kartu di tengah layar atau item masuk daftar sewa).
Kredit foto otomatis tampil di footer ("Kredit foto"); jangan dihapus.

**Memasang foto sendiri untuk satu item:** simpan fotonya di `img/` (rasio bebas; latar putih atau transparan paling bagus),
lalu isi `items` di `js/photos.js`, contoh: `"kamera-012": { "file": "img/sony-z190.webp", "product": true }`.
Kode item (`id`) ada di `js/data.js`. `"product": true` menampilkan foto utuh di panel terang; tanpa itu foto dipotong memenuhi kartu.

## Logo, favicon, dan tema
- Logo ada di `img/brand/`: `logo-dark.webp` (logo penuh untuk latar gelap), `mark-dark.webp` (lambang "S" saja), dan `logo-light.webp`
  (huruf navy, dipakai di lembar cetak/PDF berlatar putih). Versi *dark* mengubah huruf navy menjadi putih. File asli: `logo-sumber.jpg`.
- Favicon: `favicon.ico`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`,
  dan `site.webmanifest`. Lambang dipasang di kotak putih bersudut membulat supaya terlihat di tab terang maupun gelap.
- Warna diambil dari logo: navy `#0b1f56` dan oranye `#ff8a14`. Semua warna diatur sebagai variabel di bagian atas `css/styles.css`
  (blok `:root`).
- **Hanya mode gelap** (navy malam + oranye). Bagian "Cara sewa" dan footer memakai navy yang sedikit lebih terang sebagai pembeda.

## Publikasi
Unggah seluruh folder ini ke hosting statis mana pun (Netlify, Vercel, GitHub Pages, cPanel).
