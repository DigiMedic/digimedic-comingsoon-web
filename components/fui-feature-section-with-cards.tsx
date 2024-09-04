import {
    HeartIcon,
    ShieldCheckIcon,
    ProjectorIcon,
    UsersIcon,
    CalendarIcon,
  } from "lucide-react";
  
  export default function IconSectionDescriptionOnLeftIconBlocksOnRight() {
    const missionVisionList = [
      {
        title: "Naše Vize",
        content: "Vytvořit zdravotnictví, kde technologie skutečně ulehčují práci zdravotníkům a zlepšují péči o pacienty. Chceme propojit všechny účastníky zdravotní péče, zefektivnit procesy a významně zlepšit kvalitu a dostupnost péče pro každého občana.",
        icon: <HeartIcon className="w-9 h-9" />,
      },
      {
        title: "Náš Přístup",
        content: "Nasloucháme potřebám lékařů a pacientů a společně s nimi vytváříme digitální řešení, která mají reálný pozitivní dopad. Implementujeme princip 'Privacy by Design' a využíváme nejmodernější technologie pro ochranu citlivých zdravotních dat.",
        icon: <ShieldCheckIcon className="w-9 h-9" />,
      },
      {
        title: "Klíčové Projekty",
        content: "DigiMedic stojí v čele digitální transformace českého zdravotnictví. Naše klíčové projekty zahrnují: 1) DigiMedic FHIR Backend - robustní digitální páteř pro interoperabilní výměnu zdravotních dat. 2) DigiMedic EHR - pokročilý systém elektronických zdravotních záznamů pro komplexní správu ordinací. 3) Projekt DoktorNaDohled - inovativní platforma sloužící jako spolehlivý průvodce pacienta zdravotním systémem. Tyto projekty společně tvoří ucelený ekosystém, který transformuje poskytování zdravotní péče v České republice.",
        icon: <ProjectorIcon className="w-9 h-9" />,
      },
      {
        title: "Podpora Zdravotníků",
        content: "Vyvíjíme řešení, která snižují administrativní zátěž, poskytují rychlý přístup k důležitým zdravotním datům pacientů, nabízejí pokročilé diagnostické nástroje a umožňují bezpečnou a efektivní telemedicínu.",
        icon: <UsersIcon className="w-9 h-9" />,
      },
      {
        title: "Budoucnost Zdravotnictví",
        content: "Usilujeme o zdravotnictví, kde každý má přístup k personalizované a preventivní péči, data pomáhají včas předcházet nemocem, a špičková zdravotní péče je dostupná všem bez ohledu na to, kde žijí.",
        icon: <CalendarIcon className="w-9 h-9" />,
      },
    ];
  
    return (
      <div className="container py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-space font-bold tracking-tight transition-colors first:mt-0">
              Naše Poslání a Vize
            </h2>
            <p className="mt-3 text-muted-foreground font-raleway">
              Budujeme digitální budoucnost zdravotnictví
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {missionVisionList.map((item, idx) => (
              <div className="flex" key={idx}>
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[70px] h-[70px] rounded-full border bg-primary text-primary-foreground">
                  {item.icon}
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-space font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground font-raleway">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    );
  }