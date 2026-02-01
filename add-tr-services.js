const fs = require('fs');
const path = require('path');

// Read the current tr.json file
const trPath = path.join(__dirname, 'src', 'locales', 'tr.json');
const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// Ensure serviceSubpages exists
if (!trData.serviceSubpages) {
  trData.serviceSubpages = {};
}

// Add Turkish translations for all 7 services
trData.serviceSubpages.cybersecurity = {
  "serviceName": "Siber Güvenlik",
  "features": {
    "headline": "Dijital Varlıklarınızı Güvenle Koruyun",
    "subtitle": "Kapsamlı Güvenlik Çözümleri",
    "description": "Proaktif güvenlik değerlendirmeleri, sağlam savunma mimarileri ve 7/24 izleme ile kuruluşları gelişen siber tehditlerden koruyoruz, verilerinizin, sistemlerinizin ve itibarınızın güvende kalmasını sağlıyoruz.",
    "items": [
      {
        "icon": "shield",
        "title": "Penetrasyon Testi ve Güvenlik Açığı Değerlendirmesi",
        "description": "Kötü niyetli aktörlerden önce uygulamalarınızdaki, ağlarınızdaki ve altyapınızdaki güvenlik açıklarını tespit eden gerçek dünya saldırı simülasyonları.",
        "details": [
          "Web ve API penetrasyon testi için OWASP Top 10 ve SANS 25 kapsamı",
          "Kablosuz ve bulut ortamları dahil ağ ve altyapı testi",
          "Önem derecesine göre sıralanmış bulgular ve çözüm rehberi içeren detaylı iyileştirme raporları"
        ]
      },
      {
        "icon": "eye",
        "title": "Güvenlik Operasyon Merkezi (SOC)",
        "description": "AI destekli SIEM platformları ve deneyimli güvenlik analistleri tarafından desteklenen 7/24 tehdit izleme, tespit ve olay müdahalesi.",
        "details": [
          "Tüm ağ uç noktalarında gerçek zamanlı log toplama ve korelasyon",
          "Yanlış pozitifleri %70 oranında azaltan AI destekli anomali tespiti",
          "Otomatik kontrol eylemleri içeren olay müdahale oyun kitapları"
        ]
      },
      {
        "icon": "lock",
        "title": "Sıfır Güven Mimarisi",
        "description": "Ağ konumundan bağımsız olarak her kullanıcıyı, cihazı ve bağlantıyı doğrulayan sıfır güven güvenlik çerçevelerini tasarlayın ve uygulayın.",
        "details": [
          "İş yüklerini izole eden ve yanal hareketi sınırlayan mikro segmentasyon stratejileri",
          "Kimlik farkında proxy ve sürekli kimlik doğrulama zorunluluğu"
        ]
      },
      {
        "icon": "cloud",
        "title": "Bulut Güvenliği ve Uyumluluk",
        "description": "AWS, Azure ve GCP'de bulut altyapınızı yanlış yapılandırma tespiti, erişim kontrolleri ve uyumluluk otomasyonu ile güvence altına alın.",
        "details": [
          "Otomatik iyileştirme iş akışları ile Bulut Güvenlik Durumu Yönetimi",
          "IAM politika denetimi ve en az ayrıcalık erişim uygulaması",
          "SOC 2, ISO 27001, HIPAA ve PCI DSS çerçeveleri için uyumluluk eşleştirmesi"
        ]
      },
      {
        "icon": "code",
        "title": "Uygulama Güvenliği (DevSecOps)",
        "description": "Otomatik tarama, kod incelemesi ve güvenli kodlama uygulamaları ile güvenliği yazılım geliştirme yaşam döngünüzün her aşamasına yerleştirin.",
        "details": [
          "Shift-left güvenliği için CI/CD pipeline'larına SAST ve DAST entegrasyonu",
          "Bağımlılık güvenlik açığı taraması ve yazılım bileşen analizi",
          "Kritik uygulama özellikleri için güvenli kod incelemesi ve tehdit modelleme"
        ]
      },
      {
        "icon": "users",
        "title": "Güvenlik Farkındalık Eğitimi",
        "description": "Tüm iş gücünüz için ilgi çekici, senaryo tabanlı güvenlik eğitimi ve gerçekçi kimlik avı simülasyonları ile insan faktörü riskini azaltın.",
        "details": [
          "Tıklama oranı takibi ile özelleştirilmiş kimlik avı simülasyon kampanyaları",
          "Yöneticiler, geliştiriciler ve genel personel için rol tabanlı eğitim modülleri"
        ]
      },
      {
        "icon": "document",
        "title": "Uyumluluk ve Risk Yönetimi",
        "description": "Düzenleyici gereksinimleri karşılayan ve genel güvenlik duruşunuzu güçlendiren kapsamlı yönetişim, risk ve uyumluluk programları.",
        "details": [
          "NIST, ISO 27001 ve CIS Controls ile uyumlu risk değerlendirme çerçeveleri",
          "Veri işleme, olay müdahalesi ve iş sürekliliğini kapsayan politika geliştirme",
          "Denetim hazırlığı ve kanıt toplama otomasyonu"
        ]
      },
      {
        "icon": "lightning",
        "title": "Olay Müdahalesi ve Adli Bilişim",
        "description": "Güvenlik ihlallerini kontrol altına almak, operasyonları kurtarmak ve kanıtları korumak için hızlı olay müdahale yetenekleri ve dijital adli bilişim uzmanlığı.",
        "details": [
          "Olay bildirimi alındıktan sonra 1 saat içinde acil müdahale",
          "Kanıt zinciri koruması ile dijital adli bilişim",
          "Olay sonrası analiz ve güvenlik iyileştirme yol haritaları"
        ]
      }
    ],
    "stats": [
      {
        "label": "Aylık Engellenen Tehdit",
        "value": "15M+"
      },
      {
        "label": "Ort. Olay Müdahalesi",
        "value": "<1sa"
      },
      {
        "label": "Uyumluluk Çerçeveleri",
        "value": "12+"
      },
      {
        "label": "Bulunan Güvenlik Açıkları",
        "value": "50K+"
      }
    ]
  },
  "process": {
    "headline": "Siber Güvenlik Sürecimiz",
    "subtitle": "Sistematik Derinlemesine Savunma",
    "description": "Risk durumunuzu değerlendiren, katmanlı savunmalar uygulayan ve gelişen tehditlere karşı kuruluşunuzu korumak için sürekli izleme oluşturan kapsamlı bir güvenlik metodolojisi.",
    "steps": [
      {
        "title": "Güvenlik Değerlendirmesi ve Risk Analizi",
        "description": "Ağ mimarisi, erişim kontrolleri, veri akışları ve tehdit maruziyeti dahil mevcut güvenlik duruşunuzun kapsamlı değerlendirmesini yapın.",
        "icon": "search",
        "details": [
          "Şirket içi ve bulut ortamlarında varlık envanteri ve saldırı yüzeyi haritalama",
          "Olasılık, etki ve mevcut kontrol etkinliğine dayalı risk puanlama",
          "Sektör çerçeveleri ve düzenleyici gereksinimlere karşı boşluk analizi"
        ]
      },
      {
        "title": "Mimari ve Politika Tasarımı",
        "description": "Risk profilinize ve iş gereksinimlerinize göre özelleştirilmiş politikalar, prosedürler ve teknik kontrollerle katmanlı bir güvenlik mimarisi tasarlayın.",
        "icon": "shield",
        "details": [
          "Ağ segmentasyonu ve sıfır güven mimarisi planları",
          "Erişim yönetimi, veri koruma ve olay müdahalesini kapsayan güvenlik politika paketi"
        ]
      },
      {
        "title": "Uygulama ve Sağlamlaştırma",
        "description": "Tüm teknoloji yığınınızda güvenlik araçları dağıtın, konfigürasyonları sağlamlaştırın ve izleme altyapısı kurun.",
        "icon": "wrench",
        "details": [
          "Özel tespit kuralları ve korelasyon mantığı ile SIEM dağıtımı",
          "EDR ve uygulama beyaz listelemesi ile uç nokta koruma dağıtımı",
          "Ağ güvenlik duvarı, WAF ve DDoS koruma yapılandırması"
        ]
      },
      {
        "title": "Test ve Doğrulama",
        "description": "Gerçek dünya etkinliğini sağlamak için penetrasyon testi, kırmızı takım çalışmaları ve masa üstü simülasyonlar yoluyla her kontrolü doğrulayın.",
        "icon": "check",
        "details": [
          "Harici, dahili ve sosyal mühendislik vektörlerini kapsayan tam kapsamlı penetrasyon testi",
          "Fidye yazılımı, veri ihlali ve içeriden tehdit senaryolarını simüle eden masa üstü alıştırmaları"
        ]
      },
      {
        "title": "Sürekli İzleme ve Müdahale",
        "description": "7/24 izleme, düzenli değerlendirmeler ve uyarlanabilir tehdit istihbaratı güncellemeleri ile devam eden güvenlik operasyonları oluşturun.",
        "icon": "eye",
        "details": [
          "Kademeli yükseltme ve otomatik kontrol oyun kitapları ile SOC izleme",
          "Üç aylık güvenlik açığı taraması ve yıllık penetrasyon testi döngüleri",
          "Gelişen saldırı kalıpları için tespit kurallarına entegre tehdit istihbaratı beslemeleri"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Güvenlik Teknoloji Yığını",
    "subtitle": "Savunma Sınıfı Araçlar ve Platformlar",
    "description": "Gelişen tehdit ortamına uyum sağlayan dirençli savunma sistemleri oluşturmak için sektör lideri güvenlik teknolojilerini dağıtıyor ve yönetiyoruz.",
    "categories": [
      {
        "category": "İzleme ve Tespit",
        "items": [
          {
            "name": "Elasticsearch",
            "description": "Log toplama, tehdit korelasyonu ve güvenlik analitiği için temel SIEM veri deposu"
          },
          {
            "name": "Grafana",
            "description": "Tehdit aktivitesi ve sistem sağlığı için gerçek zamanlı görünürlük sağlayan güvenlik operasyonları gösterge panelleri"
          },
          {
            "name": "Prometheus",
            "description": "Güvenlik açısından kritik sistemler ve ağ cihazları için altyapı izleme ve uyarı"
          },
          {
            "name": "Kafka",
            "description": "Gerçek zamanlı güvenlik log işleme ve tehdit tespit pipeline'ları için yüksek verimli olay akışı"
          }
        ]
      },
      {
        "category": "Altyapı ve Bulut Güvenliği",
        "items": [
          {
            "name": "AWS",
            "description": "Kapsamlı AWS ortam koruması için GuardDuty, Security Hub ve WAF"
          },
          {
            "name": "Azure",
            "description": "Microsoft ekosistem güvenlik orkestrasyonu için Sentinel SIEM ve Defender for Cloud"
          },
          {
            "name": "Terraform",
            "description": "Güvenlik politikası uygulaması ve sapma tespiti ile altyapı-kod olarak"
          },
          {
            "name": "Docker",
            "description": "Konteynerleştirilmiş iş yükleri için konteyner güvenlik taraması ve çalışma zamanı koruması"
          }
        ]
      },
      {
        "category": "Uygulama ve Kod Güvenliği",
        "items": [
          {
            "name": "Python",
            "description": "Özel güvenlik otomasyon betikleri, güvenlik açığı tarayıcılar ve olay müdahale araçları"
          },
          {
            "name": "Jenkins",
            "description": "Otomatik SAST, DAST ve bağımlılık taraması için CI/CD pipeline entegrasyonu"
          },
          {
            "name": "Nginx",
            "description": "Uygulama koruması için WAF kuralları, hız sınırlama ve TLS sonlandırma ile ters proxy"
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "Siber Güvenlik Vaka Çalışmaları",
    "subtitle": "Önemli Kuruluşları Korumak",
    "description": "Siber güvenlik çözümlerimizin hassas verileri işleyen kuruluşlar için ihlalleri nasıl önlediğine, uyumluluğa nasıl ulaştığına ve dirençli güvenlik programları nasıl oluşturduğuna dair gerçek örnekler.",
    "items": [
      {
        "title": "Finans Hizmetleri Güvenlik Revizyonu",
        "industry": "Finans Hizmetleri",
        "challenge": "Yıllık 2 milyar dolar işlem hacmine sahip bir fintek şirketinin resmi güvenlik programı yoktu, güncel olmayan güvenlik duvarları vardı ve bankacılık ortaklıklarını riske atan iki küçük veri olayı yaşamıştı.",
        "solution": "Sıfır güven ağ mimarisi, 7/24 izleme ile SOC-as-a-Service, DevSecOps pipeline entegrasyonu ve SOC 2 Type II uyumluluk çerçevesi dahil kapsamlı bir güvenlik programı tasarladık ve uyguladık.",
        "results": [
          "8 ay içinde SOC 2 Type II sertifikasyonu elde edildi",
          "Uygulama sonrası 18 ayda sıfır güvenlik olayı",
          "Ağ segmentasyonu ve erişim kontrolleri ile saldırı yüzeyinde %75 azalma"
        ],
        "stats": [
          {
            "label": "SOC 2 Süresi",
            "value": "8 ay"
          },
          {
            "label": "Güvenlik Olayları",
            "value": "0"
          }
        ]
      },
      {
        "title": "Sağlık Veri Koruma Programı",
        "industry": "Sağlık",
        "challenge": "3 milyon hasta kaydı saklayan çok merkezli bir sağlık sağlayıcısı, bilinen güvenlik açıkları olan ve merkezi güvenlik izlemesi olmayan eski sistemleri modernize ederken HIPAA uyumluluğunu sağlaması gerekiyordu.",
        "solution": "Şifrelenmiş veri depolama, ağ mikro segmentasyonu, ayrıcalıklı erişim yönetimi, sağlık hizmetlerine özgü tespit kuralları ile SIEM dağıtımı ve kapsamlı personel güvenlik eğitimi dahil uçtan uca güvenlik kontrolleri uyguladık.",
        "results": [
          "HIPAA denetiminden sıfır kritik bulgu ile geçti",
          "Eğitim yoluyla kimlik avı duyarlılığı %32'den %4 tıklama oranına düşürüldü"
        ],
        "stats": [
          {
            "label": "HIPAA Uyumluluğu",
            "value": "100%"
          },
          {
            "label": "Kimlik Avı Tıklama Oranı",
            "value": "4%"
          }
        ]
      },
      {
        "title": "E-Ticaret Platform Sağlamlaştırması",
        "industry": "Perakende ve E-Ticaret",
        "challenge": "500.000 aktif kullanıcıya sahip bir e-ticaret platformu, müşteri güvenini aşındıran ve tekrarlayan kesintilere neden olan sofistike bot saldırıları, kimlik bilgisi doldurma kampanyaları ve DDoS girişimlerinin hedefi olmuştu.",
        "solution": "Bot tespiti ile gelişmiş WAF, DDoS azaltma, hız sınırlama, kimlik bilgisi doldurma koruması ve otomatik engelleme kuralları ile gerçek zamanlı tehdit istihbaratı entegrasyonu dahil çok katmanlı savunma dağıttık.",
        "results": [
          "Yasal kullanıcı deneyimini korurken kötü amaçlı bot trafiğinin %99,7'si engellendi",
          "DDoS kaynaklı kesinti süresi ortadan kaldırıldı, %99,99 çalışma süresi elde edildi",
          "Davranışsal analiz yoluyla sahte hesap oluşturmada %94 azalma"
        ],
        "stats": [
          {
            "label": "Engellenen Bot Trafiği",
            "value": "99.7%"
          },
          {
            "label": "Platform Çalışma Süresi",
            "value": "99.99%"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Tamamlanan Güvenlik Değerlendirmeleri",
        "value": "300+"
      },
      {
        "label": "Müdahale Edilen Olaylar",
        "value": "1,200+"
      },
      {
        "label": "Elde Edilen Uyumluluk Sertifikaları",
        "value": "85+"
      },
      {
        "label": "Korunan Uç Noktalar",
        "value": "50K+"
      }
    ]
  },
  "faq": {
    "headline": "Siber Güvenlik SSS",
    "subtitle": "Güvenlik Sorularınız Yanıtlandı",
    "description": "Siber güvenlik hizmetlerimiz, metodolojilerimiz ve kuruluşların güçlü güvenlik duruşları oluşturup sürdürmelerine nasıl yardımcı olduğumuz hakkında sık sorulan sorular.",
    "categories": [
      {
        "category": "Değerlendirme ve Test",
        "items": [
          {
            "question": "Ne sıklıkla penetrasyon testi yapmalıyız?",
            "answer": "Finans hizmetleri, sağlık ve e-ticaret gibi yüksek riskli ortamlar için üç aylık değerlendirmelerle en az yıllık penetrasyon testi öneriyoruz. Ayrıca, büyük altyapı değişiklikleri, uygulama sürümleri veya güvenlik olayları sonrasında test yapılmalıdır."
          },
          {
            "question": "Güvenlik açığı taraması ile penetrasyon testi arasındaki fark nedir?",
            "answer": "Güvenlik açığı taraması, bilinen güvenlik açıklarını tanımlayan otomatik araç tabanlı bir değerlendirmedir. Penetrasyon testi, yetenekli güvenlik profesyonellerinin aktif olarak güvenlik açıklarını istismar etmeye, bulguları birbirine bağlamaya ve gerçek iş etkisini değerlendirmek için gerçek saldırgan davranışını simüle etmesiyle daha ileri gider."
          },
          {
            "question": "Penetrasyon testi üretim sistemlerimizi kesintiye uğratır mı?",
            "answer": "Kesintiye uğratmayı en aza indirmek için tasarlanmış dikkatli kapsam belirleme ve çalışma kuralları ile test yapıyoruz. Üretim ortamları için yıkıcı olmayan teknikler kullanıyoruz ve yoğun testleri bakım pencereleri sırasında planlıyoruz. Sürekli iletişim halindeyiz ve herhangi bir etki tespit edilirse testi hemen duraklatabiliyoruz."
          }
        ]
      },
      {
        "category": "Uyumluluk ve Yönetişim",
        "items": [
          {
            "question": "Hangi uyumluluk çerçevelerini destekliyorsunuz?",
            "answer": "SOC 2 Type I ve II, ISO 27001, HIPAA, PCI DSS, GDPR, NIST Siber Güvenlik Çerçevesi, CIS Controls ve FedRAMP konusunda derin uzmanlığımız var. Ayrıca sektöre özgü düzenlemeleri destekliyoruz ve denetim yorgunluğunu azaltmak için kontrolleri birden fazla çerçevede eşleyebiliyoruz."
          },
          {
            "question": "Sıfırdan SOC 2 uyumluluğunu sağlamak ne kadar sürer?",
            "answer": "Resmi güvenlik programı olmayan kuruluşlar için SOC 2 Type I genellikle 4-6 ay sürer ve Type II ek 6-12 aylık gözlem süresi gerektirir. Kontrolleri paralel olarak uygulayarak ve manuel kanıt toplamayı azaltmak için otomasyon kullanarak bu zaman çizelgesini hızlandırıyoruz."
          },
          {
            "question": "Sertifikasyon sonrası devam eden uyumluluk bakımında yardımcı oluyor musunuz?",
            "answer": "Evet. Kanıt toplamayı otomatikleştiren, kontrol etkinliğini takip eden ve politika sapmalarını size bildiren sürekli uyumluluk izleme sağlıyoruz. Bu, yıllık değerlendirmelerden önce aceleye kapılmak yerine yıl boyunca denetim için hazır olmanızı sağlar."
          }
        ]
      },
      {
        "category": "Yönetilen Güvenlik Hizmetleri",
        "items": [
          {
            "question": "SOC-as-a-Service hizmetiniz neler içerir?",
            "answer": "SOC-as-a-Service'imiz 7/24 tehdit izleme, log yönetimi, olay tespit ve müdahalesi, tehdit avı, aylık güvenlik raporları ve üç aylık güvenlik incelemeleri sağlar. Ortamınızı anlayan özel analistlerle ekibinizin bir uzantısı olarak hareket ediyoruz."
          },
          {
            "question": "Tespit edilen bir güvenlik olayını nasıl ele alıyorsunuz?",
            "answer": "Yapılandırılmış bir olay müdahale süreci izliyoruz: tehdidi tespit edip doğrulayın, yayılmayı önlemek için kontrol altına alın, kök nedeni ortadan kaldırın, etkilenen sistemleri kurtarın ve olay sonrası analiz yapın. Süreç boyunca ekibinizle iletişim halinde kalıyoruz ve iyileştirme önerileri içeren detaylı bir olay raporu sağlıyoruz."
          },
          {
            "question": "Mevcut güvenlik araçlarımızla entegre olabilir misiniz?",
            "answer": "Kesinlikle. CrowdStrike, SentinelOne, Palo Alto, Fortinet, Okta ve daha fazlası dahil tüm büyük güvenlik platformlarıyla entegre oluyoruz. SIEM'imiz neredeyse her kaynaktan log alabilir ve teknoloji yığınınıza ve tehdit profilinize özel tespit kuralları oluşturuyoruz."
          }
        ]
      }
    ]
  }
};

trData.serviceSubpages["devops-cloud"] = {
  "serviceName": "DevOps & Cloud",
  "features": {
    "headline": "Modern Altyapı ile Teslimatı Hızlandırın",
    "subtitle": "DevOps ve Cloud Mühendisliği",
    "description": "Mühendislik ekiplerinizin daha hızlı teslimat yapmasını, zahmetsizce ölçeklenmesini ve güvenle çalışmasını sağlayan bulut altyapısı ve DevOps pipeline'ları tasarlıyor, oluşturuyor ve yönetiyoruz.",
    "items": [
      {
        "icon": "cloud",
        "title": "Bulut Mimarisi ve Taşıma",
        "description": "Riski en aza indiren, maliyetleri düşüren ve altyapınızı ölçeklenebilir büyüme için konumlandıran stratejik bulut taşıma ve mimari tasarım.",
        "details": [
          "İş yükü bazında taşıma planlaması ile bulut hazırlık değerlendirmesi",
          "Lift-and-shift, yeniden platformlama ve bulut-doğal yeniden yapılandırma stratejileri",
          "Yedeklilik ve satıcı esnekliği için çoklu bulut ve hibrit mimari tasarımları"
        ]
      },
      {
        "icon": "rocket",
        "title": "CI/CD Pipeline Mühendisliği",
        "description": "Yerleşik kalite kontrolleri ile sürüm döngülerini haftalardan dakikalara düşüren otomatik derleme, test ve dağıtım pipeline'ları.",
        "details": [
          "Otomatik test, güvenlik taraması ve onay kapıları ile çok aşamalı pipeline'lar",
          "Sıfır kesinti süresi için mavi-yeşil ve kanarya dağıtım stratejileri"
        ]
      },
      {
        "icon": "server",
        "title": "Kod Olarak Altyapı",
        "description": "Sürüm kontrolü altında, eşler arası incelenmiş ve ortamlar arası tekrarlanabilir tamamen kodlanmış altyapı.",
        "details": [
          "Yeniden kullanılabilir, birleştirilebilir altyapı bileşenleri için Terraform ve Pulumi modülleri",
          "Altyapı değişikliklerinin uygulama kodu ile aynı inceleme sürecini izlediği GitOps iş akışları",
          "Geliştirme, hazırlık ve üretim tutarlılığını sağlayan ortam eşitliği zorunluluğu"
        ]
      },
      {
        "icon": "cog",
        "title": "Konteyner Orkestrasyonu",
        "description": "Ölçekleme, ağ oluşturma ve servis keşfini otomatik olarak yöneten üretim sınıfı Kubernetes kümeleri ve konteyner yönetim platformları.",
        "details": [
          "Çok kiracılılık, RBAC ve ağ politikaları ile Kubernetes küme tasarımı",
          "Standartlaştırılmış uygulama dağıtımları için Helm chart geliştirme ve yönetimi",
          "Güvenli servisler arası iletişim ve gözlemlenebilirlik için servis mesh uygulaması"
        ]
      },
      {
        "icon": "chart",
        "title": "Gözlemlenebilirlik ve İzleme",
        "description": "Ekiplerinize sistem sağlığı ve performansı hakkında tam görünürlük sağlayan kapsamlı izleme, loglama ve izleme platformları.",
        "details": [
          "Birleşik gözlemlenebilirlik gösterge panellerinde korelasyonlu metrikler, loglar ve izler",
          "Akıllı gürültü azaltma ve yükseltme yönlendirmesi ile özel uyarı"
        ]
      },
      {
        "icon": "lightning",
        "title": "Performans ve Maliyet Optimizasyonu",
        "description": "Performans gereksinimlerini bulut harcama verimliliği ile dengeleyen sürekli altyapı optimizasyonu.",
        "details": [
          "İşlem, depolama ve veritabanı örnekleri için doğru boyutlandırma analizi",
          "Bulut harcamalarını %30-50 azaltan ayrılmış örnek ve tasarruf planı stratejileri",
          "Gerçek talep kalıplarına göre ayarlanmış otomatik ölçeklendirme politikaları"
        ]
      },
      {
        "icon": "wrench",
        "title": "Site Güvenilirlik Mühendisliği",
        "description": "Sistemlerinizin hata bütçeleri, SLO'lar ve otomatik iyileştirme yoluyla kullanılabilirlik hedeflerini karşılamasını sağlayan SRE uygulamaları ve araçları.",
        "details": [
          "Kritik hizmetler için SLI/SLO tanımı ve hata bütçesi takibi",
          "Yaygın olay türleri için MTTR'yi azaltan otomatik runbook'lar",
          "Arıza koşulları altında direnci doğrulayan kaos mühendisliği deneyleri"
        ]
      },
      {
        "icon": "database",
        "title": "Veritabanı Operasyonları ve Ölçeklendirme",
        "description": "Üretim iş yükleri için provizyon, replikasyon, yedekleme, felaket kurtarma ve performans ayarı dahil yönetilen veritabanı operasyonları.",
        "details": [
          "Yatay veritabanı ölçeklendirmesi için okuma replikası ve sharding stratejileri",
          "Zaman içinde kurtarma ve çapraz bölge replikasyonu ile otomatik yedekleme programları"
        ]
      }
    ],
    "stats": [
      {
        "label": "Dağıtım Sıklığı",
        "value": "50x"
      },
      {
        "label": "Altyapı Çalışma Süresi",
        "value": "99.99%"
      },
      {
        "label": "Bulut Maliyet Tasarrufu",
        "value": "40%"
      },
      {
        "label": "Dağıtım Süresi Azalması",
        "value": "90%"
      }
    ]
  },
  "process": {
    "headline": "DevOps ve Cloud Sürecimiz",
    "subtitle": "Eski Sistemden Modern Altyapıya",
    "description": "Manuel, kırılgan altyapıyı otomatik, dirençli bulut platformlarına dönüştüren, hız, güvenilirlik ve maliyet verimliliğinde ölçülebilir iyileştirmeler sağlayan kanıtlanmış bir metodoloji.",
    "steps": [
      {
        "title": "Altyapı Değerlendirmesi",
        "description": "Darboğazları ve iyileştirme fırsatlarını belirlemek için mevcut altyapınızı, dağıtım süreçlerinizi ve operasyonel uygulamalarınızı değerlendirin.",
        "icon": "search",
        "details": [
          "İşlem, ağ, depolama ve güvenlik katmanlarını kapsayan mimari inceleme",
          "Sektör en iyi uygulamalarına göre karşılaştırmalı CI/CD olgunluk değerlendirmesi",
          "İsraf tanımlama ve optimizasyon fırsatları ile bulut maliyet analizi"
        ]
      },
      {
        "title": "Mimari ve Yol Haritası Tasarımı",
        "description": "Hız, risk ve iş sürekliliğini dengeleyen hedef durum bulut mimarisi ve aşamalı taşıma yol haritası tasarlayın.",
        "icon": "document",
        "details": [
          "Ağ topolojisi ve güvenlik sınırları ile hedef mimari diyagramları",
          "İş yüklerini karmaşıklık ve iş etkisine göre önceliklendiren taşıma dalga planlaması"
        ]
      },
      {
        "title": "Pipeline ve Altyapı İnşası",
        "description": "CI/CD pipeline'ları uygulayın, kod yoluyla bulut altyapısı sağlayın ve konteyner orkestrasyon platformları kurun.",
        "icon": "wrench",
        "details": [
          "Otomatik test ve dağıtım aşamaları ile CI/CD pipeline inşası",
          "Tüm altyapı bileşenleri için Terraform modül geliştirme",
          "Üretime hazır konfigürasyonlarla Kubernetes küme sağlama"
        ]
      },
      {
        "title": "Taşıma ve Dağıtım",
        "description": "Minimum kesinti ile taşıma planını yürütün, her iş yükünü doğrulayın ve üretim trafiğini kesmeden önce izleme kurun.",
        "icon": "rocket",
        "details": [
          "Her aşamada geri alma prosedürleri ile kademeli taşıma yürütme",
          "Yeni ortamda performans kıyaslama ve yük testi"
        ]
      },
      {
        "title": "Optimizasyon ve Teslim",
        "description": "Performansı ince ayarlayın, maliyetleri optimize edin, her şeyi belgeleyin ve ekibinizi platformu bağımsız olarak işletmesi ve genişletmesi için eğitin.",
        "icon": "check",
        "details": [
          "Ortalama %35 bulut harcaması azaltan maliyet optimizasyon geçişi",
          "Kapsamlı runbook ve mimari dokümantasyonu",
          "IaC iş akışları, izleme araçları ve olay müdahale prosedürleri konusunda ekip eğitimi"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "DevOps ve Cloud Teknoloji Yığını",
    "subtitle": "Üretimde Kanıtlanmış Altyapı Araçları",
    "description": "Her ölçekte otomatik, gözlemlenebilir ve dirençli altyapı oluşturmak için savaş testinden geçmiş araçlar ve platformlar kullanıyoruz.",
    "categories": [
      {
        "category": "Bulut Platformları ve IaC",
        "items": [
          {
            "name": "AWS",
            "description": "İşlem, ağ, depolama ve yönetilen hizmetler için birincil bulut platformu"
          },
          {
            "name": "Google Cloud",
            "description": "Kubernetes ve sunucusuz iş yükleri için GKE, BigQuery ve Cloud Run"
          },
          {
            "name": "Azure",
            "description": "Microsoft merkezli ortamlar için AKS, Azure DevOps ve yönetilen veritabanı hizmetleri"
          },
          {
            "name": "Terraform",
            "description": "Durum yönetimi ve sapma tespiti ile çoklu bulut sağlama için Kod Olarak Altyapı"
          }
        ]
      },
      {
        "category": "Konteynerler ve Orkestrasyon",
        "items": [
          {
            "name": "Docker",
            "description": "Tutarlı uygulama paketleme için konteyner çalışma zamanı ve görüntü oluşturma"
          },
          {
            "name": "Kubernetes",
            "description": "Otomatik ölçeklendirme ve kendini iyileştirme ile üretim sınıfı konteyner orkestrasyonu"
          },
          {
            "name": "Nginx",
            "description": "Trafik yönetimi ve TLS sonlandırma için Ingress controller ve ters proxy"
          },
          {
            "name": "Jenkins",
            "description": "Karmaşık derleme ve dağıtım pipeline orkestrasyonu için CI/CD otomasyon sunucusu"
          }
        ]
      },
      {
        "category": "İzleme ve Gözlemlenebilirlik",
        "items": [
          {
            "name": "Prometheus",
            "description": "Altyapı ve uygulama izleme için metrik toplama ve uyarı"
          },
          {
            "name": "Grafana",
            "description": "Birleşik gösterge panellerinde metrikler, loglar ve izler için görselleştirme platformu"
          },
          {
            "name": "Elasticsearch",
            "description": "Sorun giderme ve denetim için merkezi log yönetimi ve analizi"
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "DevOps ve Cloud Vaka Çalışmaları",
    "subtitle": "Sonuç Veren Altyapı Dönüşümleri",
    "description": "Kuruluşların altyapılarını modernize etmelerine, dağıtımları hızlandırmalarına ve müşterilerinin beklediği güvenilirliğe ulaşmalarına nasıl yardımcı olduğumuzu görün.",
    "items": [
      {
        "title": "SaaS Platform Bulut Taşıması",
        "industry": "Teknoloji (SaaS)",
        "challenge": "10.000 müşterisi olan bir B2B SaaS şirketi, manuel dağıtımlarla tek bir fiziksel sunucuda çalışıyordu, aylık kesintiler yaşıyordu ve %99,95 SLA gerektiren büyük bir kurumsal sözleşme için ölçeklenemiyordu.",
        "solution": "Tüm platformu otomatik ölçeklendirmeli ECS kümeleri, RDS Multi-AZ veritabanları, CloudFront CDN ve mavi-yeşil dağıtımlar ve otomatik geri alma yetenekleri ile tam otomatik CI/CD pipeline ile AWS'ye taşıdık.",
        "results": [
          "12 ay boyunca kurumsal SLA gereksinimini aşan %99,99 çalışma süresi elde edildi",
          "Dağıtım süresi 4 saatlik manuel çalışmadan 8 dakika tam otomatiğe düşürüldü",
          "Müdahale olmadan ürün lansmanları sırasında 5 kat trafik artışlarını yönetti"
        ],
        "stats": [
          {
            "label": "Elde Edilen Çalışma Süresi",
            "value": "99.99%"
          },
          {
            "label": "Dağıtım Süresi",
            "value": "8 dk"
          }
        ]
      },
      {
        "title": "Fintek Kubernetes Platformu",
        "industry": "Finans Hizmetleri",
        "challenge": "Büyüyen bir fintek girişimi, standartlaşma olmadan VM'ler arasında manuel olarak dağıtılan 30 mikroservise sahipti, tutarsız ortamlar vardı ve rekabet etme yeteneklerini sınırlayan 2 haftalık sürüm döngüleri vardı.",
        "solution": "Terraform yönetimli altyapı, Helm tabanlı dağıtımlar, güvenli servisler arası iletişim için servis mesh ve geliştiricilerin güvenle kendi kendine dağıtım yapmasını sağlayan GitOps iş akışları ile bir üretim Kubernetes platformu oluşturduk.",
        "results": [
          "Sürüm döngüsü 2 haftadan günde birden fazla dağıtıma düşürüldü",
          "Verimli konteyner paketleme ve otomatik ölçeklendirme yoluyla altyapı maliyetleri %42 azaltıldı"
        ],
        "stats": [
          {
            "label": "Sürüm Sıklığı",
            "value": "Günlük"
          },
          {
            "label": "Maliyet Azalması",
            "value": "42%"
          }
        ]
      },
      {
        "title": "Medya Yayın Altyapı Ölçeklendirmesi",
        "industry": "Medya ve Eğlence",
        "challenge": "Canlı yayın platformu, 100.000+ eşzamanlı izleyici ile zirve olayları sırasında tamponlama, düşen bağlantılar ve reklamveren kaybından önemli gelir kaybı ile sonuçlanan felaket arızalar yaşadı.",
        "solution": "Çoklu bölge CDN dağıtımı, otomatik ölçeklendirmeli kod dönüştürme kümeleri, Redis tabanlı oturum yönetimi ve gerçek zamanlı kapasite tahmini ile kapsamlı gözlemlenebilirlik ile yayın altyapısını yeniden mimarlandık.",
        "results": [
          "Büyük bir canlı etkinlik sırasında sıfır tamponlama ile 500.000 eşzamanlı izleyiciyi başarıyla yönetti",
          "Akıllı ölçeklendirme ve CDN optimizasyonu yoluyla izleyici başına altyapı maliyeti %60 azaltıldı",
          "12 CDN kenar konumunda global olarak 200ms altında P99 gecikme elde edildi"
        ],
        "stats": [
          {
            "label": "Zirve Eşzamanlı Kullanıcı",
            "value": "500K"
          },
          {
            "label": "İzleyici Başına Maliyet Düşüşü",
            "value": "60%"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Tamamlanan Bulut Taşımaları",
        "value": "75+"
      },
      {
        "label": "Üretimdeki Konteynerler",
        "value": "10K+"
      },
      {
        "label": "Ortalama Elde Edilen Çalışma Süresi",
        "value": "99.97%"
      },
      {
        "label": "Oluşturulan CI/CD Pipeline'ları",
        "value": "200+"
      }
    ]
  },
  "faq": {
    "headline": "DevOps ve Cloud SSS",
    "subtitle": "Altyapı Sorularınız Yanıtlandı",
    "description": "Bulut taşıması, DevOps uygulamaları ve mühendislik ekiplerinin modern altyapı oluşturup işletmelerine nasıl yardımcı olduğumuz hakkında sık sorulan sorular.",
    "categories": [
      {
        "category": "Bulut Taşıması",
        "items": [
          {
            "question": "Bulut taşımaları sırasında kesinti süresini nasıl en aza indiriyorsunuz?",
            "answer": "Paralel ortamlarla aşamalı bir taşıma yaklaşımı kullanıyoruz. Mevcut sistemleriniz, bulut ortamını oluşturup doğrularken çalışmaya devam eder. Veritabanı taşımaları, neredeyse sıfır kesinti süresi geçişi için replikasyon tabanlı yaklaşımlar kullanır. Her aşamada her zaman geri alma yeteneklerini koruruz."
          },
          {
            "question": "Hangi bulut sağlayıcısını önerirsiniz: AWS, Azure veya Google Cloud?",
            "answer": "En iyi seçim, mevcut teknoloji yığınınıza, ekip uzmanlığınıza, uyumluluk gereksinimlerinize ve belirli iş yükü özelliklerinize bağlıdır. Çoklu bulut uzmanlarıyız ve ihtiyaçlarınıza en uygun platformu öneriyoruz. Birçok müşteri, ikincil sağlayıcılardan belirli hizmetlerle birincil bir buluttan fayda sağlar."
          },
          {
            "question": "Tipik bir bulut taşıması ne kadar sürer?",
            "answer": "5-10 iş yükünün odaklanmış bir taşıması genellikle 2-4 ay sürer. 50+ iş yükü, karmaşık bağımlılıklar ve uyumluluk gereksinimleri olan daha büyük kurumsal taşımalar 6-12 ay arasında değişir. Büyük bir geçiş beklemek yerine artımlı olarak faydalar görebilmeniz için dalgalar halinde teslim ediyoruz."
          }
        ]
      },
      {
        "category": "DevOps Uygulamaları",
        "items": [
          {
            "question": "Ekibimizin DevOps deneyimi sınırlıysa ne olur?",
            "answer": "Olduğunuz yerden başlıyoruz. Çalışmalarımız uygulamalı bilgi aktarımı ve eşli programlama oturumları içerir. İlk pipeline'ları ve altyapıyı oluştururuz, ardından dokümantasyon, eğitim ve geçiş desteği ile sahipliği kademeli olarak ekibinize devrederiz."
          },
          {
            "question": "CI/CD pipeline'larında sırları ve hassas konfigürasyonu nasıl yönetiyorsunuz?",
            "answer": "AWS Secrets Manager, HashiCorp Vault veya Azure Key Vault gibi araçları kullanarak özel sır yönetimi uyguluyoruz. Sırlar asla kod depolarında saklanmaz. Pipeline'lar çalışma zamanında güvenli enjeksiyon yoluyla sırlara erişir ve tüm erişim denetlenir ve rol kontrollüdür."
          },
          {
            "question": "Mevcut CI/CD araçlarımızla çalışabilir misiniz?",
            "answer": "Evet. Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure DevOps ve daha birçoğu ile deneyimimiz var. Mevcut pipeline'larınızı optimize edebilir veya faydalar çabayı haklı çıkardığında taşımaları önerebiliriz. Odağımız belirli araçlar değil, sonuçlardır."
          }
        ]
      },
      {
        "category": "Maliyet ve Operasyonlar",
        "items": [
          {
            "question": "Buluta taşınarak ne kadar tasarruf edebiliriz?",
            "answer": "Maliyet sonuçları değişir. Bazı müşteriler doğru boyutlandırma ve ayrılmış kapasite yoluyla altyapı maliyetlerini %30-50 azaltır. Diğerleri maliyetlerde hafif bir artış görür ancak dağıtım hızı, güvenilirlik ve ölçeklenebilirlikte dramatik kazançlar elde eder. Değerlendirme aşamasında detaylı maliyet projeksiyonları sağlıyoruz."
          },
          {
            "question": "Taşıma sonrası devam eden altyapı yönetimi sağlıyor musunuz?",
            "answer": "Evet. 7/24 izleme, olay müdahalesi, güvenlik yamaları, maliyet optimizasyonu ve altyapı güncellemeleri dahil yönetilen DevOps hizmetleri sunuyoruz. Birçok müşteri tam yönetimle başlar ve ekipleri yetenek oluşturdukça kademeli olarak kendi kendine yönetime geçer."
          },
          {
            "question": "Bulut maliyet sürprizlerini nasıl önlüyorsunuz?",
            "answer": "Bütçe uyarıları, maliyet tahsisi için etiketleme politikaları, otomatik raporlar ve düzenli maliyet inceleme oturumları uyguluyoruz. Altyapı kodumuz kaynak limitleri ve ölçeklendirme sınırları içerir. Ayrıca beklenmedik harcama artışlarını önemli hale gelmeden önce yakalamak için anomali tespiti kuruyoruz."
          }
        ]
      }
    ]
  }
};

trData.serviceSubpages["digital-marketing"] = {
  "serviceName": "Dijital Pazarlama",
  "features": {
    "headline": "Dönüşüm Sağlayan Veri Odaklı Pazarlama",
    "subtitle": "Tam Hunili Dijital Pazarlama",
    "description": "Nitelikli potansiyel müşteriler çeken, olasılıkları besleyen ve her kanalda ölçülebilir gelir artışı sağlayan dijital pazarlama programları oluşturmak için yaratıcı stratejiyi analitik titizlikle birleştiriyoruz.",
    "items": [
      {
        "icon": "search",
        "title": "SEO ve Organik Büyüme",
        "description": "Arama görünürlüğünü artıran, nitelikli organik trafiği artıran ve sürdürülebilir uzun vadeli hedef kitle kazanım kanalları oluşturan teknik ve içerik SEO stratejileri.",
        "details": [
          "Site hızı, taranabilirlik, şema işaretlemesi ve Core Web Vitals'ı kapsayan teknik SEO denetimleri",
          "Arama niyeti ve alıcı yolculuğu aşamalarıyla uyumlu anahtar kelime araştırması ve içerik stratejisi",
          "Dijital PR, misafir içerik ve kaynak tabanlı erişim yoluyla bağlantı oluşturma kampanyaları"
        ]
      },
      {
        "icon": "megaphone",
        "title": "Ücretli Reklamcılık ve PPC",
        "description": "Maksimum ROAS için sürekli optimizasyon ile Google, Meta, LinkedIn ve programatik ağlarda yüksek performanslı ücretli kampanyalar.",
        "details": [
          "Hedef kitle segmentasyonu ile arama, görüntülü ve alışveriş kampanya yönetimi",
          "Çoklu dokunma atıf modelleme ile dönüşüm takibi kurulumu"
        ]
      },
      {
        "icon": "chart",
        "title": "Pazarlama Analitiği ve Atıf",
        "description": "Her temas noktasını izleyen ve geliri gerçekten sonuç veren kanallara ve kampanyalara atfeden kapsamlı analitik altyapısı.",
        "details": [
          "Son tıklamayı veri odaklı modellerle değiştiren çapraz kanal atıf modelleme",
          "Reklam platformlarını, CRM'yi ve gelir verilerini birleştiren özel gösterge paneli geliştirme",
          "Yaşam döngüsü optimizasyonu için kohort analizi ve müşteri yolculuğu haritalama"
        ]
      },
      {
        "icon": "cursor",
        "title": "Dönüşüm Oranı Optimizasyonu",
        "description": "Müşteri olan ziyaretçi yüzdesini maksimize etmek için açılış sayfalarının, hunilerin ve kullanıcı deneyimlerinin sistematik test ve optimizasyonu.",
        "details": [
          "Açılış sayfaları ve ana dönüşüm akışları için A/B ve çok değişkenli test programları",
          "Sürtünme noktalarını belirlemek için ısı haritası ve oturum kaydı analizi",
          "Trafik kaynağı ve davranışa dayalı özelleştirilmiş deneyimler sunan kişiselleştirme motorları"
        ]
      },
      {
        "icon": "chat",
        "title": "İçerik Pazarlama ve Strateji",
        "description": "Düşünce liderliği oluşturan, organik trafik artıran ve değerli, hedefli içerikle satın alma yolculuğu boyunca olasılıkları besleyen stratejik içerik programları.",
        "details": [
          "Alıcı kişiliklerine ve huni aşamalarına haritalanmış içerik denetimleri ve boşluk analizi",
          "Blog, teknik rapor, vaka çalışması ve video içerik üretimi ve dağıtımı"
        ]
      },
      {
        "icon": "users",
        "title": "Sosyal Medya Pazarlaması",
        "description": "Hedef kitlenizin zaman geçirdiği platformlardan marka bilinirliği oluşturan, toplulukları etkileşime geçiren ve nitelikli trafik artıran organik ve ücretli sosyal stratejiler.",
        "details": [
          "LinkedIn, Instagram, Twitter ve TikTok için platforma özgü içerik stratejileri",
          "Marka duyarlılığı izleme için topluluk yönetimi ve sosyal dinleme",
          "Genişletilmiş erişim için influencer tanımlama ve ortaklık yönetimi"
        ]
      },
      {
        "icon": "mobile",
        "title": "E-posta ve Pazarlama Otomasyonu",
        "description": "Müşteri yaşam döngüsü boyunca etkileşim ve dönüşümü artıran, doğru zamanda doğru kişiye doğru mesajı ileten otomatik e-posta ve besleme kampanyaları.",
        "details": [
          "Kişiselleştirilmiş besleme dizileri için potansiyel müşteri puanlama ve segmentasyon modelleri",
          "Sepet terk etme, işe alım ve yeniden etkileşim için davranışsal tetikleyici kampanyalar",
          "%95'in üzerinde gelen kutusu yerleştirme oranları sağlayan teslimat optimizasyonu"
        ]
      },
      {
        "icon": "globe",
        "title": "Uluslararası ve Çok Dilli Pazarlama",
        "description": "Çok dilli SEO, kültürel olarak uyarlanmış kampanyalar ve bölgeye özgü kanal optimizasyonu dahil küresel genişleme için yerelleştirilmiş pazarlama stratejileri.",
        "details": [
          "Uluslararası SEO için çok dilli anahtar kelime araştırması ve hreflang uygulaması",
          "Kültürel olarak uyarlanmış reklam kreatifi ve açılış sayfası yerelleştirmesi"
        ]
      }
    ],
    "stats": [
      {
        "label": "Ortalama ROAS",
        "value": "5.2x"
      },
      {
        "label": "Organik Trafik Artışı",
        "value": "180%"
      },
      {
        "label": "Oluşturulan Potansiyel Müşteriler",
        "value": "50K+"
      },
      {
        "label": "Dönüşüm Oranı Artışı",
        "value": "65%"
      }
    ]
  },
  "process": {
    "headline": "Dijital Pazarlama Sürecimiz",
    "subtitle": "Strateji İlkeli, Veri Odaklı Yürütme",
    "description": "Derin hedef kitle anlayışıyla başlayan, çoklu kanal stratejileri oluşturan ve pazarlama ROI'nizi maksimize etmek için performans verilerine dayalı sürekli optimize eden sistematik bir pazarlama metodolojisi.",
    "steps": [
      {
        "title": "Denetim ve Pazar Analizi",
        "description": "Boşlukları ve yüksek etkili fırsatları belirlemek için mevcut pazarlama performansınızın, rekabet ortamınızın ve hedef kitle davranışınızın kapsamlı incelemesi.",
        "icon": "search",
        "details": [
          "Sektör standartlarına göre kıyaslama ile kanal bazında performans denetimi",
          "Anahtar kelimeler, reklam stratejileri, içerik ve pazar konumlandırmasını kapsayan rekabet analizi",
          "Kişilik geliştirme ve müşteri yolculuğu haritalama dahil hedef kitle araştırması"
        ]
      },
      {
        "title": "Strateji ve Kanal Planlaması",
        "description": "Kanal karışımı, bütçe tahsisi, içerik takvimi ve iş hedeflerine bağlı ölçülebilir KPI'lar ile veri bilgili bir pazarlama stratejisi geliştirin.",
        "icon": "document",
        "details": [
          "Hedef kitle varlığı ve maliyet verimliliği analizine dayalı kanal karışımı optimizasyonu",
          "Her kanal için öngörülen ROI senaryoları ile bütçe tahsis modeli"
        ]
      },
      {
        "title": "Kampanya Oluşturma ve Lansmanı",
        "description": "Dönüşüm için optimize edilmiş kaliteli açılış sayfaları ile ilgi çekici kreatif, hassas hedefleme, uygun izleme içeren kampanyalar oluşturun.",
        "icon": "rocket",
        "details": [
          "Platforma özel formatlar ve mesajlaşma varyasyonları ile reklam kreatif geliştirme",
          "Dönüşüm optimize edilmiş düzenler ile açılış sayfası tasarımı ve geliştirme",
          "UTM çerçeveleri ve dönüşüm olayı yapılandırması ile izleme ve analitik kurulumu"
        ]
      },
      {
        "title": "Optimizasyon ve Test",
        "description": "Gerçek verilere dayalı A/B testi, teklif yönetimi, hedef kitle iyileştirmesi ve kreatif iterasyonu yoluyla sürekli performans optimizasyonu.",
        "icon": "chart",
        "details": [
          "Tüm ücretli kanallar genelinde haftalık teklif ve bütçe optimizasyonu",
          "Reklamlar, açılış sayfaları ve e-posta kampanyaları için sistematik A/B testi yol haritası"
        ]
      },
      {
        "title": "Raporlama ve Ölçeklendirme",
        "description": "Eyleme dönüştürülebilir içgörülerle şeffaf performans raporlaması ve bileşik büyüme için kazanan kampanyaların ve kanalların stratejik ölçeklendirmesi.",
        "icon": "lightning",
        "details": [
          "Yönetici özetleri ve kanal derinlemesine incelemeler ile aylık performans raporları",
          "Güncellenmiş rekabet analizi ve yol haritası ayarlamaları ile üç aylık strateji incelemeleri",
          "Marjinal ROAS analizine dayalı bütçe yeniden tahsis önerileri"
        ]
      }
    ]
  },
  "techStack": {
    "headline": "Pazarlama Teknolojisi Yığını",
    "subtitle": "Entegre Pazarlama Platformları",
    "description": "Her dijital kanalda kampanyaları yürütmek, ölçmek ve optimize etmek için sınıfının en iyisi pazarlama teknolojilerinden yararlanıyoruz.",
    "categories": [
      {
        "category": "Web ve İçerik Platformları",
        "items": [
          {
            "name": "WordPress",
            "description": "Bloglar, açılış sayfaları ve SEO optimize web özellikleri için içerik yönetimi"
          },
          {
            "name": "Shopify",
            "description": "Ürün pazarlama, sepet optimizasyonu ve dönüşüm takibi için e-ticaret platformu entegrasyonu"
          },
          {
            "name": "React",
            "description": "Yüksek performanslı pazarlama deneyimleri için özel açılış sayfası ve web uygulaması geliştirme"
          },
          {
            "name": "TypeScript",
            "description": "Pazarlama otomasyon betikleri ve analitik entegrasyonları için tip güvenli geliştirme"
          }
        ]
      },
      {
        "category": "Analitik ve Veri",
        "items": [
          {
            "name": "Python",
            "description": "Pazarlama veri analizi, atıf modelleme ve otomatik raporlama betikleri"
          },
          {
            "name": "PostgreSQL",
            "description": "Çapraz kanal performans analitiği için merkezi pazarlama veri ambarı"
          },
          {
            "name": "Redis",
            "description": "Kullanıcı segmentlerini ve davranışsal verileri önbelleğe alan gerçek zamanlı kişiselleştirme motoru"
          },
          {
            "name": "Figma",
            "description": "Reklam kreatifleri, açılış sayfaları ve marka varlıkları için işbirlikçi tasarım platformu"
          }
        ]
      },
      {
        "category": "Otomasyon ve AI",
        "items": [
          {
            "name": "NodeJS",
            "description": "Pazarlama otomasyon backend'leri, webhook işleyiciler ve API entegrasyonları"
          },
          {
            "name": "OpenAI",
            "description": "AI destekli içerik oluşturma, reklam kopyası optimizasyonu ve hedef kitle içgörü çıkarımı"
          },
          {
            "name": "Elasticsearch",
            "description": "Pazarlama web siteleri için site arama optimizasyonu ve içerik keşif geliştirmesi"
          }
        ]
      }
    ]
  },
  "portfolio": {
    "headline": "Dijital Pazarlama Başarı Hikayeleri",
    "subtitle": "Gerçek Büyüme Sağlayan Kampanyalar",
    "description": "Veri odaklı pazarlama stratejilerimizin nasıl potansiyel müşteri oluşturduğuna, gelir artırdığına ve sektörler arası işletmeler için kalıcı rekabet avantajları oluşturduğuna dair örnekler.",
    "items": [
      {
        "title": "B2B SaaS Potansiyel Müşteri Oluşturma Motoru",
        "industry": "Teknoloji (SaaS)",
        "challenge": "Bir B2B proje yönetimi SaaS'ı tamamen giden satışlara güveniyordu, düşük dönüşüm oranlarıyla potansiyel müşteri başına 180 dolar harcıyordu ve güçlü ürün-pazar uyumuna rağmen neredeyse hiç organik arama varlığı yoktu.",
        "solution": "Yüksek niyetli anahtar kelimeleri hedefleyen SEO optimize içerik, ABM hedefleme ile LinkedIn reklamları, otomatik e-posta besleme dizisi ve potansiyel müşteri mıknatısları ile dönüşüm optimize açılış sayfalarını birleştiren tam hunili gelen pazarlama motoru oluşturduk.",
        "results": [
          "Nitelikli potansiyel müşteri başına maliyet 6 ay içinde 180 dolardan 42 dolara düşürüldü",
          "45 ilk sayfa anahtar kelime sıralamasıyla organik arama trafiği %320 büyüdü",
          "Ayda 1.200 pazarlama nitelikli potansiyel müşteri oluşturuldu, 150'den artış"
        ],
        "stats": [
          {
            "label": "Potansiyel Müşteri Başına Maliyet Azalması",
            "value": "77%"
          },
          {
            "label": "Aylık MQL'ler",
            "value": "1,200"
          }
        ]
      },
      {
        "title": "E-Ticaret Gelir Ölçeklendirme Kampanyası",
        "industry": "Perakende ve E-Ticaret",
        "challenge": "Doğrudan tüketiciye ev eşyaları markası, artan müşteri edinme maliyetleri ve ölçekte sürdürülemez 1,8x ROAS ile ücretli reklamcılık ile aylık 1,2 milyon dolar gelirde plato yapıyordu.",
        "solution": "Geliştirilmiş hedef kitle segmentasyonu, dinamik ürün reklamları, sağlam yeniden hedefleme hunisi, sepet kurtarma ve satın alma sonrası yükseltmeler için e-posta otomasyonu ve organik büyüme için içerik odaklı SEO stratejisi ile tüm ücretli medya stratejisini yeniden yapılandırdık.",
        "results": [
          "Aylık gelir 8 ay içinde 1,2 milyon dolardan 3,1 milyon dolara ölçeklendi",
          "Tüm kanallar genelinde ücretli reklamcılık ROAS'ı 1,8x'ten 4,6x'e iyileştirildi"
        ],
        "stats": [
          {
            "label": "Gelir Artışı",
            "value": "158%"
          },
          {
            "label": "ROAS İyileştirmesi",
            "value": "4.6x"
          }
        ]
      },
      {
        "title": "Sağlık Hasta Kazanım Programı",
        "industry": "Sağlık",
        "challenge": "Çok lokasyonlu bir diş kliniği grubu, rekabetçi bir pazarda 8 lokasyondaki randevu slotlarını doldurması gerekiyordu, Google Ads maliyetleri yıllık %40 artıyordu ve geleneksel pazarlama kanallarından getiriler azalıyordu.",
        "solution": "Tüm 8 lokasyon için yerel SEO stratejisi uyguladık, lokasyona özgü açılış sayfaları ile Google Ads başlattık, inceleme oluşturma sistemi oluşturduk ve otomatik randevu hatırlatma ve takip e-posta dizisi oluşturduk.",
        "results": [
          "Tüm lokasyonlarda yeni hasta randevuları %85 artırıldı",
          "Randevu başına maliyet 95 dolardan 31 dolara düşürüldü",
          "Tüm 8 lokasyon için ilk-3 Google Map Pack sıralaması elde edildi"
        ],
        "stats": [
          {
            "label": "Yeni Hasta Artışı",
            "value": "85%"
          },
          {
            "label": "Rezervasyon Başına Maliyet",
            "value": "$31"
          }
        ]
      }
    ],
    "aggregateStats": [
      {
        "label": "Yıllık Yönetilen Reklam Harcaması",
        "value": "$25M+"
      },
      {
        "label": "Müşteriler İçin Oluşturulan Potansiyel Müşteriler",
        "value": "150K+"
      },
      {
        "label": "Ortalama Müşteri ROAS",
        "value": "5.2x"
      },
      {
        "label": "Başlatılan Pazarlama Kampanyaları",
        "value": "500+"
      }
    ]
  },
  "faq": {
    "headline": "Dijital Pazarlama SSS",
    "subtitle": "Pazarlama Sorularınız Yanıtlandı",
    "description": "Dijital pazarlama hizmetlerimiz, fiyatlandırma, zaman çizelgeleri ve sonuçları nasıl ölçüp sunduğumuz hakkında sık sorulan sorulara yanıtlar.",
    "categories": [
      {
        "category": "Strateji ve Planlama",
        "items": [
          {
            "question": "İşimiz için doğru pazarlama kanallarını nasıl belirliyorsunuz?",
            "answer": "Hedef kitlenizin demografisini ve davranışını, rekabet ortamını, sektör kıyaslamalarını ve bütçe kısıtlamalarını analiz ediyoruz. Ardından hedef kitlenizin en aktif olduğu ve en iyi maliyet verimliliği elde edebileceğimiz yerlere dayalı bir kanal karışımı öneriyoruz. Ölçeklendirmeden önce küçük test bütçeleri ile doğruluyoruz."
          },
          {
            "question": "Dijital pazarlamadan sonuç görmek ne kadar sürer?",
            "answer": "Ücretli reklamcılık genellikle lansmanı takip eden 2-4 hafta içinde ölçülebilir sonuçlar verir. SEO ve içerik pazarlama, genellikle 3-6 ayda önemli çekiş gösteren uzun vadeli yatırımlardır. Strateji geliştirme sırasında gerçekçi zaman çizelgeleri belirliyor ve sürdürülebilir büyüme kanalları oluştururken hızlı kazançlara odaklanıyoruz."
          },
          {
            "question": "Dijital pazarlamaya başlamak için ne bütçeye ihtiyacımız var?",
            "answer": "Etkili kampanyalar odaklanmış tek kanal çabaları için aylık 3.000-5.000 dolar kadar düşük bütçelerle başlayabilir. Çok kanallı programlar genellikle anlamlı ölçek için aylık 10.000-25.000 dolar gerektirir. Bütçenize uyan ve ROI gösterdikçe ölçeklenen stratejiler tasarlıyoruz."
          }
        ]
      },
      {
        "category": "Yürütme ve Raporlama",
        "items": [
          {
            "question": "Pazarlama ROI'sini ve atfını nasıl ölçüyorsunuz?",
            "answer": "İlk etkileşimden kapanmış anlaşmaya kadar her müşteri temas noktasını izleyen çoklu dokunma atıf modelleri uyguluyoruz. Raporlamalarımız, kanal, kampanya ve içerik parçasına göre gerçek ROI'yi hesaplamak için reklam harcama verilerini CRM gelir verileriyle birbirine bağlar. Göstergelerden öteye geçerek pipeline ve gelir etkisine odaklanıyoruz."
          },
          {
            "question": "Ne sıklıkla performans raporları alıyoruz?",
            "answer": "Yönetici özetleri, kanal bazında dökümler ve eyleme dönüştürülebilir öneriler içeren aylık kapsamlı raporlar alırsınız. Ayrıca günlük izleme için gerçek zamanlı gösterge paneli erişimi sağlıyoruz. Üç aylık stratejik incelemeler, rekabet analizi güncellemeleri ve yol haritası ayarlamalarını içerir."
          },
          {
            "question": "Reklam kreatifini ve içeriği siz mi oluşturuyorsunuz, yoksa biz mi sağlamalıyız?",
            "answer": "Metin yazarlığı, grafik tasarım, video düzenleme ve açılış sayfası geliştirme dahil her şeyi kurum içinde yönetiyoruz. Ekibimiz reklam kreatifi, SEO içerik yazarlığı ve dönüşüm odaklı tasarım uzmanlarını içerir. Marka yönergeleri ve onay iş akışları konusunda ekibinizle işbirliği yapıyoruz."
          }
        ]
      },
      {
        "category": "Birlikte Çalışmak",
        "items": [
          {
            "question": "Günlük pazarlama yürütmesine ne kadar dahil olmamız gerekiyor?",
            "answer": "Ekibinizin bir uzantısı olarak faaliyet gösteriyor ve tüm yürütmeyi yönetiyoruz. Genellikle ilk strateji uyumu, içerik onayları ve aylık inceleme toplantıları için katılımınıza ihtiyacımız var. Çoğu müşteri işbirliğine ayda 2-4 saat harcar. Mikro yönetim gerektirmeden sonuçları ve önerileri proaktif olarak iletiriz."
          },
          {
            "question": "Kurum içi pazarlama ekibimizle birlikte çalışabilir misiniz?",
            "answer": "Kesinlikle. Müşterilerimizin çoğunun kurum içi pazarlama kaynakları vardır. Ekibiniz marka, ürün pazarlaması veya diğer önceliklere odaklanırken uzman kanalları veya taşma işlerini yöneterek sorunsuz bir şekilde entegre oluyoruz. Tam şeffaflık için paylaşılan proje yönetim araçları ve iletişim kanalları kullanıyoruz."
          },
          {
            "question": "Bir kampanya iyi performans göstermiyorsa ne olur?",
            "answer": "Düşük performans optimizasyon protokolümüzü tetikler. Hedefleme, kreatif, açılış sayfası veya teklifle ilgili olup olmadığını teşhis etmek için verileri analiz ederiz. Ardından düzeltmek için hızlı testler uygularız. Bir kanal optimizasyon sonrasında sürekli düşük performans gösteriyorsa, bütçeyi daha yüksek performanslı kanallara yeniden tahsis eder ve stratejik değişiklikler öneririz."
          }
        ]
      }
    ]
  }
};

// Continue with e-commerce, machine-learning, python-automation, and ui-ux-design...
// I'll add them in the next part due to length

console.log("Adding e-commerce translations...");
