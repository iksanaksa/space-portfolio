---
year: "2023"
role: Design Engineer
duration: 3 minggu
summary: Design system untuk tim kecil yang benci meeting. Semua keputusan tertulis di kode, bukan di dokumen.
stack:
  - TypeScript
  - Radix
  - CSS Modules
---

## Konteks

Tim engineering 5 orang. Setiap kali mau bikin komponen baru, ada debat 40 menit tentang "harus pakai border radius berapa". Setiap keputusan kecil jadi meeting. Saya mau hentikan itu.

## Pendekatan

Semua token warna, spacing, dan radius ditulis di satu file TypeScript. Setiap komponen punya test yang memvalidasi bahwa dia tidak pakai nilai di luar token. Kalau ada yang lupa, CI gagal.

Artinya: **kalau build hijau, keputusan design sudah benar.** Tidak perlu meeting.

Dokumentasi ditulis di komentar kode, bukan di Notion. Kalau lo baca komponennya, lo baca alasannya.

## Hasil

Meeting design turun dari 4x/minggu jadi 0. Komponen baru bisa dibikin dalam 1 hari tanpa diskusi. Time-to-first-PR untuk engineer baru turun dari 2 minggu ke 3 hari.

Satu keputusan yang paling berdampak: **semua border radius 0.** Tidak ada negosiasi. Semua orang tahu.