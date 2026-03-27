/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Deklarasi variabel global yang diinjeksi oleh Serwist saat build
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  // Daftar file yang akan di-precache (otomatis diisi saat build)
  precacheEntries: self.__SW_MANIFEST,
  // Aktifkan navigasi preload untuk performa lebih baik
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Gunakan strategi caching default dari Serwist
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
