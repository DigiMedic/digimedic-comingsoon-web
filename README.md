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

## Styly a design

- Vlastní barevná paleta (blumine, astral, fountain-blue, powder-blue, polar)
- Vlastní fonty (Space Mono, Raleway)
- Vlastní animace a interaktivní prvky
- Responzivní design s využitím Tailwind CSS
- Vlastní ikony a SVG ilustrace

## Struktura projektu

- `app/`: Hlavní aplikační složka s Next.js 14 app router strukturou
- `components/`: Opakovaně použitelné React komponenty
- `config/`: Konfigurační soubory projektu
- `hooks/`: Vlastní React hooks
- `lib/`: Utility a pomocné funkce
- `public/`: Statické soubory (obrázky, fonty)
- `styles/`: Globální CSS styly
- `types/`: TypeScript definice typů

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

## Roadmapa

### Fáze 1: Dokončení základní funkcionality (2-3 týdny)
- Implementace funkčního formuláře pro sběr emailů
- Optimalizace animací a interaktivních prvků
- Zajištění responzivity pro všechny komponenty

### Fáze 2: Rozšíření obsahu (3-4 týdny)
- Vytvoření základních stránek (O nás, Služby, Kontakt)
- Implementace blog sekce s několika úvodními články
- Integrace MDX pro dynamický obsah

### Fáze 3: Vylepšení UX/UI (2-3 týdny)
- Implementace tmavého režimu pomocí next-themes
- Vylepšení accessibility
- Přidání dalších interaktivních prvků a mikroanimací

### Fáze 4: Optimalizace výkonu (1-2 týdny)
- Optimalizace načítání fontů a obrázků
- Implementace lazy loadingu pro komponenty
- Analýza a vylepšení Core Web Vitals

### Fáze 5: Integrace backend funkcionalit (3-4 týdny)
- Implementace API pro správu newsletteru
- Vytvoření admin rozhraní pro správu obsahu
- Integrace CMS (např. Strapi nebo Contentful) pro snadnou správu obsahu

### Fáze 6: Testování a dokumentace (2-3 týdny)
- Implementace unit testů pro klíčové komponenty
- Vytvoření end-to-end testů pomocí Cypress nebo Playwright
- Sepsání dokumentace pro vývojáře a uživatele admin rozhraní

### Fáze 7: Příprava pro produkci a launch (1-2 týdny)
- Finální kontrola SEO
- Nastavení monitoringu a analytics
- Příprava marketingových materiálů pro launch

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
