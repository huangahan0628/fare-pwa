self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("fare-v1").then(cache =>
      cache.addAll(["/", "/index.html", "/pricing.js"])
    )
  );
});
