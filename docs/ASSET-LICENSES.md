# Varlık, yazı tipi ve lisans envanteri

25 Ekim 2026. Yeni görsel, ikon, font veya bağımlılık eklenmedi. Mevcut not/görsel kaynakları değiştirilmeden korunur. Aşağıdaki eksikler, kullanım hakkının doğrulandığı anlamına gelmez.

| Varlık | Kaynak / lisans durumu |
| --- | --- |
| React, React DOM, react-markdown, remark-gfm, Vite, TypeScript ve tüm transitif paketler | Kilitli sürümleri ve SPDX lisansları `DEPENDENCY-LICENSES.md` içinde. MIT, Apache-2.0, ISC, BSD vb. Paketlerin dağıtılan LICENSE dosyaları esas alınır. |
| Site metin yazı tipleri | Arial/Helvetica/sans-serif ve Georgia/Times New Roman/serif yerel sistem yığınları. Font dosyası siteyle dağıtılmaz, uzaktan font yüklenmez. |
| PDF yazı tipleri | Mevcut PDF içinde DejaVu Sans/Serif. DejaVu / Bitstream Vera lisans ailesi. https://dejavu-fonts.github.io/License.html |
| Simgeler | Unicode oklar ve metin; üçüncü taraf ikon paketi yok. |
| `images/urban-climate-notes-logo.jpg` | Önceden depoda bulunan marka görseli. Köken/üretici ve yeniden kullanım hakkı sahibi tarafından teyit edilmeli. |
| `images/notes/01/*` (Reno; 4 görsel) | Önceden yayımlanmış. QMD bilimsel kaynakları içeriyor fakat dosya bazında görsel lisans envanteri yok. Kaynak ve izin teyidi açık. |
| `images/notes/02/*` (Tokyo; 4 görsel) | Önceden yayımlanmış. QMD bilimsel kaynakları içeriyor fakat dosya bazında görsel lisans envanteri yok. Kaynak ve izin teyidi açık. |
| `images/notes/03/*` (Hong Kong) | Dosya bazında kaynaklar ve atıflar `images/notes/03/SOURCES_AND_LICENSES.md` içinde. Bu teslimatta dış kaynak koşulları yeniden denetlenmedi. |
| `images/notes/04/*` (Phoenix) | Kaynak/atıflar `notes/04-what-temperature-are-we-actually-measuring.qmd`, Image sources and use notes. Kapak CC BY-SA 3.0, NASA/JPL kuralları, federal kamu malı ve Pexels koşulları ilgili dosyalara göre farklıdır. Bu teslimatta dış koşullar yeniden denetlenmedi. |
| Optimize WebP türevleri | Kaynak görsellerin lisansını devralır; `scripts/optimize-images.mjs` ile üretilir. |
| PR ekran görüntüleri | Bu proje arayüzünün geliştirme/inceleme kayıtları; gösterilen mevcut görsellerin üçüncü taraf haklarını kaldırmaz. |

Depoya bütün içerikleri kapsayan yeni bir açık kaynak lisansı atanmaz. Reno/Tokyo ve logo eksikleri kapatılmadan bütün varlıkların lisansının eksiksiz doğrulandığı iddia edilmemeli.
