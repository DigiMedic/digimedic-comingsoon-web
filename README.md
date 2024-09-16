# DigiMedic-comingsoon-web

Vítejte v repozitáři projektu DigiMedic-comingsoon-web, digitální páteře českého zdravotnictví.

## O projektu

DigiMedic je webová prezentace zaměřená na digitalizaci a inovaci v českém zdravotnictví. Náš cíl je vytvořit efektivnější a dostupnější zdravotní péči prostřednictvím moderních technologií. Projekt je momentálně ve fázi "coming soon" a zaměřuje se na sběr emailů pro budoucí komunikaci, prezentaci informací prostřednictvím blogu a správu uživatelských účtů.

## Architektura projektu

Projekt je postaven na moderní architektuře využívající následující klíčové technologie a přístupy:

1. **Framework**: Next.js 14 - využívá App Router a Server Components pro optimální výkon a SEO.
2. **Jazyk**: JavaScript a TypeScript - zajišťuje typovou bezpečnost a lepší vývojářskou zkušenost.
3. **UI knihovna**: React 18 - umožňuje vytváření interaktivních uživatelských rozhraní.
4. **Styling**: Tailwind CSS - pro rychlý vývoj responzivního designu.
5. **Autentizace**: Appwrite - poskytuje bezpečnou a škálovatelnou správu uživatelů a autentizaci.
6. **State management**: React Hooks - pro efektivní správu lokálního stavu komponent.
7. **Formuláře**: react-hook-form - usnadňuje práci s formuláři a jejich validaci.
8. **API integrace**: axios - pro snadnou komunikaci s back-end službami.
9. **Animace**: Framer Motion - pro plynulé a atraktivní animace UI.
10. **Zpracování obsahu**: MDX, remark - umožňuje psaní dynamického obsahu s podporou React komponent.
11. **SEO**: react-schemaorg, schema-dts - pro implementaci strukturovaných dat a zlepšení SEO.
12. **Optimalizace obrázků**: sharp - pro efektivní zpracování a optimalizaci obrázků.
13. **Správa témat**: next-themes - pro implementaci tmavého režimu a dalších barevných schémat.

## Struktura projektu

```
.
├── app/
│   ├── appwrite.js         # Konfigurace a inicializace Appwrite klienta
│   ├── page.js             # Hlavní stránka s funkcionalitou přihlášení/registrace
│   ├── layout.tsx          # Hlavní layout aplikace
│   ├── ClientLayout.tsx    # Client-side layout wrapper
│   ├── formbricks.tsx      # Integrace Formbricks pro analýzu uživatelského chování
│   └── blog/               # Blog sekce
│       ├── page.tsx        # Hlavní stránka blogu
│       ├── layout.tsx      # Layout pro blog sekci
│       └── posts/          # Jednotlivé blogové příspěvky
├── components/             # Znovupoužitelné React komponenty
├── lib/                    # Pomocné funkce a utility
├── public/                 # Statické soubory (obrázky, fonty)
├── styles/                 # Globální styly
└── types/                  # TypeScript definice typů
```

## Hlavní komponenty

- **LoginPage** (app/page.js): Implementuje funkcionalitu pro přihlášení, registraci a odhlášení uživatelů pomocí Appwrite.
- **AppwriteClient** (app/appwrite.js): Konfiguruje a inicializuje Appwrite klienta pro autentizaci a správu uživatelů.
- **FormbricksProvider** (app/formbricks.tsx): Integruje Formbricks pro sledování uživatelského chování a sběr zpětné vazby.
- **Layout** (app/layout.tsx): Definuje hlavní layout aplikace včetně globálních stylů a metadat.
- **ClientLayout** (app/ClientLayout.tsx): Wrapper pro client-side funkcionalitu.
- **BlogPage** (app/blog/page.tsx): Zobrazuje seznam blogových příspěvků.
- **PostPage** (app/blog/posts/[...slug]/page.tsx): Zobrazuje jednotlivé blogové příspěvky.
- **NewsletterForm** (components/NewsletterForm.tsx): Formulář pro sběr emailů.
- **AnimatedCard**, **TextRevealByWord**, **DockLive**: Komponenty pro vizuální efekty a animace.

## Autentizace a správa uživatelů

Projekt využívá Appwrite pro správu uživatelských účtů a autentizaci:

- Registrace nových uživatelů
- Přihlášení pomocí emailu a hesla
- Odhlášení uživatelů
- Získávání informací o přihlášeném uživateli

## Konfigurace projektu

Projekt využívá několik konfiguračních souborů pro nastavení různých aspektů vývoje:

- `next.config.mjs`: Konfigurace Next.js
- `tailwind.config.js`: Konfigurace Tailwind CSS
- `tsconfig.json`: Konfigurace TypeScript
- `.eslintrc.json`: Konfigurace ESLint pro kontrolu kvality kódu
- `prettier.config.js`: Konfigurace Prettier pro formátování kódu

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

3. Nastavte proměnné prostředí:
   Vytvořte soubor `.env.local` v kořenovém adresáři projektu a nastavte potřebné proměnné prostředí, včetně Appwrite konfigurace:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   ```

4. Spusťte vývojový server:
   ```
   npm run dev
   ```

5. Otevřete prohlížeč a přejděte na `http://localhost:3000`

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
- JavaScript je použit pro některé soubory (např. app/page.js, app/appwrite.js)
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
