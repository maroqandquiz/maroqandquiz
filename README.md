# MaroqAndQuiz

Intellektual viktorina musobaqalari uchun platforma: mavzular, 11 xil raund, homiylar, musiqa kutubxonasi,
admin paneli (parol bilan), ikki ekranli namoyish va zaxira nusxa.
Loyiha **statik sayt** (bitta `public/index.html`, ichida HTML + CSS + JavaScript). Framework, `node_modules` va server kerak emas.

## Tuzilishi

```
public/index.html     ilovaning o'zi (logotip ham ichiga joylangan)
api/                  Vercel server funksiyalari (state, login, logout, me, upload)
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
npm test           # barcha avtomatik testlar (10 ta to'plam)
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

## Server rejimi (Postgres + Blob) — Vercel'da ma'lumotlarni serverda saqlash

Sayt Vercel'da ishlaganda va quyidagi sozlamalar bajarilganda ma'lumotlar **serverda** saqlanadi:
- mavzu, raund, savol, homiy, musiqa kutubxonasi — **Neon Postgres** bazasida (`app_state` jadvali, avtomatik yaratiladi);
- rasm, audio, video, GIF — **Vercel Blob**'da (brauzerdan to'g'ridan-to'g'ri yuklanadi);
- admin paroli — serverda tekshiriladi (`ADMIN_PASSWORD`), kirish `HttpOnly` cookie bilan 12 soat amal qiladi.

O'qish (o'yin ko'rish) hamma uchun ochiq, yozish va tahrirlash faqat admin uchun.

### Sozlash (bir marta)
1. Vercel → loyiha → **Storage**: **Blob** store yarating va loyihaga ulang (`BLOB_READ_WRITE_TOKEN` avtomatik qo'shiladi).
2. Vercel → **Storage → Marketplace → Neon (Postgres)** ni loyihaga ulang (`DATABASE_URL` avtomatik qo'shiladi).
3. Vercel → **Settings → Environment Variables**: qo'lda ikkita qo'shing:
   - `ADMIN_PASSWORD` — admin paroli (kamida 8 belgi);
   - `SESSION_SECRET` — uzun tasodifiy matn (kamida 16, tavsiya 40 belgi).
4. Kodni GitHub'ga yuklang (`git push`). Vercel `npm install` va `npm run build` ni o'zi bajaradi (build `@vercel/blob` mijoz kutubxonasini `public/vendor/` ga yig'adi).
   Birinchi marta mahalliy `npm install` qilib, hosil bo'lgan `package-lock.json` ni ham commit qiling (versiyalar qotadi).
5. Saytni oching → **Raundlar** → `ADMIN_PASSWORD` bilan kiring.

### Eski (brauzerdagi) ma'lumotlarni ko'chirish
- Eski ma'lumotlar bor brauzerda saytni oching, admin sifatida kiring va **Sozlamalar → "Brauzerdagi eski ma'lumotlarni serverga ko'chirish"** ni bosing (serverdagi joriy ma'lumotlar almashtiriladi).
- Yoki avval **Zaxira nusxasini yuklab olish** qilib, keyin istalgan qurilmada **Fayldan tiklash** dan foydalaning (fayllar Blob'ga yuklanadi).

### Xato bo'lsa
- Sahifa tepasida "Server xatosi: DATABASE_URL sozlanmagan" — Neon ulanmagan yoki o'zgaruvchi qo'shilmagan; ulagach **Redeploy** qiling.
- "Server sozlanmagan (ADMIN_PASSWORD...)" — o'zgaruvchilar qo'shilmagan yoki qo'shilgandan keyin qayta deploy qilinmagan.
- "Ma'lumotlar boshqa qurilmada o'zgargan" — ikki joydan bir vaqtda tahrirlangan; sahifani yangilab, qayta urinib ko'ring (so'nggi saqlash yutadi, eskisi ustiga yozilmaydi).
- Fayl yuklanmasa — brauzer konsolida xatoni ko'ring; `BLOB_READ_WRITE_TOKEN` borligini tekshiring.
- Server (`/api`) bo'lmagan joyda (masalan, faylni to'g'ridan-to'g'ri ochsangiz) ilova eski **mahalliy rejim**da ishlaydi: ma'lumotlar brauzerda (IndexedDB) saqlanadi.

### Cheklovlar
- Bepul tarif hajmlari cheklangan (Blob va Neon); sahifalarida ko'ring.
- O'chirilgan raund/musiqaning fayllari Blob'da qoladi (avtomatik tozalash yo'q).
- Ikki admin bir vaqtda tahrirlasa, ikkinchisi to'qnashuv xabarini ko'radi (birlashtirish yo'q).
- Parolni almashtirish uchun `ADMIN_PASSWORD` ni Vercel'da o'zgartirib, qayta deploy qiling.

## Admin paneli

**Server rejimida** parol `ADMIN_PASSWORD` dan olinadi (yuqoriga qarang). Quyidagi tavsif faqat **mahalliy rejim** uchun.

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
