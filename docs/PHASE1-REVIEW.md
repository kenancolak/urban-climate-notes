# Evre 1 inceleme teslimi — 25 Ekim 2026

Çalışma dalı: `academic-phase1-consistency`. Başlangıç: `main` / `94d6ea652493fb0213f570219cfe16a330ad3cf4`. Önceki PR #2 kullanıcı tarafından birleştirilmiş. Bu teslim main'e birleştirilmez; üretim, DNS ve hesap ayarları değiştirilmez.

## 1. Yayın sürümü ve teşhis

11 canlı adresin yeni bir HTTP isteğiyle alınan HTML çıktısı aynı `/assets/index-C6SBhCKa.js` ve `/assets/index-C4cNKSD_.css` dosyalarına başvuruyor. Tümünde yeni Kenan Çolak başlığı, yedi öğeli menü ve tema düğmesi var. Vercel HIT ve MISS yanıtları arasında sürüm farkı görülmedi. Ölçüm sırasında sunucunun iki farklı sürüm sunduğu doğrulanmadı. Kullanıcının daha önce gördüğü eski sürümün tarayıcı önbelleğinden, başka bir dağıtım anından veya eski bağlantıdan kaynaklandığını mevcut kanıtla kesinleştirmek mümkün değil. Kaynakta service worker yok. Kanıtlar: `phase1-live-evidence.json`, `phase1-live-redirects.json`.

Menü ve marka zaten ortak App bileşeninde; bütün 11 statik çıktıda aynı menü sırası, marka, tema düğmesi ve JS paketi bulunduğunu doğrulayan regresyon kontrolü eklendi. HTML için yeniden doğrulama başlığı taslak Vercel yapılandırmasına eklendi. Bu başlık tek başına tarayıcı önbelleğinin önceki olayın nedeni olduğunu kanıtlamaz.

## 2. www ve eski adresler

Tercih edilen adres: `https://www.kenancolak.com/`. Canonical, sitemap, robots, Open Graph, JSON-LD ve istemci tarafındaki meta güncellemeleri buna geçirildi. İç bağlantılar köke göreli kalır; ziyaretçinin bulunduğu önizleme/üretim hostunu izler.

Canlıda apex HTTPS -> www HTTPS zaten HTTP 308; HTTP apex -> HTTPS apex de 308. DNS değişikliği gerekmiyor. Taslak `vercel.json` aynı host kuralını ve eski `.html` adresleri için kalıcı yönlendirmeleri açıkça tanımlar. Sayı önekli özgün Quarto yolları da dahil: örneğin `/notes/01-is-the-planet-really-warming.html`. GitHub Pages için statik canonical/meta-refresh/JS yedek yönlendirme dosyaları da üretilir; bunlar HTTP 308 değildir. Canlı özgün sayılı Reno HTML yolu kontrol sırasında 404 verdi; bu dalda ayrıca onarıldı. Gerçek HTTP yönlendirme durumu Vercel önizlemesinde/yayın sonrasında ayrıca ölçülmelidir.

## 3–7. İçerik

- Ana sayfa: son mesajdaki kimlik metni (PhD researcher dahil), Urban climate and planning alt başlığı, durum, CV/Contact ve doğrulanmış üç profil. Son notlar en yeni önce.
- Research: üç proje kartı ve onaylı metinler; altında özgün beş Research areas başlığı. Bulgular, sonuç haritası veya makale şekli eklenmedi.
- CV: mevcut PDF'nin bütün ana bölümleri ve metinleri, PDF sırasıyla `src/cv-content.json` üzerinden sunulur. Eğitim, seçilmiş araştırma, yayımlanmış ve under-review çalışmalar, bildiriler, deneyim, hukuk, akademik hizmet, yöntemler eklendi. Yazı projesi ve müzik en sonda. Last updated: October 2026 gerçek editoryal sabitidir; derleme tarihi değildir. PDF metniyle paragraf bazında karşılaştırma yapıldı; eksik paragraf yok. PDF dosyası değiştirilmedi.
- About: kullanıcının son verdiği biyografi aynen kullanıldı; more than eleven years ve qualified attorney-at-law in Türkiye. About the notes en altta.
- Methods: Stability and Comparability ilk içerik bölümü; gönderilen paragraf aynen. Öteki başlıklar korundu. Eşik, parametre, özgün kod eklenmedi.

## 8. İletişim ve e-posta engeli

Google Scholar bekleme satırı tüm profillerden çıkarıldı; ORCID numarası bağlantı yanında görünür. Yahoo adresi korunur.

GoDaddy Email & Office paneli açıldı ve oturum açma sayfası görüldü; hesap içindeki ürünler/Forwards incelenemedi. Google Public DNS sorgusu MX için NOERROR fakat Answer içermeyen yanıt verdi. TXT: `v=spf1 include:secureserver.net ~all`. SPF kaydı tek başına posta alımını sağlamaz. Yeni MX/TXT kaydı yazılmadı, hizmet satın alınmadı, doğrulanmamış alan adı adresi siteye eklenmedi, teslimat testi yapılmadı.

GoDaddy'nin resmî rehberine göre alan adı alımıyla gelen eski yönlendirme kredileri Workspace Email sonrasında kullanılamıyor; mevcut forwarding ürünü/kredileri varsa kullanılabilir. Hesap erişimi ve ürünü kontrol etmeden ücretsiz hizmet sözü verilemez.

Kaynak: https://www.godaddy.com/en-ca/help/create-edit-or-delete-forwards-with-email-forwarding-42254

İzlenecek somut kurulum: hesabın kullanılabilir forwarding ürünü kontrolü; uygun ürün varsa `kenan@kenancolak.com` -> `kenancolak@yahoo.com` önerisi; gerekirse sağlayıcının verdiği kesin MX/TXT değişikliklerini kullanıcıya gösterme; maliyet varsa ayrıca onay; kurulumdan sonra dış kaynaktan test ve Yahoo gelen kutusu/spam/header doğrulaması. Adres öneridir, oluşturulmuş değildir. İletme hizmeti alan adı adresinden gönderim yetkisi sağlamayabilir; bunun için ayrıca gönderim hizmeti gerekir.

## 9. Teknik kontroller

Person: ad, iş unvanı, ORCID identifier ve ORCID/LinkedIn/GitHub sameAs. Notlarda Article ve kaynak QMD yayın tarihi, Phoenix'te gerçek 23 Ekim metin düzeltmesine dayalı güncelleme tarihi. Diğer notlarda doğrulanmış ayrı bir revizyon yoksa güncelleme tarihi uydurulmaz. Yayın tarihinin saat diliminden etkilenip bir gün geriye kaymasını önlemek için QMD ISO tarihi doğrudan kullanılır.

Derleme ve tarayıcı sonuçları için `PHASE1-QA.md`.

## 10. Ücret, mülkiyet ve lisans

Bu AI oturumunda ayrıca geliştirici faturası, tahsilat veya aşama ödeme planı oluşturulmaz. Platform aboneliği ve üçüncü tarafların mevcut/yeni hizmet ücretleri bunun dışındadır. Ücretli hizmet başlatılmadı; gelecekteki maliyet kullanıcı onayına bağlıdır. Bu belge bir ticari hizmet sözleşmesi değildir.

Kod kullanıcıya ait GitHub deposunda tutulur. Alan adı, hosting ve hesaplar taşınmaz; erişim/rol değişikliği yapılmaz. GoDaddy/Vercel hesaplarının yasal kayıt sahibi ve tüm yönetici erişimleri oturum olmadığı için bağımsız doğrulanamadı; doğrulanmış gibi raporlanmaz. Hiçbir parola/anahtar depoya eklenmez.

Bağımlılıklar: `DEPENDENCY-LICENSES.md`. Varlık ve yazı tipi listesi: `ASSET-LICENSES.md`. Mevcut Reno/Tokyo görselleri ile logo için dosya bazında lisans teyidi açık konudur; yeni kaynağı belirsiz görsel eklenmedi.

## Takvim ve yayın

1–7 ile 8'in site üzerindeki değişiklikleri bu dalda hazırlanır; 6 Kasım 2026 Cuma'yı beklemeden önizleme incelemesine sunulur. 8'in posta hizmeti kurulumu hesap erişimi, ürün durumu, olası maliyet onayı ve teslimat doğrulamasına bağlıdır; bunlar olmadan tarih garantisi verilmez. Etkileşimli araçlar ve Kent Hakkı bölümü bu teslimata dahil değildir.

Önizleme incelendikten sonra açık yayın onayı gerekir. Onaylanan commit main'e birleştirilince Vercel ve mevcut GitHub Actions tetiklenir. Üretimde 11 sayfa, PDF, sitemap, host ve eski URL yönlendirmeleri tekrar ölçülür. Değişen adresler: `/`, `/research/`, `/methods/`, `/about/`, `/cv/`, `/contact/`, `/notes/` ve dört `/notes/<slug>/` yolu. PDF URL'si aynı kalır. Geri alma: bu PR'nin merge commit'ini revert eden yeni PR; DNS geri alması gerekmez çünkü DNS değişikliği yoktur.
