# Evre 0 — Teknik denetim

24 Ekim 2026, America/Vancouver. Başlangıç main: `cd3eb17e768470741b5d00276c599963220dc9f5`. Yayın dalı: `13eedf1b2479e1e2d321b46fe152521e15c72f20`.

## Doğrulanmış sonuçlar

| Bileşen | Durum / hata | Olası neden ve öneri | Tekrar test / kalan açık konu |
| --- | --- | --- | --- |
| HTTPS ana alan adı | 200; `https://www.kenancolak.com/` adresine yönleniyor; tarayıcıda gerçek site açıldı | Coming Soon bu denemede yeniden üretilemedi; geçmiş nedeni kanıtlanmadı | HTTP ve HTTPS girişleri doğru içeriğe ulaştı |
| www | HTTPS 200; doğru ana sayfa | Düzeltme gerekmedi | Canlı tarayıcıda açıldı |
| Dört not | İki alan adı üzerinden dört URL de 200 | Kalıcı URL’leri koru | Başlıklar beklenen notlarla eşleşiyor |
| DNS A, apex | Google Public DNS yanıtı: `216.198.79.1` | GitHub Pages adresi varsayımıyla kayıt değiştirilmemeli | JSON kanıtı eklendi |
| DNS CNAME, www | `97980bc0677889c3.vercel-dns-017.com.` | Canlı alan adı Vercel’e bağlı; HTTP yanıtlarında da x-vercel-* var | Vercel proje, üretim dalı ve otomatik yayın ayarları hesap üzerinden henüz görülmedi |
| DNS AAAA | Apex için AAAA yanıtı yok; www CNAME takip yanıtında da IPv6 adresi yok | Tek başına hata değildir; IPv4 erişimi çalışıyor | IPv6 yayın hedefi doğrulanmadı |
| Yetkili DNS sunucuları | `ns29.domaincontrol.com`, `ns30.domaincontrol.com` | GoDaddy yönetimiyle uyumlu; hesap DNS ekranı görülmedi | Oturum gerekir |
| TLS | HTTPS tarayıcıda sertifika uyarısı vermeden açıldı; HTTP istemcisi doğrulamayı kapatmadan erişti | Ortam HTTPS proxy kullandığından origin sertifika zinciri, veren kurum ve bitiş tarihi bağımsız doğrulanmış sayılmaz | Sertifikanın bitiş tarihi ve SAN listesi açık kontrol |
| Canonical / yönlendirme | Canlı son URL www; canonical ve sitemap www içermiyor | Kanonik alan adı politikası tutarsız. Öneri: Vercel ayarları doğrulanınca ya mevcut www yönlendirmesine canonical/sitemap’i uydurmak ya da tersini onayla uygulamak | Değişiklik uygulanmadı; onay gerekli |
| Sitemap / robots | İki alan adında 200; sitemap dokuz mevcut URL içeriyor | Yeni sürüm 11 URL üretir; alan adı kararı bekleniyor | robots izin veriyor; canonical uyumsuzluğu açık |
| Kaynak mimarisi | React 19, TypeScript, Vite; QMD dosyaları raw metin olarak React Markdown’a aktarılıyor; optimize WebP ve build sırasında SSR | Quarto çıktıları depoda bulunuyor fakat güncel npm build Quarto CLI çalıştırmıyor | İş akışı ve kaynaklar okundu |
| GitHub Actions | Son main build 40065651021 başarılı; Pages 40065705798 başarılı | main push → npm ci → npm run build → dist → gh-pages; workflow_dispatch da mevcut | Bunlar Vercel’de kullanılan üretim ayarını kanıtlamaz |
| CNAME dosyaları | main/public/CNAME ve gh-pages/CNAME: kenancolak.com | Dosyalar mevcut; aktif DNS’in GitHub’a bağlı olduğunu göstermez | Değiştirilmedi |
| GitHub Settings → Pages | Tarayıcı oturumu yok; ayar URL’si giriş yapılmadan 404 gösteriyor | Custom domain, publishing source ve Enforce HTTPS işaretleri doğrudan görülmedi | GitHub bağlantısı kod işlemlerine yetiyor; ayar ekranı için güvenli oturum gerekir |
| GoDaddy hesap ekranı | Oturum açılmadı, hesap kayıtları görülmedi | Açık DNS sorgusu hesap panelinin yerini tutmaz | Güvenli oturumla salt okunur kontrol gerekli |

## Uygulanan değişiklikler

Canlı DNS, alan adı, hosting, GitHub Pages ve Vercel ayarlarında hiçbir değişiklik yapılmadı. Sorun raporlandı; canlı erişim yeniden kuruldu gibi bir iddia yoktur.

## Açık kontrol listesi

1. GitHub Pages ayar ekranındaki kaynak, domain ve Enforce HTTPS.
2. GoDaddy DNS panelindeki mevcut kayıtların açık DNS sonuçlarıyla eşleştirilmesi.
3. Vercel projesinin bağlı deposu, production branch ve branch preview politikası. Main’e birleştirme canlı Vercel yayınını da tetikleyebilir.
4. Origin TLS sertifikasının veren kurum, SAN ve bitiş tarihi.
5. Canonical alan adı kararının açık onayı ve ardından tüm yönlendirmelerin yeniden testi.

Gerçek ziyaretçi açısından HTTPS erişimi bu ortamın tarayıcısında doğrulandı. Evre 0 hesap ayarları ve TLS ayrıntıları bakımından tamamen kapanmış değildir. Başka ağ ve bölgelerde erişimin sürekli sorunsuz olduğu iddia edilmez.

## Kanıtlar

- [HTTP yanıtları, son URL’ler ve canonical etiketleri](live-http-evidence.json)
- [A, AAAA, CNAME ve NS DNS yanıtları](live-dns-evidence.json)
- [Main derleme](https://github.com/kenancolak/urban-climate-notes/actions/runs/40065651021)
- [GitHub Pages yayını](https://github.com/kenancolak/urban-climate-notes/actions/runs/40065705798)
