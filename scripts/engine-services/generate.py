#!/usr/bin/env python3
"""Generate the Turkish service pages for the shared service engine from compact specs.

Usage: python3 scripts/engine-services/generate.py specs/<file>.py [--only slug] [--check]
(--check validates label lengths and prints word counts without writing any file)

Each spec (see specs/*.py) becomes content/<slug>/tr/{overview,features,technologies,process,portfolio,
pricing,faq}.md + metadata.json + spec.json, and the slug is registered in src/lib/engine-services.ts.
The markdown is a *baseline*: refine it later (ChatGPT / Codex) by editing the .md files directly.
Re-running this script overwrites those files, so only run it for services that were not refined by hand.
"""
import json, re, sys, importlib.util, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TR_LOWER = str.maketrans({'I': 'ı', 'İ': 'i'})
low = lambda s: s.translate(TR_LOWER).lower()


def table(head, rows):
    out = ['| ' + ' | '.join(head) + ' |', '| ' + ' | '.join(['---'] * len(head)) + ' |']
    out += ['| ' + ' | '.join(r) + ' |' for r in rows]
    return '\n'.join(out)


def cards(items):
    return '\n\n'.join(f'### {t}\n\n{d}' for t, d in items)


CLOSING = {
    'overview': ('İhtiyacınıza uygun planı birlikte oluşturalım', 'Ne yapmak istediğinizi, mevcut durumunuzu ve karşılaştığınız engeli paylaşın. Kapsamı ve öncelikli işleri birlikte belirleyelim.'),
    'features': ('Kapsamı birlikte belirleyelim', 'Hangi çalışmalara öncelik vermek istediğinizi paylaşın; çalışma kapsamını ve teslimleri birlikte netleştirelim.'),
    'technologies': ('Altyapınız için doğru bağlantıyı seçelim', 'Mevcut araçlarınızı ve verilerinizi paylaşın; hangi bağlantıların gerektiğini birlikte belirleyelim.'),
    'process': ('Başlamak için hangi bilgileri paylaşmalısınız?', None),
    'portfolio': ('Sizin çalışmanızda hangi sonucu izleyelim?', 'Hedefinizi paylaşın. Başarıyı hangi kayıtla değerlendireceğimizi ilk görüşmede birlikte netleştirelim.'),
    'pricing': ('Kapsamınıza uygun teklif alın', 'Hedefinizi ve mevcut durumunuzu paylaşın; çalışma kapsamını ve maliyet kalemlerini ayrı ayrı yazalım.'),
    'faq': ('Sorunuz işletmenize özel mi?', 'Sorunuzu ve işletme durumunuzu paylaşın; ilk görüşmede yanıtlayalım.'),
}
CLOSE_PREFIX = {k: v[0][:24] for k, v in CLOSING.items()}


def normalize(md):
    lines = md.split('\n'); out = []
    for i, ln in enumerate(lines):
        prev = out[-1] if out else ''
        is_tab = ln.startswith('|'); prev_tab = prev.startswith('|')
        if ln.startswith('#') and prev.strip():
            out.append('')
        elif is_tab and prev.strip() and not prev_tab:
            out.append('')
        elif (not is_tab) and prev_tab and ln.strip():
            out.append('')
        elif prev.startswith('#') and ln.strip():
            out.append('')
        elif ln.startswith('::cta') and prev.strip():
            out.append('')
        elif prev.startswith('::cta') and ln.strip():
            out.append('')
        out.append(ln)
    return re.sub(r'\n{3,}', '\n\n', '\n'.join(out)).strip() + '\n'


LIMITS = {  # max characters so the auto-fitted scene text stays >= ~5.5 units
    'items4': 24, 'chips3': 19, 'test': (12, 12, 18), 'meas3': (16, 16, 16), 'plan4': 22, 'sc2': (20, 14),
    'bitems3': 16, 'bars': 6, 'search': 26, 'ans2': 36, 'topics': 12, 'planName': 19, 'metricName': 18, 'browserBtn': 14,
}


def validate(sp):
    w = []
    def chk(name, val, mx):
        if len(val) > mx: w.append(f"{name}: '{val}' ({len(val)}>{mx})")
    for v in sp['items4']: chk('items4', v, 27)
    for v in sp['chips3']: chk('chips3', v, 20)
    for v, m in zip(sp.get('test', ['Seçenek A', 'Seçenek B', 'Karşılaştırma']), (12, 12, 18)): chk('test', v, m)
    for v, m in zip(sp['meas3'], (22, 22, 20)): chk('meas3', v, m)
    for v in sp['plan4']: chk('plan4', v, 26)
    for v in sp['sc2']: chk('sc2', v, 24)
    for v in sp['bitems3']: chk('bitems3', v, 20)
    for v in sp.get('bars', ['Plan', 'Yayın', 'Rapor']): chk('bars', v, 6)
    chk('search', sp['search'], 40)
    for v in sp['ans2']: chk('ans2', v, 40)
    chk('planName', sp.get('planName', 'Proje planı'), 19)
    for m in sp['metrics']: chk('metric[0]', m[0], 20)
    chk('short', sp['short'], 24)
    for q, _ in sp['faq'][:3]: chk('faq-q', q, 44)
    chk('costRows[0][0]', sp['costRows'][0][0], 22)
    return w


def gen(sp):
    S, N, slug = sp['short'], sp['name'], sp['slug']
    base = f'/tr/hizmetler/{slug}'
    link = lambda page, text: f'[{text}]({base}/{page})'

    # ---------------- overview ----------------
    ov = [f'## {S} hizmetinden hangi sonucu bekliyorsunuz?', cards(sp['outcomes']), '',
          f'## {N} hizmetimiz neleri kapsar?',
          table(['Çalışma', 'Size sağladığı çıktı'], sp['scope']),
          f"Çıktıların sayısı, teknik kurulumlar ve raporlama sıklığı teklif aşamasında netleştirilir. {link('ozellikler', 'Özellikler sayfasında')} hizmetin ayrıntılarını inceleyebilirsiniz.", '']
    for h, tx in sp['deep'][:2]:
        ov += [f'## {h}', tx, '']
    ov += [f'## {S} için sağlayıcı seçerken kapsamı karşılaştırın',
           f"Aylık veya proje bedelinin yanında neyin teslim edileceğini, hangi erişimlerin sizde kalacağını, raporlarda hangi kararların açıklanacağını ve çalışma sona erdiğinde dokümanların nasıl devredileceğini sorun. Kapsamı yazılı görmek, iki teklifi gerçekten karşılaştırabilmenizi sağlar. PakSoft teklifinde yapılacak işleri ve sizin ekibinizden beklenen katkıları birlikte netleştiririz. {link('surec', 'Çalışma sürecimizi inceleyin')}.", '',
           f"::cta {S} için ilk hangi noktaya bakmalıyız? Mevcut durumunuzu ve hedefinizi paylaşın; öncelikleri birlikte belirleyelim. | Görüşme Talep Et", '',
           f'## {S} maliyetini neler etkiler?',
           f"Maliyet; kapsamın genişliğine, kullanılacak araçlara ve üçüncü taraf ücretlerine göre değişir. Bu sayfada tutar vermeyiz; işletmenize özel teklifte kalemleri ayrı ayrı yazarız. {link('fiyatlandirma', 'Fiyatlandırma ve maliyet kalemlerini inceleyin')}.", '',
           '## Birlikte değerlendirilebilecek hizmetler',
           'Bu çalışmayı destekleyen diğer hizmetlerimizi de inceleyebilirsiniz:', '',
           '\n'.join(f'- [{a}]({c}): {b}' for a, b, c in sp['related']), '']
    ov += [f'## {CLOSING["overview"][0]}', CLOSING['overview'][1]]
    overview = '\n'.join(ov) + '\n'

    # ---------------- features ----------------
    ft = [f'## {sp["cardsH"]}', cards(sp['cards']), '']
    h, tx = sp['deep'][2]
    ft += [f'## {h}', tx, '',
           '## Hizmete dahil olanlar teklifinizde açık olsun',
           table(['Başlık', 'Nasıl netleşir?'], [
               ['Kapsam', 'Hangi çalışmaların yapılacağı ve hangilerinin kapsam dışı kaldığı yazılır'],
               ['Teslimler', 'Her çalışmanın çıktısı, biçimi ve teslim tarihi belirlenir'],
               ['Revizyon', 'Kaç tur düzeltme yapılacağı ve onay sürecinin kimde olduğu belirlenir'],
               ['Erişim ve sahiplik', 'Hesaplar, dosyalar ve kaynak materyallerin kimde kalacağı belirlenir'],
               ['Üçüncü taraf ücretleri', 'Lisans, sunucu, platform veya kullanım ücreti gibi giderler teklifte ayrı yazılır'],
           ]), '',
           '## Hangi durumlarda farklı bir yaklaşım öneririz?',
           f"{S} her işletme için ilk adım olmayabilir. Hedef netleşmemişse, mevcut altyapı bu çalışmayı taşıyamıyorsa ya da başarıyı değerlendirecek bir kayıt yoksa önce bunları ele almak daha doğru olabilir. Böyle bir durumda kapsamı daraltır veya önce hazırlık işini öneririz; amacımız çalışmanın işletmenize gerçekten fayda sağlamasıdır.", '',
           f'## {CLOSING["features"][0]}', CLOSING['features'][1]]
    features = '\n'.join(ft) + '\n'

    # ---------------- technologies ----------------
    tc = [f'## {S} çalışmasında hangi araç hangi soruya cevap verir?',
          table(['Araç veya kayıt', 'Cevapladığı soru'], sp['tools']), '',
          sp['toolsText'], '',
          '## Hangi ölçüler birlikte izlenir?',
          table(['Ölçü', 'Ne anlama gelir?', 'Dikkat edilecek nokta'], sp['metrics']), '',
          'Bu ölçülerin her biri tek başına başarı anlamına gelmez. Başlangıçta hangisinin ana ölçüt olacağını yazar, diğerlerini destekleyici veri olarak okuruz.', '',
          '## Raporlar neden farklı sonuçlar gösterebilir?',
          'Farklı araçlar farklı yöntemlerle sayar; dönem, tanım ve veri kaynağı değişebilir. Bu nedenle kaynakları aynı dönem için yan yana okur, farkın nedenini açıklarız. Tek bir rakamın yanlış olduğu sonucuna acele etmeyiz; önce kaydın nasıl toplandığına bakarız.', '',
          f'## {CLOSING["technologies"][0]}', CLOSING['technologies'][1]]
    technologies = '\n'.join(tc) + '\n'

    # ---------------- process ----------------
    pr = []
    for i, (t, d) in enumerate(sp['steps'], 1):
        pr += [f'## {i}. {t}', d, '']
    pr += [f'## {len(sp["steps"]) + 1}. İlk dönemde ne yapılır?',
           table(['Dönem', 'Yapılan iş', 'Çıktı'], [
               ['Hazırlık', 'Hedef, erişim, kapsam ve plan', 'Onaylı plan'],
               ['Uygulama', 'Planlanan işlerin yapılması', 'Çalışan teslim'],
               ['İlk değerlendirme', 'Sonuçların ve kalitenin incelenmesi', 'Bulgular ve öneriler'],
               ['Sonraki adım', 'Gerekçeli iyileştirme veya ek kapsam', 'Güncel plan'],
           ]), '',
           f'## {CLOSING["process"][0]}', sp['needs']]
    process = '\n'.join(pr) + '\n'

    # ---------------- portfolio ----------------
    po = []
    for t, d in sp['scen']:
        po += [f'## {t}', 'Bu bir temsili senaryodur; gerçek müşteri sonucu değildir.', '', d, '']
    po += ['## Bir sonuç raporunda hangi bilgileri aramalısınız?',
           table(['Rapor başlığı', 'Neden önemli?'], [
               ['Dönem ve veri kaynağı', 'Hangi tarihlerin ve hangi sistemin sayıldığını gösterir'],
               ['Başlangıç durumu', 'İyileşmenin neye göre ölçüldüğünü belirler'],
               ['Yapılan işler', 'Hangi değişikliğin hangi sonucu etkilemiş olabileceğini gösterir'],
               ['Sonuç tanımı', 'Başarılı sayılan çıktıyı açıklar'],
               ['Açıklanamayan farklar', 'Raporun şeffaflığını gösterir'],
           ]),
           'Sonuç sayısı tek başına yeterli değildir. Nasıl sayıldığını, hangi dönemi kapsadığını ve işletme kayıtlarıyla nasıl karşılaştırıldığını da görmek gerekir.', '',
           f'## {CLOSING["portfolio"][0]}', CLOSING['portfolio'][1]]
    portfolio = '\n'.join(po) + '\n'

    # ---------------- pricing ----------------
    pc = ['## Hangi gider kime ödenir?', table(['Gider', 'Kime ödenir?', 'Neye bağlıdır?'], sp['costRows']), '',
          f'## {S} fiyatını neler etkiler?',
          f'{S} için herkese uyan tek bir fiyat yoktur; kapsam ve işin büyüklüğü belirleyicidir. Bu sayfada tutar vermeyiz. Fiyatı etkileyen başlıca etkenler şunlardır:', '',
          '\n'.join(f'- **{a}.** {b}' for a, b in sp['factors']), '',
          '## Üç farklı çalışma kapsamı',
          table(['Kapsam', 'Kimin işi?', 'Ne zaman uygun?'], [
              ['Danışmanlık', 'Siz uygularsınız, biz yönlendiririz', 'Kendi ekibi işi yürütebilen işletmeler'],
              ['Uygulama', 'Biz planlar ve uygularız', 'Düzenli teslim bekleyenler'],
              ['Uygulama ve süreklilik', 'Biz uygular, izler ve geliştiririz', 'Sürekli iyileştirme isteyenler'],
          ]), '',
          '## Teklifleri karşılaştırırken bunları sorun', '',
          '1. Hangi işler teklife dahil, hangileri kapsam dışı?\n2. Teslimlerin biçimi, sayısı ve revizyon hakkı nedir?\n3. Üçüncü taraf ücretleri ayrı mı yazılmış?\n4. Raporda hangi kararlar açıklanacak ve ne sıklıkla paylaşılacak?\n5. Çalışma bittiğinde hesaplar, dosyalar ve veriler kimde kalacak?', '',
          '## Sık sorulan fiyat soruları', '',
          f'### {S} için sabit bir fiyat listesi var mı?\n\nHayır. Kapsam, işin büyüklüğü ve ihtiyaç duyulan araçlar fiyatı değiştirir; teklifte kalemler ayrı yazılır.', '',
          '### Yalnızca danışmanlık alabilir miyim?\n\nEvet. Kendi ekibiniz işi yürütüyorsa planlama ve kontrol desteği ayrı bir kapsam olabilir.', '',
          '### Kesin sonuç veya getiri garantisi var mı?\n\nHayır. Sonuçlar birçok etkene bağlıdır; bu nedenle belirli bir sonuç sözü vermeyiz. Ölçüm ve raporlama ile ilerlemeyi şeffaf gösteririz.', '',
          f'## {CLOSING["pricing"][0]}', CLOSING['pricing'][1]]
    pricing = '\n'.join(pc) + '\n'

    # ---------------- faq ----------------
    faqs = sp['faq']
    g1, g2 = faqs[:4], faqs[4:]
    fq = ['## Hizmet ve kapsam', '']
    fq += [f'### {q}\n\n{a}\n' for q, a in g1]
    fq += ['## Süreç ve sonuçlar', '']
    fq += [f'### {q}\n\n{a}\n' for q, a in g2]
    fq += ['## Hesap, erişim ve veri', '',
           '### Hesap veya sistem şifremi paylaşmam gerekir mi?\n\nHayır. Erişim, ilgili platformun yetkilendirme araçlarıyla verilir ve istediğiniz zaman geri alınabilir.\n',
           '### Çalışma sona erdiğinde ne olur?\n\nHesaplarınız, dosyalarınız ve verileriniz işletmenize aittir. Çalışma bittiğinde yetkiler kapatılır ve gerekli dokümanlar size teslim edilir.\n',
           '### Sonuçlar nasıl ölçülür ve raporlanır?\n\nBaşlangıçta başarıyı hangi kayıtla değerlendireceğimizi yazarız. Raporlarda dönem, veri kaynağı, yapılan işler ve açıklanamayan farklar yer alır.\n',
           f'## {CLOSING["faq"][0]}', CLOSING['faq'][1]]
    faq = '\n'.join(fq) + '\n'

    overview, features, technologies, process, portfolio, pricing, faq = [normalize(x) for x in (overview, features, technologies, process, portfolio, pricing, faq)]
    pages = dict(overview=overview, features=features, technologies=technologies, process=process, portfolio=portfolio, pricing=pricing, faq=faq)

    # ---------------- metadata ----------------
    t = lambda x: x if len(x) <= 62 else x[:61].rstrip() + '…'
    meta = {
        'overview': {'title': t(sp.get('mtitle', f'{N} | PakSoft')), 'description': sp['mdesc'], 'heading': N, 'intro': sp['intro']},
        'features': {'title': t(f'{N} Hizmet Kapsamı | PakSoft'), 'description': f'{S} hizmet kapsamını, dahil olan işleri ve teslim edilen çıktıları inceleyin. İhtiyacınıza uygun kapsamı PakSoft ile belirleyin.', 'heading': f'{N} Hizmet Kapsamı', 'intro': f'Her işletmenin ihtiyacı farklıdır. Hedefinizi, mevcut durumunuzu ve ekibinizin kapasitesini dikkate alarak {low(S)} çalışmalarını seçeriz.'},
        'technologies': {'title': t(f'{N} Araçlar ve Ölçüm | PakSoft'), 'description': f'{S} çalışmasında kullanılan araçları, ölçüleri ve raporlama yaklaşımını inceleyin. Altyapınıza uygun ölçüm planını belirleyin.', 'heading': f'{N} Araçları ve Ölçüm Yaklaşımı', 'intro': 'Doğru karar için önce neyin ölçüldüğünü bilmek gerekir. Araçları ve kayıtları işletmenizin mevcut altyapısı üzerinden planlarız.'},
        'process': {'title': t(f'{N} Süreci | PakSoft'), 'description': f'{S} çalışmasında analiz, plan, uygulama, test ve değerlendirme adımlarını görün. Sorumlulukları başlangıçta netleştirin.', 'heading': f'{N} Çalışma Süreci', 'intro': 'Çalışmaya başlamadan önce hedefi, gerekli erişimleri ve kararları kimin onaylayacağını belirleriz. Böylece hazırlık ile işletmenizin günlük işleyişi aynı plana bağlanır.'},
        'portfolio': {'title': t(f'{N} Çalışma Yaklaşımı | PakSoft'), 'description': f'{S} çalışmalarında hedef, uygulama ve sonuçların nasıl değerlendirildiğini inceleyin. Temsili senaryolarla yaklaşımımızı görün.', 'heading': f'{N} Çalışmalarını Nasıl Değerlendiriyoruz?', 'intro': 'Bir çalışmayı değerlendirirken başlangıç koşulunu, yapılan işi ve sonuçların hangi kapsamda ölçüldüğünü birlikte görmek gerekir. Aşağıdaki örnekler yaklaşımımızı açıklamak için hazırlanmıştır; gerçek müşteri sonucu değildir.'},
        'pricing': {'title': t(f'{N} Fiyatları | PakSoft'), 'description': sp.get('pdesc', f'{S} fiyatını belirleyen etkenleri ve maliyet kalemlerini öğrenin. Kapsama göre ayrı ayrı yazılan teklif için PakSoft ile görüşün.'), 'heading': f'{N} Fiyatları ve Maliyet Kalemleri', 'intro': f'{S} maliyeti tek bir kalemden oluşmaz. Kapsam, ihtiyaç duyulan araçlar ve üçüncü taraf ücretleri birlikte değerlendirilir. PakSoft teklifinde bu kalemleri ayrı ayrı netleştirelim.'},
        'faq': {'title': t(f'{N} Sık Sorulan Sorular | PakSoft'), 'description': f'{S} hizmetinin kapsamı, süreci, ücretlendirmesi ve hesap erişimi hakkında en sık sorulan soruları yanıtlıyoruz.', 'heading': f'{N} Hakkında Sık Sorulan Sorular', 'intro': 'Başlamadan önce kapsam, sorumluluk ve ölçüm konusunda netleşmek çalışmayı daha yönetilebilir hale getirir. En sık karşılaştığımız soruları burada yanıtladık.'},
        'blog': {'title': t(f'{N} Rehberleri | PakSoft'), 'description': f'{S} hakkında uygulamalı rehberler.', 'heading': f'{N} Rehberleri', 'intro': f'{S} konusunda uygulamalı rehberler.'},
    }

    # ---------------- spec.json ----------------
    ov_items = sp['chips3']
    spec = {
        'name': N, 'short': S, 'shortLower': low(S),
        'hero': {'eyebrow': sp['eyebrow'], 'keywordLine': sp['keywordLine'], 'cta': sp['cta'], 'words': sp.get('words', ['Hizmeti', 'Danışmanlığı', 'Ajansı'])},
        'overview': {'title': S, 'chips': ov_items, 'report': 'Sonuç raporu', 'bars': sp.get('bars', ['Plan', 'Yayın', 'Rapor']), 'badge': sp.get('ovbadge', 'Kapsam yazılı belirlenir'), 'steps': ['Hedef', 'Plan', 'Uygulama', 'Rapor']},
        'scene': {
            'scope': {'title': 'Hizmet kapsamı', 'items': sp['items4'], 'test': sp.get('test', ['Seçenek A', 'Seçenek B', 'Karşılaştırma']), 'result': 'Sonraki adım'},
            'meas': {'browser': [sp['meas3'][0], 'Eylem'], 'server': [sp['meas3'][1], 'Kayıt'], 'report': sp['meas3'][2], 'events': [m[0] for m in sp['metrics']], 'badge': 'Kayıt doğrulandı', 'consent': 'İzin tercihi uygulanır'},
            'time': {'milestones': ['Analiz', 'Plan', 'Uygulama', 'Test', 'Yayın'], 'plan': sp['plan4']},
            'kase': {'notes': ['Gözlem', 'Değişiklik', 'Kontrol'], 'start': ['Başlangıç', sp['sc2'][0]], 'approach': ['Yaklaşım', sp['sc2'][1]], 'verdict': 'Değerlendirme gerçek kayıtlarla yapılır'},
            'budget': {'plan': sp.get('planName', 'Proje planı'), 'spend': [sp['costRows'][0][0], 'Ayrı ödenir'], 'items': sp['bitems3'], 'badge': 'Kalemler ayrı yazılır'},
            'faq': {'search': sp['search'], 'questions': [q for q, _ in faqs[:3]], 'answer': sp['ans2'], 'topics': ['Kapsam', 'Süreç', 'Bütçe']},
        },
        'related': sp['related'],
        'jump': [], 'closing': CLOSE_PREFIX,
    }
    # jump labels from headings
    for md in pages.values():
        for m in re.finditer(r'^## (.+)$', md, re.M):
            h = re.sub(r'^\d+\.\s*', '', m.group(1).strip())
            lab = re.split(r'[?:]', h)[0]
            if len(lab) > 30:
                lab = lab[:30].rsplit(' ', 1)[0]
            spec['jump'].append([h[:24], lab])
    return pages, meta, spec


def main():
    path = sys.argv[1]
    only = sys.argv[sys.argv.index('--only') + 1] if '--only' in sys.argv else None
    check = '--check' in sys.argv
    mod = importlib.util.spec_from_file_location('specs', path); m = importlib.util.module_from_spec(mod); mod.loader.exec_module(m)
    reg = os.path.join(ROOT, 'src/lib/engine-services.ts'); regtxt = open(reg).read()
    for sp in m.SPECS:
        if only and sp['slug'] != only: continue
        for w in validate(sp): print(f"WARN {sp['slug']} {w}")
        pages, meta, spec = gen(sp)
        if check:
            print(f"check-ok {sp['slug']:34s} {sum(len(v.split()) for v in pages.values())} words"); continue
        d = os.path.join(ROOT, 'content', sp['slug'], 'tr'); os.makedirs(d, exist_ok=True)
        for k, v in pages.items(): open(os.path.join(d, k + '.md'), 'w').write(v)
        json.dump(meta, open(os.path.join(d, 'metadata.json'), 'w'), ensure_ascii=False, indent=2)
        json.dump(spec, open(os.path.join(d, 'spec.json'), 'w'), ensure_ascii=False, indent=2)
        if f"slug: '{sp['slug']}'" not in regtxt:
            regtxt = regtxt.replace('];\n\nconst bySlug', f"  {{ slug: '{sp['slug']}', date: '{sp.get('date', '2026-11-20')}' }},\n];\n\nconst bySlug", 1)
        words = sum(len(v.split()) for v in pages.values())
        print(f"ok {sp['slug']:34s} {words} words")
    if not check: open(reg, 'w').write(regtxt)


if __name__ == '__main__':
    main()
