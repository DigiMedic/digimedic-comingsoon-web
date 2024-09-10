# DigiMedic-comingsoon-web

Vítejte v repozitáři projektu DigiMedic-comingsoon-web, digitální páteře českého zdravotnictví.

## O projektu

DigiMedic je webová prezentace zaměřená na digitalizaci a inovaci v českém zdravotnictví. Náš cíl je vytvořit efektivnější a dostupnější zdravotní péči prostřednictvím moderních technologií. Projekt je momentálně ve fázi "coming soon" a zaměřuje se na sběr emailů pro budoucí komunikaci a prezentaci informací prostřednictvím blogu.

## Technologie

Projekt je postaven na následujících technologiích:

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Radix UI komponenty
- MDX pro zpracování obsahu
- Framer Motion pro animace
- @tsparticles/react pro interaktivní částicové efekty
- next-themes pro podporu tmavého režimu
- axios pro HTTP požadavky
- date-fns pro manipulaci s daty
- @tryghost/content-api pro integraci s Ghost CMS
- react-fast-marquee pro běžící text
- react-virtualized-auto-sizer a react-window pro virtualizaci dlouhých seznamů
- react-wrap-balancer pro lepší zalamování textu
- sharp pro optimalizaci obrázků
- remark a remark-html pro zpracování Markdown
- schema-dts a react-schemaorg pro strukturovaná data
- Formbricks pro sledování uživatelského chování a sběr zpětné vazby

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
│   ├── formbricks.tsx
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
│   ├── AnimatedCard.tsx
│   ├── AnimatedLabels.jsx
│   ├── BlogHero.tsx
│   ├── card-hover-effect.tsx
│   ├── Comments.tsx
│   ├── craft.tsx
│   ├── DigiMedicCoverTitle.tsx
│   ├── DigiMedicTimeline.tsx
│   ├── dock-live.tsx
│   ├── ErrorBoundary.tsx
│   ├── FeaturedPost.tsx
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
│   ├── PostCardList.tsx
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
- AnimatedLabels a AnimatedCard pro vizuální efekty
- TextRevealByWord pro efektní odhalování textu
- DockLive pro interaktivní prvky
- FUIFeatureSectionWithCards pro prezentaci funkcí
- BlogHero pro hlavičku blogu
- PostCard a PostCardList pro zobrazení příspěvků na blogu
- FeaturedPost pro zvýrazněný příspěvek
- Komponenty pro blog a MDX obsah
- Vlastní UI komponenty (tlačítka, karty, timeline)
- SEO komponenta pro optimalizaci pro vyhledávače
- ErrorBoundary pro zachycení a zpracování chyb
- FullArticle pro zobrazení celého článku
- RelatedArticles pro zobrazení souvisejících článků
- TableOfContents pro navigaci v dlouhých článcích
- Comments pro systém komentářů
- ShareButtons pro sdílení obsahu na sociálních sítích
- NewsletterForm pro sběr emailů

## Styly a design

- Vlastní barevná paleta (definována v Tailwind konfiguraci)
- Vlastní fonty (definovány v lib/fonts.ts)
- Vlastní animace a interaktivní prvky (components/magicui/)
- Responzivní design s využitím Tailwind CSS
- Vlastní ikony a SVG ilustrace (public/brand/)
- Různé vizuální efekty a animace pro zlepšení uživatelského zážitku

## Konfigurace projektu

Projekt využívá několik konfiguračních souborů pro nastavení různých aspektů vývoje:

- `.editorconfig`: Zajišťuje konzistentní formátování kódu napříč různými editory
- `.eslintrc.json`: Konfigurace ESLint pro kontrolu kvality kódu
- `.prettierignore` a `prettier.config.js`: Konfigurace Prettier pro formátování kódu
- `next.config.mjs`: Konfigurace Next.js
- `postcss.config.js`: Konfigurace PostCSS pro zpracování CSS
- `tailwind.config.js`: Konfigurace Tailwind CSS
- `tsconfig.json`: Konfigurace TypeScript

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
- Komponenty jako `FullArticle`, `PostCard`, `PostCardList` a `MDXContent` usnadňují práci s blogem a články
- Integrace s Ghost CMS pomocí `@tryghost/content-api` pro správu obsahu blogu

### SEO a výkon
- Implementována je SEO komponenta pro optimalizaci meta tagů
- Využití next/image a sharp pro optimalizaci obrázků
- Lazy loading komponent pro zlepšení výkonu
- Virtualizace dlouhých seznamů pomocí react-virtualized-auto-sizer a react-window
- Strukturovaná data implementována pomocí schema-dts a react-schemaorg

### Uživatelské chování a zpětná vazba
- Integrace s Formbricks pro sledování uživatelského chování a sběr zpětné vazby
- Implementace FormbricksProvider v `app/formbricks.tsx` pro inicializaci a sledování změn cest
- Použití Formbricks pro webové stránky (`@formbricks/js/website`)
- Inicializace Formbricks s vlastním `environmentId` a `apiHost`
- Poznámka: Při integraci Formbricks s Next.js mohou nastat problémy s importem. V takovém případě zkontrolujte kompatibilitu verzí a použijte správný import (`import formbricks from "@formbricks/js/website";`)

### Animace a vizuální efekty
- Využití Framer Motion pro plynulé animace
- Vlastní komponenty jako AnimatedCard, TextRevealByWord a další pro interaktivní a poutavé uživatelské rozhraní
- Implementace různých vizuálních efektů pro zlepšení celkového uživatelského zážitku

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
