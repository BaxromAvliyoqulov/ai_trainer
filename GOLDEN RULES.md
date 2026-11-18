# 📜 FitMos (ZalOS) — Golden Rules & Architecture State

> **Loyiha nomi:** FitMos (ZalOS)  
> **Turi:** Mobile-First Offline-First Gym PWA (Adaptive AI Fitness Coach)  
> **Jonli Production:** [https://aitrainer-xi.vercel.app](https://aitrainer-xi.vercel.app)  
> **GitHub Repozitoriya:** [https://github.com/BaxromAvliyoqulov/ai_trainer](https://github.com/BaxromAvliyoqulov/ai_trainer)  
> **Holati:** 100% Yashil (Zero Red Lines, Production Deployed, Tested)

---

## 1. 🏛️ Texnik Arxitektura va Qoidalar
* **Frontend:** Vue 3 (Composition API) + Vite + TypeScript (Strict mode).
* **Styling:** Tailwind CSS (Minimalist White/Light Gym Theme, `border-slate-200`, `shadow-sm`, zero cheap gradients).
* **PWA & Offline:** `vite-plugin-pwa` + Service Worker caching. Zaldagi podvallarda internetsiz to'liq ishlaydi.
* **Storage:** LocalStorage / IndexedDB (Repository pattern, Multi-Account isolation, JSON backup).
* **Hardware & Ergonomics:**
  * Screen Wake Lock API (`navigator.wakeLock`) mashg'ulot davomida ekranni o'chirmaydi.
  * Web Audio API sintetik akkordlar (internetsiz 100% ishlovchi taymer signallari).
  * Web Vibration API (cho'ntakda tanaffus tugaganini bildiruvchi haptic feedback).
* **1-Tap Swap:** Har qanday band yoki yo'q trenajorni 1 ta bosish bilan gantel, shtanga yoki tana vaznli muqobilga almashtirish.
* **Baqbaqa & Posture Finisher:** Har mashg'ulot oxirida McKenzie Chin-Tuck, Wall Angels va Qorin vakuumi blokini 5 daqiqalik o'tkazish.

---

## 2. 👥 Multi-Account Arxitekturasi
* Har bir sportchi (Baxrom, Sardor, Rustam, Nilufar, Jamshid va boshqalar) o'z profilinga, vazn tarixiga, mashg'ulotlar statistikasiga ega.
* 1-bosishda boshqa akkauntga o'tish imkoniyati.

---

## 3. 🚀 Deploy & Git Sync
* Git: `origin/main` -> `https://github.com/BaxromAvliyoqulov/ai_trainer.git`
* Vercel: Production auto-deploy.
