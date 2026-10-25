# Test sonuçları — Akademik profil v1

24 Ekim 2026, America/Vancouver.

| Kontrol | Sonuç |
| --- | --- |
| npm ci | Başarılı; mevcut kilit dosyasıyla kurulum |
| npm run build | Başarılı; TypeScript noEmit, Vite üretim derlemesi ve statik HTML üretimi |
| npm run check:build | Başarılı: 11 sayfa, 156 iç bağlantı, 25 görsel alt niteliği; fragment hedefleri, yerel kaynak dosyaları, metadata ve JSON-LD |
| Mevcut içerik koruma | Başlangıç commit’ine göre notes/ ve images/ altında kaynak değişikliği yok |
| Canlı erişim | Apex ve www üzerinden ana sayfa + dört not + sitemap + robots toplam 14 HTTPS isteğinde 200 |
| HTTP yönlendirmeleri | HTTP apex ve www, HTTPS www adresine ulaşıyor; ara durum kodları ayrıca kaydedilmedi |
| Tarayıcı sayfa kontrolü | Ana sayfa, Research, About, CV, Contact ve dört not açıldı; dört kapağın naturalWidth değeri sıfırdan büyük |
| Tema anahtarı | Açık → koyu → açık çalıştı; iki görünüm kaydedildi |
| Telefon / tablet düzeni | 390×844 ve 768×1024 iframe viewportlarında görsel inceleme; içerik genişlikleri sırasıyla 375 ve 753 px (kaydırma çubuğu hariç), scrollWidth aynı, yatay taşma yok |
| Mobil menü | Açıldı, navigasyon görünür oldu; Escape ile aria-expanded false oldu |
| Site arama | Tokyo sorgusu Tokyo notunu ve Tokyo’dan bahseden Phoenix notunu buldu |
| Erişilebilirlik | Skip link, aria-current, tek h1 ve h2/h3 proje hiyerarşisi, semantic dl, menü Escape, görünür focus; düşük kontrastlı küçük yeşil başlık rengi koyulaştırıldı |
| Tarayıcı konsolu | Görülen kayıtlar Chrome eklentisinin metadata hatalarıydı; incelenen sayfa kaydında uygulama kaynaklı hata görülmedi |
| Performans | Vite build: JS yaklaşık 466 kB / 146 kB gzip, CSS yaklaşık 23 kB / 5.5 kB gzip. Bunlar dosya boyutu, Lighthouse veya kullanıcı hızı puanı değildir |

## Sınırlar

- İnceleme çalışan Vite geliştirme sunucusunda yapıldı. Üretim HTML dosyaları ayrıca dosya tabanlı denetlendi; uzak production deploy yapılmadı.
- Responsive iframe testi fiziksel telefon/Safari testi değildir. Ekran görüntülerindeki başlıklar test boyutlarını açıklar.
- WCAG 2.2 AA uygunluk sertifikasyonu veya tam axe/Lighthouse raporu yoktur. Ekran okuyucu, bütün sayfalarda bütün kontrast/odak durumları ve Core Web Vitals açık testlerdir.
- JavaScript paketi mevcut mimaride dört yazının metnini ve Markdown işlemcisini içeriyor. Sonraki performans çalışmasında SSR’ı koruyan sayfa bazlı ayırma değerlendirilebilir.
- İndirilecek CV ve e-posta verilmediği için gerçek indirme/mailto testi yapılamadı. Yer tutucular işlevsel bağlantı gibi sunulmuyor.
- Tam Pages/GoDaddy/Vercel hesap ayarları ile origin sertifika tarihi doğrulanmadı; Evre 0 raporunda ayrıntıları var.

## Görsel kanıtlar

- [Masaüstü](screenshots/home-desktop.jpg)
- [Koyu mod](screenshots/home-dark.jpg)
- [Telefon ve tablet](screenshots/home-responsive.jpg)
- [Üç araştırma kartı](screenshots/research-desktop.jpg)
