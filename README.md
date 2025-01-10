Mikro Frontend Dökümantasyonu
Bu dökümantasyon, uygulamanızda mikro frontend yaklaşımını benimseyerek modüler, bağımsız geliştirme ve dağıtım süreçlerini mümkün kılmak amacıyla hazırlanmıştır. Mikro frontend, her bir özelliğin bağımsız bir birim (modül) olarak geliştirildiği ve farklı ekiplerin farklı modüller üzerinde paralel çalışabileceği bir mimaridir. Burada verilen yapı, mikro frontend yaklaşımına dayalı bir proje mimarisi örneği sunmaktadır.

1. Proje Yapısı
Projenin kök yapısında src dizini altında çeşitli alt klasörler bulunur. Her bir modül kendi bağımsız bileşenlerini, iş mantığını ve servisini içerir. redux klasörü uygulamanın küresel durum yönetimini içerir ve tüm modüller arasında paylaşılan veriler bu yapı üzerinden yönetilir. Ayrıca Services dizini, uygulamanın dış API'leri ile entegrasyon sağlar.

Proje Yapısı:
perl
Kodu kopyala
my-app
└── src
    ├── layouts                # Ortak layout bileşenleri
    ├── middleware             # Ortak yardımcı işlevler (örneğin, auth kontrolü, API interceptor)
    ├── Modules
    │   ├── Auth               # Kullanıcı kimlik doğrulama modülü
    │   │   ├── Assets         # Auth'a özgü görsel varlıklar
    │   │   ├── Components     # Auth'a özgü UI bileşenleri
    │   │   ├── Login.tsx      # Login bileşeni
    │   │   ├── Register.tsx   # Kayıt bileşeni
    │   ├── Cart               # Sepet modülü
    │   │   ├── Assets         # Cart'a özgü görsel varlıklar
    │   │   ├── Components     # Cart'a özgü UI bileşenleri
    │   │   ├── Shopping.tsx   # Alışveriş sayfası
    │   ├── Home               # Ana sayfa modülü
    │   │   ├── Assets         # Home'a özgü görsel varlıklar
    │   │   ├── Components     # Home'a özgü UI bileşenleri
    │   │   ├── Home.tsx       # Ana sayfa bileşeni
    │   ├── Order              # Sipariş modülü
    │   │   ├── Assets         # Order'a özgü görsel varlıklar
    │   │   ├── Components     # Order'a özgü UI bileşenleri
    │   │   ├── Order.tsx      # Sipariş sayfası
    ├── redux                  # Küresel durum yönetimi
    │   ├── authSlice.tsx      # Kullanıcı kimlik doğrulama durum yönetimi
    │   ├── orderSlice.tsx     # Sipariş durumu yönetimi
    │   ├── productSlice.tsx   # Ürün durumu yönetimi
    │   ├── store.tsx          # Redux store yapılandırması
    ├── Services               # API servisi ve yardımcılar
    │   ├── api.tsx            # Genel API servisleri
    │   ├── authApi.tsx        # Kimlik doğrulama API servisleri
    │   ├── productApi.tsx     # Ürün API servisleri
    ├── App.tsx                # Ana uygulama bileşeni
2. Mikro Frontend Modülleri
Projenizde her bir ana modül, belirli bir işlevselliği yerine getiren bağımsız bir yapı olarak tasarlanmıştır  Her modül, bağımsız olarak çalışan ve tüm uygulamaya entegre olan birimlerdir.

Modüllerin İçeriği:
Auth Modülü: Kullanıcı giriş, kayıt ve kimlik doğrulama işlemlerini yönetir.

Login.tsx: Kullanıcı girişi ekranı.
Register.tsx: Kullanıcı kayıt ekranı.
Assets: Kimlik doğrulama işlemi için gerekli görseller ve varlıklar.
Components: Giriş ve kayıt bileşenleri gibi kullanıcı arayüzü bileşenleri.
Cart Modülü: Kullanıcıların alışveriş sepetlerini yönetir.

Shopping.tsx: Alışveriş sayfası, sepetin görüntülendiği sayfa.
Assets: Sepetle ilgili görseller.
Components: Sepetle ilgili bileşenler.
Home Modülü: Ana sayfa içerikleri ve genel kullanıcı etkileşimlerini içerir.

Home.tsx: Ana sayfa bileşeni.
Assets: Ana sayfa için gerekli görseller.
Components: Ana sayfada yer alan bileşenler.
Order Modülü: Kullanıcıların sipariş geçmişi ve yeni sipariş verme işlemlerini içerir.

Order.tsx: Sipariş sayfası bileşeni.
Assets: Siparişle ilgili görseller.
Components: Sipariş yönetim bileşenleri.

3. Redux Durum Yönetimi
Uygulamanın küresel durumu, farklı modüller arasında paylaşılabilir. Redux, uygulamanın genel durumunu yönetmek için kullanılır. Bu durumda, her modülün ilgili veri yönetimi için Redux dilimleri (slices) içerir.

authSlice.tsx: Kullanıcı kimlik doğrulama durumunu yönetir 
orderSlice.tsx: Siparişle ilgili durumları yönetir ( geçmiş siparişler).
productSlice.tsx: Ürünle ilgili durumu yönetir (ürünler listesi).
Bu dilimler, her modülün bağımsız bir şekilde çalışmasına olanak tanır,  uygulama genelinde paylaşılabilir veri akışını da sağlar.

4. Servis Katmanı
Servisler, uygulamanın API ve veri entegrasyonlarını içerir. Her modül, ilgili servislerden bağımsız olarak faydalanabilir.
api.tsx: Genel API çağrıları ve ortak servisleri içerir.
authApi.tsx: Kullanıcı kimlik doğrulama işlemleri için API servisleri.
productApi.tsx: Ürünlerle ilgili API servisleri.
Her bir modül, yalnızca kendi işlevselliğiyle ilgili API servislerinden faydalanarak, bağımsız ve yeniden kullanılabilir hale gelir.

5. Ortak Layout ve Middleware
layouts: Uygulamanın genel layout (düzen) bileşenleri, tüm modüller tarafından paylaşılan öğeleri içerir. Örneğin, header, footer ve genel navigasyon öğeleri burada bulunur.
middleware: Uygulamanın genel işlevselliğine hizmet eden, API istekleri sırasında kimlik doğrulama ve hata yönetimi gibi işlemleri yöneten yardımcı işlevler.

6. Uygulamanın Başlangıç Yapılandırması
Ana bileşen olan App.tsx, tüm modülleri birleştirir ve kullanıcıya gösterilecek olan ana yapıyı oluşturur. Bu bileşen, ayrıca küresel durum yönetimini sağlayan Redux store'unu da içerir.





