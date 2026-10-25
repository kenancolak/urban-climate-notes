# Evre 1 kısa test raporu

25 Ekim 2026; dal `academic-phase1-consistency`. Üretim sürümünün değiştirilmesi için ayrı yayın onayı gerekir.

| Kontrol | Sonuç / sınır |
| --- | --- |
| Temiz bağımlılık kurulumu | `npm ci` başarılı; 179 paket. Yeni bağımlılık eklenmedi. |
| TypeScript / statik derleme | `npm run build`: başarılı; 11 rota. |
| İç bağlantı / dosya / fragment | `npm run check:build`: 157 iç bağlantı ve 25 görsel alt niteliği. |
| Tek sürüm | 11 statik rotanın tamamında aynı 7 menü öğesi, marka, tema düğmesi ve tek uygulama paketi kontrol edilir. |
| SEO | www canonical = og:url; sitemap 11 www URL; Person iş unvanı/ORCID/sameAs ve dört Article. |
| Yayın tarihleri | SEO tarihleri QMD kaynak tarihleriyle birebir karşılaştırılır. Saat dilimi kaynaklı bir günlük kayma tespit edilip düzeltildi. Phoenix 23 Ekim içerik düzeltmesi gerçek modified tarihidir. |
| CV | Mevcut PDF'deki her paragraf ve eğitim/deneyim alt metinleri JSON transkripsiyonuyla karşılaştırıldı; eksik yok. Bölüm sırası statik testte kontrol edilir. PDF değişmedi. |
| Eski bağlantılar | Sayı önekli ve öneksiz eski HTML yollarına statik yedek ve Vercel kalıcı yönlendirme kuralları eklendi. Vercel HTTP durumları bu dalın dağıtımında ayrıca ölçülmeli. Canlı `/notes/01-is-the-planet-really-warming.html` kontrol sırasında 404 verdi; bu dalda düzeltmesi var. |
| Kaynak koruması | Özgün notes/ ve images/ kaynakları cd3eb17 referansına göre değişmedi. |
| Masaüstü tarayıcı | 1363 px; ana sayfa ve CV incelendi; CV -> Research tıklaması ortak yeni başlık/menü ve korunmuş tema ile açıldı. |
| Mobil/tablet | 390 px ve 768 px çerçeveler (kaydırma çubuğu sonrası içerik 375/753 px). Ana sayfa ve CV'de yatay taşma yok. Fiziksel iPhone/Safari testi yapılmadı. |
| Klavye | Tab ile görünür Skip to content odağı; mobil menü açılma/kapanma; Escape kapanınca odak Menu düğmesine döner. Koyu modda skip-link düşük kontrastı düzeltilerek temaya bağlandı; odak çizgisi tema rengine geçirildi. |
| Metin kontrastı | Ana sayfada marka alt başlığı, araştırma kimliği, durum metni, proje etiketleri/alan adları, CV düğmesi ve profil linkleri ölçüldü. Açık temada 4.66–11.28:1, koyu temada 7.37–11.15:1. Tüm durumların tam WCAG 2.2 AA sertifikasyonu değildir. |
| Görsel alternatifleri | 25 çıktı görselinde alt niteliği; kaynaklardaki açıklamalar korunur. Her açıklamanın bilimsel yeterliliği için bağımsız editoryal inceleme yapılmadı. |
| Performans | Statik SSR, WebP, gövde görsellerinde lazy loading korunur. JS yaklaşık 477 kB / gzip 149 kB, CSS yaklaşık 23 kB / gzip 5.6 kB. Lighthouse veya gerçek mobil ağ ölçümü yapılmadı; puan uydurulmadı. |
| E-posta | GoDaddy paneli giriş istiyor. MX yanıtı yok; SPF TXT var. Forwarding oluşturulmadı/test maili gönderilmedi; Yahoo korunuyor. |

Ekran görüntüleri: `screenshots/phase1-home-desktop.jpg`, `phase1-home-dark.jpg`, `phase1-responsive.jpg`, `phase1-cv-desktop.jpg`. Responsive QA geçici HTML dosyası teslimattan çıkarıldı.

Sonraki zorunlu doğrulama: Vercel önizlemesinde alias HTTP yönlendirmeleri; onay ve üretim dağıtımından sonra 11 rota, PDF, canonical/sitemap/og:url ve apex->www tekrar test edilmeli. E-posta için hesap erişimi ve gerçek gelen kutusu doğrulaması gerekir.
