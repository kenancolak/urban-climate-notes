# Akademik profil v1 — Mimari, içerik ve teslim

## Bu teslimat

Ana marka Kenan Çolak. Ana sayfada araştırma kimliği, iş birliği durumu, üç proje, dört mevcut not ve mevcut keşif bağlantıları bulunur. `/research/`, `/about/`, `/cv/`, `/contact/` statik çıktı üretir. Üç proje metni ve durumları kullanıcıdan alınmıştır; sonuçlar, istatistikler ve yayımlanmamış haritalar eklenmemiştir.

Kullanıcı doktora derecesinin resmen tamamlandığını doğruladı. Ana sayfa kimlik paragrafında yalnızca “PhD researcher” → “urban climate researcher” değişikliğini ayrıca onayladı. Yeni biyografi aynen kullanılmıştır.

CV PDF’si, akademik iletişim adresi, ORCID, Google Scholar ve LinkedIn henüz verilmedi. Sahte URL veya e-posta yoktur. Bunlar verilene kadar indirme/iletişim işlevleri eksiktir; ilk sürüm akademik başvuru için bu bilgiler tamamlanmadan yayına hazır sayılmaz.

## Dosyalar ve mimari

| Dosya | İşlev |
| --- | --- |
| src/profile.ts | Kullanıcı onaylı kimlik, biyografi, proje kartları ve doğrulanmış profil bağlantıları |
| src/AcademicProfile.tsx | Ana ekran, proje kartları, tema anahtarı, Hakkımda, CV ve İletişim bileşenleri |
| src/App.tsx | Sayfa yönlendirme, navigasyon, arama ve mevcut not okuyucu |
| src/content.ts | Mevcut dört QMD not kaydı, SEO ve site arama içeriği |
| src/styles.css | Mevcut sıcak kâğıt/yeşil tasarımın akademik profil uyarlaması ve koyu mod |
| scripts/prerender.mjs | Her rota için HTML, metadata, Person/Article JSON-LD, sitemap ve eski URL yönlendirmeleri |
| scripts/check-build.mjs | Statik rota, iç link, fragment, görsel, metadata ve not/görsel koruma kontrolü |
| .github/workflows/deploy.yml | Mevcut main → gh-pages yayın akışı; değiştirilmedi |

React 19 ve Vite korunur; yeni bağımlılık, hosting hesabı, sunucu, harita veya grafik kütüphanesi eklenmez. QMD kaynaklar mevcut derlemede React Markdown ile işlenir; Quarto CLI npm build’in parçası değildir. `dist/` üretim çıktısıdır. Kişi JSON-LD’sine doğrulanmayan derece/kurum/akademik bağlantı eklenmemiştir.

Tema tercihi mümkünse tarayıcıda saklanır; depolama engellense bile anahtar çalışır. Menü klavyeyle açılır, Escape ile kapanır ve odak menü düğmesine döner. Dahili proje fragment bağlantıları korunur.

## CV ve profil alanları nasıl tamamlanır?

1. Onaylı PDF’yi örneğin `public/files/Kenan_Colak_CV.pdf` konumuna ekle.
2. `src/profile.ts` içindeki `cvUrl` değerini `/files/Kenan_Colak_CV.pdf` yap.
3. Kullanıcının kamuya açılmasını istediği adresle `contactEmail` değerini doldur.
4. `profileLinks` listesine kullanıcının doğruladığı tam ORCID, Scholar ve LinkedIn adreslerini ekle. Eşleşme tahmini yapma.
5. `npm run build` ve `npm run check:build` çalıştır. PDF bağlantısının dosyayı açtığını ayrıca kontrol et.

## Mevcut içerik düzenleme

`notes/*.qmd` metin kaynakları, `images/notes/01`–`04` kaynak görselleridir. Var olan bir metni QMD içinde düzenlemek React bileşeni değişikliği gerektirmez. Front matter ve özgün lisans notlarını koru. Derleme kaynak görselleri WebP olarak hazırlar.

Yeni not ekleme şu anda `src/content.ts` kaydı ve görsel optimizasyon listesi değişikliği gerektirir. React kaydı gerektirmeyen otomatik Markdown/MDX yayın sistemi bu teslimatta henüz yapılmadı; Evre 3 işidir. Kullanılmayan bir sistem çalışıyormuş gibi sunulmaz. Mevcut tarihler korunur; otomatik build tarihi gösterilmez.

## Yerel çalışma

```sh
npm ci
npm run dev
npm run build
npm run check:build
npm run preview
```

Node 22 mevcut GitHub Actions sürümüyle uyumludur. Vite dev sunucusu sadece yerel inceleme ortamının `terminal.local` host adına ek izin verir; geniş `allowedHosts: true` kullanılmaz. Bu ayar domain veya üretim yayını değiştirmez.

## Yayın ve geri alma

Bu PR yalnızca `academic-profile-v1` dalındadır. **Main’e birleştirmek yayını tetikler; kullanıcının açık canlı yayın onayı olmadan birleştirme veya workflow_dispatch çalıştırma.** Vercel üretim/önizleme ayarları da birleşmeden önce kontrol edilmelidir.

Başlangıç sürümü `cd3eb17e768470741b5d00276c599963220dc9f5`; yerel ve GitHub üzerindeki `backup/pre-academic-profile-cd3eb17` dalı bu commit’i gösterir. Mevcut gh-pages başlangıcı `13eedf1b2479e1e2d321b46fe152521e15c72f20`.

Onaylı yayın sonrasında sorun olursa ilgili birleştirme commit’ini normal bir geri alma PR’ı ile revert et, build’i doğrula ve kullanıcı onayıyla birleştir. Main’i force-push ile geriye taşımak gerekmez. DNS değişmediyse DNS geri alma işlemi yoktur. Vercel rollback gerekiyorsa doğrulanmış önceki production deployment seçimi ayrıca kullanıcı onayına sunulur.

## Kalan işler

- P0 hesap ayarları, origin sertifikası ve canonical alan adı kararı.
- PDF, doğrudan iletişim ve akademik profil bağlantıları.
- Evre 2: güçlü Stable Reference Areas açıklaması, sınırlılıklar/sözlük ve Teaching sayfası.
- Evre 3: kayıt gerektirmeyen Markdown/MDX sistemi ve Verimden serisi.
- Evre 4: yalnızca sentetik veriyle üç erişilebilir demo.
- Evre 5: iki dilli kent hakkı/hukuk yazı altyapısı ve zorunlu uyarılar.
- Tam WCAG 2.2 AA denetimi, ekran okuyucu ve fiziksel iPhone/Safari testi; Lighthouse/Core Web Vitals ölçümü.
- İlk iki notun görsel lisanslarının kaynak dosya bazında teyidi. Yeni belirsiz lisanslı görsel eklenmemiştir.

## Lisanslar

[Bağımlılık envanteri](DEPENDENCY-LICENSES.md) mevcut kilit dosyasını temel alır. Arial/Helvetica ve Georgia/Times New Roman sistem yazı tipi yığınları kullanılır; font dosyası, ikon paketi veya harici font isteği eklenmez. Yeni fotoğraf kullanılmaz. GitHub Actions’ın mevcut üçüncü taraf eylemleri korunur.

Hong Kong görsellerinin ayrıntılı atıf ve lisansları `images/notes/03/SOURCES_AND_LICENSES.md` içindedir. Phoenix görselleri için atıf ve lisanslar dördüncü notun “Image sources and use notes” bölümünde korunur: kapak CC BY-SA 3.0, NASA kullanım kuralları, ABD federal kamu malı ve Pexels lisansı. Bunların varlığı kayıt altına alınmıştır; kaynak sayfaların güncel koşulları bu teslimatta yeniden denetlenmemiştir. Reno/Tokyo görsellerinin dosya bazında izin envanteri eksiktir. Logo kökeni de ayrıca teyit edilmelidir. Repoya tüm içerikleri kapsayan yeni bir açık kaynak lisansı atanmadı.
