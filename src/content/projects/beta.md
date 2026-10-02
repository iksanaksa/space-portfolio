---
year: "2024"
role: Fullstack
duration: 4 bulan
summary: Platform belajar bahasa dengan pendekatan spaced-repetition yang tidak berasa seperti PR sekolah. Fokus di retensi jangka panjang.
stack:
  - Next.js
  - Postgres
  - Prisma
  - Radix UI
---

## Konteks

Aplikasi belajar bahasa sudah banyak. Yang bikin orang berhenti bukan karena susah, tapi karena **membosankan**. Saya mau bikin yang retensinya tinggi tanpa bikin user merasa sedang mengerjakan tugas.

## Pendekatan

Sistem spaced-repetition dibuat lebih agresif di awal — kartu yang baru muncul setiap 30 detik, lalu melambat seiring waktu. Pendekatan ini bikin user merasa "cepat hafal" di minggu pertama, yang cukup untuk membangun kebiasaan.

Untuk backend, saya pakai Postgres dengan Prisma. Skema `ReviewLog` disimpan denormalized supaya query "kartu apa yang harus muncul sekarang" tetap sub-50ms walau user sudah punya 10,000+ kartu.

## Hasil

Retensi D30 (user yang masih aktif setelah 30 hari): **47%**. Rata-rata industri untuk aplikasi sejenis: 22%.

Yang paling penting: user report **"tidak berasa belajar"** — itu justru tujuannya.