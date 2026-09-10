const CACHE = 'sst-audio-v19';
/* 安装阶段只预缓存骨架 + 轻量子页（合计约 0.7MB）；音频不在预缓存列表里，
   由 SW 运行时缓存与 SPA 后台渐进预取负责，避免首次打开就下载数十 MB 拖慢手机。 */
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg',
  "./a/01.html",
  "./a/02.html",
  "./a/03.html",
  "./a/04.html",
  "./a/05.html",
  "./a/06.html",
  "./a/07.html",
  "./a/08.html",
  "./a/09.html",
  "./a/10.html",
  "./a/11.html",
  "./a/12.html",
  "./a/13.html",
  "./a/14.html",
  "./a/15.html",
  "./a/16.html",
  "./a/17.html",
  "./a/18.html",
  "./a/19.html",
  "./a/20.html",
  "./a/21.html",
  "./a/22.html",
  "./a/23.html",
  "./a/24.html",
  "./a/25.html",
  "./a/26.html",
  "./a/27.html",
  "./a/28.html",
  "./a/29.html",
  "./a/30.html",
  "./a/31.html",
  "./a/32.html",
  "./a/33.html",
  "./a/34.html",
  "./a/35.html",
  "./a/36.html",
  "./a/37.html",
  "./a/38.html",
  "./a/39.html",
  "./a/40.html",
  "./a/41.html",
  "./a/42.html",
  "./a/43.html",
  "./a/44.html",
  "./a/45.html",
  "./a/46.html",
  "./a/47.html",
  "./a/48.html",
  "./a/49.html",
  "./a/50.html",
  "./a/51.html",
  "./a/52.html",
  "./a/53.html",
  "./a/54.html",
  "./a/55.html",
  "./a/56.html"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
    const copy = resp.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return resp;
  }).catch(() => caches.match('./index.html'))));
});
