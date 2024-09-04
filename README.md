# DigiMedic-comingsoon-web

Vítejte v repozitáři projektu DigiMedic-comingsoon-web, digitální páteře českého zdravotnictví.

## O projektu

DigiMedic je webová prezentace zaměřená na digitalizaci a inovaci v českém zdravotnictví. Náš cíl je vytvořit efektivnější a dostupnější zdravotní péči prostřednictvím moderních technologií. Projekt je momentálně ve fázi "coming soon" a zaměřuje se na sběr emailů pro budoucí komunikaci.

## Technologie

Projekt je postaven na následujících technologiích:

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Radix UI komponenty
- MDX pro zpracování obsahu
- Framer Motion pro animace
- @tsparticles pro interaktivní částicové efekty
- next-themes pro podporu tmavého režimu
- axios pro HTTP požadavky
- date-fns pro manipulaci s daty

## Struktura projektu

```
.
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── prettier.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── app/
│   ├── ClientLayout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── blog/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── api/
│       │   └── hello/
│       │       └── route.ts
│       └── posts/
│           └── [...slug]/
│               └── page.tsx
├── components/
│   ├── AnimatedLabels.jsx
│   ├── card-hover-effect.tsx
│   ├── Comments.tsx
│   ├── craft.tsx
│   ├── DigiMedicCoverTitle.tsx
│   ├── DigiMedicTimeline.tsx
│   ├── dock-live.tsx
│   ├── ErrorBoundary.tsx
│   ├── footer.tsx
│   ├── fui-feature-section-with-cards.tsx
│   ├── FullArticle.tsx
│   ├── hero.tsx
│   ├── icons.tsx
│   ├── main-nav.tsx
│   ├── MDXContent.tsx
│   ├── navbar-menu.tsx
│   ├── NewsletterForm.tsx
│   ├── PostCard.tsx
│   ├── RelatedArticles.tsx
│   ├── SEO.tsx
│   ├── ShareButtons.tsx
│   ├── site-header.tsx
│   ├── TableOfContents.tsx
│   ├── tailwind-indicator.tsx
│   ├── TextRevealByWord.tsx
│   ├── blog/
│   ├── magicui/
│   │   ├── dock.tsx
│   │   ├── dot-pattern.tsx
│   │   ├── hyper-text.tsx
│   │   ├── marquee.tsx
│   │   └── word-rotate.tsx
│   ├── mdx/
│   │   ├── Callout.tsx
│   │   ├── Chart.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Tabs.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card-hover-effect.tsx
│       ├── cover.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── SkeletonLoader.tsx
│       ├── sparkles.tsx
│       ├── subtle-background-animation.tsx
│       ├── text-reveal-card.tsx
│       └── timeline.tsx
├── config/
│   └── site.ts
├── hooks/
│   └── useInfiniteScroll.ts
├── lib/
│   ├── fonts.ts
│   ├── ghost.ts
│   └── utils.ts
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── next.svg
│   ├── thirteen.svg
│   ├── vercel.svg
│   └── brand/
│       ├── wdd
│       └── svg/
│           ├── various image files
│           └── png/
│               └── various image files
├── styles/
│   └── globals.css
└── types/
    ├── blog.ts
    └── nav.ts
```

## Hlavní komponenty

- Hero sekce s formulářem pro odběr novinek
- AnimatedLabels
- TextRevealByWord
- DockLive
- FUIFeatureSectionWithCards
- Komponenty pro blog a MDX obsah
- Vlastní UI komponenty (tlačítka, karty, timeline)
- SEO komponenta pro optimalizaci pro vyhledávače
- ErrorBoundary pro zachycení a zpracování chyb
- FullArticle pro zobrazení celého článku
- RelatedArticles pro zobrazení souvisejících článků
- TableOfContents pro navigaci v dlouhých článcích
- Comments pro systém komentářů
- ShareButtons pro sdílení obsahu na sociálních sítích

## Styly a design

- Vlastní barevná paleta (definována v Tailwind konfiguraci)
- Vlastní fonty (definovány v lib/fonts.ts)
- Vlastní animace a interaktivní prvky (components/magicui/)
- Responzivní design s využitím Tailwind CSS
- Vlastní ikony a SVG ilustrace (public/brand/)

## Instalace a spuštění

1. Naklonujte repozitář:
   ```
   git clone https://github.com/vas-username/digimedic-comingsoon-web.git
   ```

2. Nainstalujte závislosti:
   ```
   cd digimedic-comingsoon-web
   npm install
   ```

3. Spusťte vývojový server:
   ```
   npm run dev
   ```

4. Otevřete prohlížeč a přejděte na `http://localhost:3000`

## Skripty

- `npm run dev`: Spustí vývojový server
- `npm run build`: Vytvoří produkční build
- `npm run start`: Spustí produkční server
- `npm run lint`: Spustí ESLint pro kontrolu kódu
- `npm run lint:fix`: Automaticky opraví problémy nalezené ESLintem
- `npm run typecheck`: Zkontroluje typy v TypeScriptu
- `npm run format:write`: Formátuje kód pomocí Prettier
- `npm run format:check`: Zkontroluje formátování kódu
- `npm run preview`: Vytvoří produkční build a spustí ho lokálně pro náhled

## Vývoj

### Kódové standardy
- Projekt využívá ESLint a Prettier pro zajištění konzistentního stylu kódu
- TypeScript je použit pro statickou typovou kontrolu
- Importy jsou automaticky řazeny pomocí `@ianvs/prettier-plugin-sort-imports`

### Práce s obsahem
- Projekt využívá MDX pro dynamický obsah, který lze snadno upravovat a rozšiřovat
- Komponenty jako `FullArticle`, `PostCard` a `MDXContent` usnadňují práci s blogem a články

### SEO a výkon
- Implementována je SEO komponenta pro optimalizaci meta tagů
- Využití next/image a sharp pro optimalizaci obrázků
- Lazy loading komponent pro zlepšení výkonu

## Přispívání

Vítáme příspěvky od komunity! Pokud chcete přispět k projektu, prosím postupujte následovně:

1. Forkněte repozitář
2. Vytvořte novou větev pro vaši funkcionalitu (`git checkout -b feature/AmazingFeature`)
3. Commitněte vaše změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do větve (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

Před odesláním pull requestu se ujistěte, že váš kód prošel lintingem a typovou kontrolou.

## Licence

Tento projekt je licencován pod MIT licencí. Viz soubor [LICENSE](LICENSE) pro více informací.

## Kontakt

Pro více informací o projektu DigiMedic navštivte naši webovou stránku nebo nás kontaktujte na emailu.

---

Děkujeme, že jste součástí projektu DigiMedic. Společně můžeme zlepšit budoucnost českého zdravotnictví!
