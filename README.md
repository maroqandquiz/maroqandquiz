# MaroqAndQuiz

Intellektual viktorina musobaqalari uchun platforma: mavzular, 11 xil raund, homiylar, musiqa kutubxonasi,
admin paneli (parol bilan), ikki ekranli namoyish va zaxira nusxa.
Loyiha **statik sayt** (bitta `public/index.html`, ichida HTML + CSS + JavaScript). Framework, `node_modules` va server kerak emas.

## Tuzilishi

```
public/index.html     ilovaning o'zi (logotip ham ichiga joylangan)
scripts/build.mjs     production build: skript sintaksisi va majburiy qismlarni tekshiradi
tests/                avtomatik testlar (Node.js, brauzersiz sun'iy muhitda)
vercel.json           Vercel sozlamasi (outputDirectory = public)
package.json          skriptlar: build, test, start
.env.example          muhit o'zgaruvchilari (hozircha hech biri talab qilinmaydi)
HISOBOT.md            yakuniy tekshiruv hisoboti
```

## Mahalliy ishga tushirish

Talab: Node.js 18 yoki yangiroq.

```bash
npm run start      # http://localhost:3000 (npx serve orqali)
npm run build      # public/index.html ni tekshiradi
npm test           # barcha avtomatik testlar (7 ta to'plam)
```

Yoki `public/index.html` faylini brauzerda to'g'ridan-to'g'ri ochish ham mumkin.

## GitHub'ga yuklash

```bash
git init
git add .
git commit -m "MaroqAndQuiz birinchi versiya"
git branch -M main
git remote add origin https://github.com/<foydalanuvchi>/<repozitoriy>.git
git push -u origin main
```

`.gitignore` `node_modules`, `.env` va `.vercel` papkalarini yuklamaydi. Haqiqiy kalit yoki parollarni GitHub'ga yuklamang.

## Vercel'ga joylash

1. https://vercel.com ga kiring, **Add New → Project** ni bosing va GitHub repozitoriyni tanlang.
2. **Framework Preset**: `Other`. Qolgan sozlamalar `vercel.json` dan avtomatik olinadi
   (Build Command: `npm run build`, Output Directory: `public`). Install Command bo'sh qolsa ham bo'ladi.
3. **Environment Variables** — hozircha hech biri kerak emas.
4. **Deploy** ni bosing. Tayyor bo'lgach, Vercel bergan manzilda sayt ochiladi.

## Ma'lumotlar qayerda saqlanadi (MUHIM)

- Mavzu, raund, savol, rasm, audio, video, musiqa kutubxonasi va homiylar **foydalanuvchi brauzerida (IndexedDB)** saqlanadi.
  Sahifani yangilash yoki brauzerni qayta ishga tushirish ma'lumotlarni o'chirmaydi.
- Ma'lumotlar **serverga yuborilmaydi** va **qurilmalar o'rtasida avtomatik ko'chmaydi**. Boshqa kompyuter yoki brauzerda sayt bo'sh ochiladi.
  Brauzer ma'lumotlarini tozalash (cookie/site data) bazani o'chiradi.
- Shuning uchun: **Sozlamalar → Zaxira nusxasini yuklab olish** orqali muntazam JSON zaxira oling va boshqa qurilmada **Fayldan tiklash** bilan yuklang.
- Ko'p qurilmali umumiy ma'lumotlar kerak bo'lsa, tashqi saqlash (masalan, Vercel Blob + Postgres) qo'shish kerak. Hozirgi versiyada bu yo'q.
- Vercel vaqtinchalik fayl tizimiga hech narsa yozilmaydi (sayt statik).

## Admin paneli

- Birinchi marta **Raundlar / Homiylar / Musiqalar / Sozlamalar** bo'limiga kirganda parol o'rnatiladi (kamida 6 belgi).
- Parol PBKDF2-SHA256 bilan xeshlanib, shu brauzerda saqlanadi; seans 30 daqiqa faolsizlikdan keyin tugaydi.
- Bu **brauzer ichidagi himoya**: server bo'lmagani uchun brauzer asboblari bilan kirish mumkin bo'lgan odamga qarshi mutlaq xavfsizlik bermaydi.

## Ikki ekranli namoyish

1. Boshlovchi oynasida o'yinni boshlang.
2. Pastdagi **Namoyish ekrani** tugmasini bosing va **Ha** deng — yangi oyna ochiladi (yoki ikkinchi oynada saytni ochib, bosh sahifadagi **Namoyish ekrani (2-monitor)** ni bosing).
3. Yangi oynani ikkinchi monitorga olib o'ting va to'liq ekranga o'tkazing.
- Ikkala oyna **bir brauzer** ichida, bir xil manzilda ochilishi kerak (oynalar `BroadcastChannel` orqali bog'lanadi).
- Tovush boshlovchi oynasida chiqadi (ikkinchi ekran ovozsiz, faqat tasvir).

## Ma'lum cheklovlar

Batafsil `HISOBOT.md` da.
