# MyStore

## Proje Kurulumu ve Çalıştırma Yönergeleri

Projeyi başlatmak için aşağıdaki adımları izleyin:

1. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Kullanılan Teknolojiler

- **Next.js** (React tabanlı framework)
- **React 19**
- **TypeScript**
- **Styled-components** (CSS-in-JS için)
- **Jest** ve **Testing Library** (Birim ve entegrasyon testleri için)
- **next-intl** (Çoklu dil desteği için)

## Atomic Design Yapısı

Bu projede component yapısı Atomic Design prensiplerine göre organize edilmiştir:

- **Atoms**: Temel, bölünemez UI bileşenleri (ör: Button, Input, Typography)
- **Molecules**: Birden fazla atomun birleşimiyle oluşan bileşenler (ör: SearchBox, Rating)
- **Organisms**: Moleküllerin birleşimiyle oluşan, daha karmaşık ve işlevsel bileşenler (ör: ProductCard, ProductGrid, Header)
- **Templates**: Sayfa düzeni için iskelet yapılar

**Örnek:**
- `src/components/atoms/Button/Button.tsx` → Basit bir buton
- `src/components/molecules/SearchBox/SearchBox.tsx` → İçinde Input ve Button barındıran arama kutusu
- `src/components/organisms/ProductGrid/ProductGrid.tsx` → Birden fazla ProductCard ve filtreleme barındıran ürün listesi

## Test Coverage (Kapsam) Komutu ve Örnek Sonuç

Test kapsamını görmek için:

```bash
npm run test:coverage
# veya
yarn test:coverage
```

npm run test:coverage çıktısı:

```

------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |   69.86 |    61.19 |   65.71 |   69.49 |                   
 app        |    6.38 |        0 |      10 |    6.97 |                   
  ...er.tsx |     100 |      100 |     100 |     100 |                   
  page.tsx  |       0 |        0 |       0 |       0 | 1-94              
 app/cart   |   83.33 |      100 |     100 |     100 |                   
  page.tsx  |   83.33 |      100 |     100 |     100 |                   
 ...ts/[id] |       0 |        0 |       0 |       0 |                   
  page.tsx  |       0 |        0 |       0 |       0 | 1-52              
 components |       0 |        0 |       0 |       0 |                   
  ...rs.tsx |       0 |        0 |       0 |       0 | 3-176             
  ...er.tsx |       0 |        0 |       0 |       0 | 3-95              
  ...on.tsx |       0 |        0 |       0 |       0 | 3-134             
  ...rd.tsx |       0 |      100 |       0 |       0 | 3-77              
  ...id.tsx |       0 |        0 |       0 |       0 | 3-81              
 ...s/Badge |     100 |    66.66 |     100 |     100 |                   
  Badge.tsx |     100 |    66.66 |     100 |     100 | 95-96             
  index.ts  |     100 |      100 |     100 |     100 |                   
 .../Button |     100 |    77.77 |     100 |     100 |                   
  ...on.tsx |     100 |    77.77 |     100 |     100 | 90-91             
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...s/Input |     100 |      100 |     100 |     100 |                   
  Input.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 .../Select |     100 |      100 |     100 |     100 |                   
  ...ct.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...ography |     100 |    93.33 |     100 |     100 |                   
  ...hy.tsx |     100 |    93.33 |     100 |     100 | 89                
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...erGroup |     100 |      100 |     100 |     100 |                   
  ...up.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...ceRange |     100 |       80 |     100 |     100 |                   
  ...ge.tsx |     100 |       80 |     100 |     100 | 46,54             
  index.ts  |     100 |      100 |     100 |     100 |                   
 .../Rating |     100 |      100 |     100 |     100 |                   
  ...ng.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...archBox |     100 |      100 |     100 |     100 |                   
  ...ox.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 .../Header |   92.59 |       60 |   33.33 |    92.3 |                   
  ...er.tsx |      92 |       60 |   33.33 |      92 | 74,93             
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...ination |     100 |    93.75 |     100 |     100 |                   
  ...on.tsx |     100 |    93.75 |     100 |     100 | 114               
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...uctCard |     100 |      100 |     100 |     100 |                   
  ...rd.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...Filters |     100 |    93.75 |     100 |     100 |                   
  ...rs.tsx |     100 |    93.75 |     100 |     100 | 56                
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...uctGrid |     100 |      100 |     100 |     100 |                   
  ...id.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...artPage |   87.87 |       50 |      20 |    87.5 |                   
  ...ge.tsx |   87.09 |       50 |      20 |   87.09 | 200-239           
  index.ts  |     100 |      100 |     100 |     100 |                   
 ...ailPage |   83.78 |      100 |   33.33 |    90.9 |                   
  ...ge.tsx |   88.57 |      100 |   33.33 |   93.75 | 123,127           
  index.ts  |       0 |      100 |     100 |       0 | 1                 
 ...ctsPage |   84.61 |      100 |     100 |   91.66 |                   
  ...ge.tsx |     100 |      100 |     100 |     100 |                   
  index.ts  |       0 |      100 |     100 |       0 | 1                 
 contexts   |   97.91 |    81.25 |     100 |   97.61 |                   
  ...xt.tsx |   97.91 |    81.25 |     100 |   97.61 | 54                
 lib        |   98.36 |    94.44 |     100 |     100 |                   
  api.ts    |     100 |      100 |     100 |     100 |                   
  ...act.ts |      90 |       50 |     100 |     100 | 12                
  ...ry.tsx |     100 |      100 |     100 |     100 |                   
------------|---------|----------|---------|---------|-------------------

Test Suites: 22 passed, 22 total
Tests:       1 skipped, 211 passed, 212 total
Snapshots:   0 total
Time:        9.671 s
```

