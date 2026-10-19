# MaroqAndQuiz — yakuniy tekshiruv hisoboti

## Loyiha turi
Bitta fayldan iborat statik sayt (vanilla JavaScript, IndexedDB). React, TypeScript, ESLint, backend va tashqi servislar **yo'q**,
shuning uchun lint/TypeScript tekshiruvi va dependency o'rnatish bosqichlari qo'llanilmadi.

## O'tkazilgan tekshiruvlar (`npm test`, 7 ta to'plam — hammasi muvaffaqiyatli)
| To'plam | Nimani tekshiradi |
|---|---|
| O'yin | 1–11-raundlarning har biri boshidan oxirigacha o'ynaladi; har bir holatda 125 soniya kutilib taymer o'zi boshlanmasligi, 0 da to'xtashi, avtomatik o'tish bo'lmasligi, bir vaqtda 1 tadan ortiq audio/interval bo'lmasligi; har raundga 500 ta tasodifiy bosish (qotib qolish, noto'g'ri holat); HTMLdagi teglar balansi; "undefined/NaN" yo'qligi; o'lik tugmalar yo'qligi |
| Admin | Mavzu yaratish; 11 raundni saqlash va tahrirlash oynasidagi barcha tugma/maydonlarni bosib chiqish; ma'lumotlar bazaga yozilishi |
| Yangilash | Sahifa qayta ochilganda barcha mavzu/raund/savollar tiklanishi; qayta ochilgandan keyin Ruletka o'ynalishi |
| Eski ma'lumot | Eski formatdagi 9 ta raundning mavzularga ko'chirilishi va zaxira nusxa saqlanishi |
| Parol/musiqa/zaxira | Parol o'rnatish, noto'g'ri parol, seans muddati, himoyalangan amallar; musiqa kutubxonasi (saqlash, tanlash, o'chirish, hajm cheklovi); zaxirani tiklash va noto'g'ri faylni rad etish |
| Ikki ekran | Boshlovchi holati ikkinchi ekranga uzatilganda ikkinchi ekran HTML'i boshlovchi HTML'i bilan 100% mos kelishi (1–11-raundlar, 100 dan ortiq holat) |
| Uzoq ishlash | 60 ta o'yin ketma-ket: kutilayotgan taymerlar soni va intervallar ko'payib ketmasligi |

Production build: `npm run build` — muvaffaqiyatli (skript sintaksisi, majburiy qismlar, maxfiy kalit yo'qligi).

## Topilgan va tuzatilgan muammolar
- Pauza/qayta boshlash taymersiz bosqichda musiqani tasodifan qayta boshlashi mumkin edi — faqat taymerli bosqichlarda ishlaydi.
- Fokusdagi tugma bilan Space/Enter bosilganda ikki amal birga bajarilishi mumkin edi; tugmani bosib ushlab turish bosqichlarni o'tkazib yuborishi mumkin edi — tuzatildi.
- Pastdagi boshqaruv tugmalari savol matnini to'sishi mumkin edi — ixchamlashtirildi, joy qoldirildi.
- Kutilmagan xatoda ekran qotib qolardi — endi "Xatolik yuz berdi" ekrani va tiklash tugmasi chiqadi; tugma bosish xatolari ushlanadi.
- Ikkinchi ekran media fayllarni har safar qayta yuklab, xotirani ko'paytirishi mumkin edi — takroriy yuklash olib tashlandi.
- Logotip hajmi 74 KB dan 11 KB ga kichraytirildi (yuklanish tezroq).
- "e'lon" so'zidagi noto'g'ri belgi to'g'rilandi.

## Tekshirilmagan / cheklovlar (yashirilmaydi)
- Haqiqiy brauzerda ko'rinish (dizayn, shriftlar, animatsiyalar, telefon va proyektor ekranlari) tekshirilmagan — testlar brauzersiz sun'iy muhitda bajarilgan.
- Haqiqiy audio/video ijrosi, ritm animatsiyasi, katta fayllar, sekin internet holati tekshirilmagan.
- Ikki ekranli namoyish mantig'i (holat uzatish va nusxa tekshiruvi) sinalgan, lekin haqiqiy ikki oyna/monitor o'rtasidagi ulanish, popup bloklash va video sinxronligi sinalmagan.
- Vercel'da haqiqiy deploy bajarilmagan (konfiguratsiya statik sayt uchun tayyorlangan, `npm run build` mahalliy o'tdi).
- Ma'lumotlar faqat brauzerda saqlanadi (qurilmalar o'rtasida ko'chmaydi, serverda zaxira yo'q). Parol himoyasi brauzer ichida.
- Hali amalga oshirilmagan: 6 xil savol dizayni, Design Studio (o'z dizaynlari/fon rasmlari), shrift tanlash, Presenter oynasida keyingi slayd preview'i, drag-and-drop tartiblash.
