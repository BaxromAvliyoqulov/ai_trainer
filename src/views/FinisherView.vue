<script setup lang="ts">
import { Sparkles, Play } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'startFinisher'): void;
}>();
</script>

<template>
  <div class="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-black text-slate-900">Baqbaqa & Qorin Finisher</h2>
        <p class="text-xs text-slate-500">Qomatni tiklash va ichki qorin devorini tortish</p>
      </div>
      <div class="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
        <Sparkles class="w-4 h-4" />
      </div>
    </div>

    <!-- Science/Truth Banner -->
    <div class="p-4 rounded-3xl bg-slate-900 text-white shadow-md space-y-2">
      <div class="flex items-center gap-2">
        <span class="text-amber-400 font-bold text-xs uppercase tracking-wider">Tibbiy Haqiqat</span>
      </div>
      <h3 class="text-sm font-extrabold text-slate-100 leading-snug">
        Bukchayish va "Text-Neck" baqbaqani 2 barobar kattaroq ko‘rsatadi!
      </h3>
      <p class="text-xs text-slate-300 leading-relaxed">
        Bosh har 2.5 sm oldinga chiqqanda, bo‘yin umurtqasiga 4.5 kg ortiqcha yuk tushadi va jag‘ osti terisini osiltirib yuboradi. Har mashg‘ulot oxirida 5 daqiqalik Chin-Tuck va Qorin Vakuumi bo‘yinni to‘g‘rilab, baqbaqani tez yo‘qotadi.
      </p>

      <!-- Launch button -->
      <button 
        @click="emit('startFinisher')"
        class="w-full mt-2 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition"
      >
        <Play class="w-4 h-4 fill-slate-950" />
        <span>5 Daqiqalik Finisherni Boshlash</span>
      </button>
    </div>

    <!-- 3 Core Exercises Cards -->
    <div class="space-y-3">
      <!-- 1. Chin-tuck -->
      <div class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">1</span>
            <h4 class="text-xs font-bold text-slate-900">Makenzi Chin-Tuck (Baqbaqa dushmani)</h4>
          </div>
          <span class="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">3 set x 15 marta</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Jag‘ni to‘g‘ri orqaga surib, xuddi "2 qavat jag‘" qilayotgandek 3 soniya ushlanadi. Bo‘yinning chuqur fleksorlarini uyg‘otib, jag‘ osti terisini taranglashtiradi.
        </p>
      </div>

      <!-- 2. Wall Angels -->
      <div class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">2</span>
            <h4 class="text-xs font-bold text-slate-900">Wall Angels (Devorda qanot mashqi)</h4>
          </div>
          <span class="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">3 set x 12 marta</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Kuraklarni devorga yopishtirib qo‘llarni tepaga surish ko‘krak qafasini ochadi va yelkalar oldinga osilib qolishini yo‘qotadi.
        </p>
      </div>

      <!-- 3. Vacuum -->
      <div class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">3</span>
            <h4 class="text-xs font-bold text-slate-900">Qorin Vakuumi (Ichki devor)</h4>
          </div>
          <span class="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">3 set x 25 soniya</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Nafasni to‘liq chiqarib, qorinni kindik orqa umurtqaga tekkandek ichkariga tortish. Qorin osilib turuvchi asosiy sabab — ko‘ndalang mushak bo‘shashuvini davolaydi.
        </p>
      </div>
    </div>
  </div>
</template>
