# MyStore

Live Demo: https://mystore-topaz-iota.vercel.app/tr

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

3. Projenin derlenmesi:

```bash
npm run build
# veya
yarn build
```

4. Derlenmiş projenin başlatılması:

```bash
npm run start
# veya
yarn start
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

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   88.45 |    75.45 |      76 |   88.45 |                   
 src                   |      75 |        0 |       0 |      75 |                   
  middleware.ts        |       0 |        0 |       0 |       0 | 1-11              
  themes.ts            |     100 |      100 |     100 |     100 |                   
 src/app/[locale]      |   29.65 |       25 |      50 |   29.65 |                   
  layout.tsx           |   86.44 |    28.57 |     100 |   86.44 | ...29-31,37,39-40 
  page.tsx             |       0 |        0 |       0 |       0 | 1-113             
 src/app/[locale]/cart |   55.55 |      100 |      50 |   55.55 |                   
  page.tsx             |   55.55 |      100 |      50 |   55.55 | 7-14              
 ...ale]/products/[id] |       0 |        0 |       0 |       0 |                   
  page.tsx             |       0 |        0 |       0 |       0 | 1-52              
 ...onents/atoms/Badge |     100 |      100 |     100 |     100 |                   
  Badge.tsx            |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...nents/atoms/Button |     100 |      100 |     100 |     100 |                   
  Button.tsx           |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...onents/atoms/Input |     100 |      100 |     100 |     100 |                   
  Input.tsx            |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...nents/atoms/Select |     100 |      100 |     100 |     100 |                   
  Select.tsx           |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...s/atoms/Typography |     100 |    93.75 |     100 |     100 |                   
  Typography.tsx       |     100 |    93.75 |     100 |     100 | 93                
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...ecules/FilterGroup |     100 |      100 |     100 |     100 |                   
  FilterGroup.tsx      |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...lecules/PriceRange |   88.57 |    76.47 |     100 |   88.57 |                   
  PriceRange.tsx       |   88.46 |    76.47 |     100 |   88.46 | ...54,60-62,73-75 
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...s/molecules/Rating |     100 |    86.66 |     100 |     100 |                   
  Rating.tsx           |     100 |    86.66 |     100 |     100 | 26,37             
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...olecules/SearchBox |     100 |       75 |     100 |     100 |                   
  SearchBox.tsx        |     100 |       75 |     100 |     100 | 43                
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...s/organisms/Header |   93.33 |     62.5 |      25 |   93.33 |                   
  Header.tsx           |    93.9 |    71.42 |   28.57 |    93.9 | 110-119           
  index.ts             |       0 |        0 |       0 |       0 | 1                 
 ...ganisms/Pagination |     100 |       95 |     100 |     100 |                   
  Pagination.tsx       |     100 |       95 |     100 |     100 | 106               
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...anisms/ProductCard |     100 |    93.33 |     100 |     100 |                   
  ProductCard.tsx      |     100 |    93.33 |     100 |     100 | 85                
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...sms/ProductFilters |     100 |      100 |     100 |     100 |                   
  ProductFilters.tsx   |     100 |      100 |     100 |     100 |                   
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...anisms/ProductGrid |     100 |    77.77 |     100 |     100 |                   
  ProductGrid.tsx      |     100 |    77.77 |     100 |     100 | 80-83             
  index.ts             |     100 |      100 |     100 |     100 |                   
 ...templates/CartPage |   98.55 |    26.92 |      40 |   98.55 |                   
  CartPage.tsx         |   98.55 |    26.92 |      40 |   98.55 | 217-220,229       
  index.ts             |     100 |      100 |     100 |     100 |                   
 .../ProductDetailPage |   97.86 |    66.66 |      40 |   97.86 |                   
  ...uctDetailPage.tsx |   98.28 |    71.42 |      50 |   98.28 | 134-135,138-139   
  index.ts             |       0 |        0 |       0 |       0 | 1                 
 ...lates/ProductsPage |   98.59 |       40 |      50 |   98.59 |                   
  ProductsPage.tsx     |     100 |       50 |     100 |     100 | 50-53             
  index.ts             |       0 |        0 |       0 |       0 | 1                 
 src/contexts          |   89.28 |    65.85 |   78.57 |   89.28 |                   
  CartContext.tsx      |   86.52 |     64.7 |     100 |   86.52 | ...,86-87,138-139 
  ThemeContext.tsx     |   96.36 |    71.42 |      40 |   96.36 | 30-31             
 src/i18n              |      25 |        0 |       0 |      25 |                   
  navigation.ts        |       0 |        0 |       0 |       0 | 1-7               
  request.ts           |       0 |        0 |       0 |       0 | 1-11              
  routing.ts           |     100 |      100 |     100 |     100 |                   
 src/lib               |   86.52 |    95.83 |   83.33 |   86.52 |                   
  api.ts               |     100 |      100 |     100 |     100 |                   
  registry.tsx         |   80.55 |       75 |     100 |   80.55 | 30-36             
  ...mponentsConfig.ts |      50 |      100 |       0 |      50 | 13-24             
 src/types             |       0 |        0 |       0 |       0 |                   
  index.ts             |       0 |        0 |       0 |       0 | 1-44              
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 22 passed, 22 total
Tests:       1 skipped, 211 passed, 212 total
Snapshots:   0 total
Time:        11.04 s
```

Canlı Ortam Google Page Insight Skoru: 99/100

https://pagespeed.web.dev/report?url=https://mystore-topaz-iota.vercel.app/tr