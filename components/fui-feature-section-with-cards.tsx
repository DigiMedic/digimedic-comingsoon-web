'use client'

import React, { useState } from 'react';

// Definice barevných SVG ikon jako komponenty
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CodeXmlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4"/>
    <path d="m6 8-4 4 4 4"/>
    <path d="m14.5 4-5 16"/>
  </svg>
);

const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ExpandMoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const missionVisionList = [
  {
    title: "Naše Vize",
    content: "Vytvořit zdravotnictví, kde technologie skutečně ulehčují práci zdravotníkům a zlepšují péči o pacienty. Chceme:<ul><li>Propojit všechny účastníky zdravotní péče</li><li>Zefektivnit procesy</li><li>Významně zlepšit kvalitu a dostupnost péče pro každého občana</li></ul>",
    icon: <LightbulbIcon />,
  },
  {
    title: "Náš Přístup",
    content: "<p>Nasloucháme potřebám lékařů a pacientů a společně s nimi vytváříme digitální řešení, která mají reálný pozitivní dopad.</p><p><strong>Klíčové principy:</strong></p><ul><li>Implementace 'Privacy by Design'</li><li>Využití nejmodernějších technologií</li><li>Ochrana citlivých zdravotních dat</li></ul>",
    icon: <ShieldIcon />,
  },
  {
    title: "Klíčové Projekty",
    content: "DigiMedic stojí v čele digitální transformace českého zdravotnictví. Naše klíčové projekty zahrnují:",
    icon: <CodeXmlIcon />,
    projects: [
      {
        name: "DigiMedic FHIR Backend",
        description: "Robustní digitální páteř pro interoperabilní výměnu zdravotních dat.",
        details: "Tento projekt implementuje FHIR standardy pro zajištění bezproblémové komunikace mezi různými systémy zdravotní péče. Umožňuje bezpečné sdílení dat mezi poskytovateli zdravotní péče, laboratořemi a pacienty, čímž významně zlepšuje koordinaci péče a efektivitu zdravotnického systému."
      },
      {
        name: "DigiMedic EHR",
        description: "Pokročilý systém elektronických zdravotních záznamů pro komplexní správu ordinací.",
        details: "Náš EHR systém je navržen s důrazem na uživatelskou přívětivost a efektivitu. Nabízí intuitivní rozhraní pro lékaře, automatizované workflow pro běžné úkoly, integrované nástroje pro telemedicínu a pokročilé analytické funkce pro podporu rozhodování. DigiMedic EHR pomáhá lékařům trávit méně času administrativou a více času péčí o pacienty."
      }
    ]
  },
  {
    title: "Podpora Zdravotníků",
    content: "Vyvíjíme řešení, která:<ul><li>Snižují administrativní zátěž</li><li>Poskytují rychlý přístup k důležitým zdravotním datům pacientů</li><li>Nabízejí pokročilé diagnostické nástroje</li><li>Umožňují bezpečnou a efektivní telemedicínu</li></ul>",
    icon: <StethoscopeIcon />,
  },
  {
    title: "Budoucnost Zdravotnictví",
    content: "Usilujeme o zdravotnictví, kde:<ul><li>Každý má přístup k personalizované a preventivní péči</li><li>Data pomáhají včas předcházet nemocem</li><li>Špičková zdravotní péče je dostupná všem bez ohledu na to, kde žijí</li></ul>",
    icon: <RocketIcon />,
  },
];

export default function MissionVisionSection() {
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProjectDetails = (projectName) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectName]: !prev[projectName]
    }));
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 space-y-10">
            <div>
              <h2 className="text-4xl font-space font-bold text-blumine mb-6">
                Naše Poslání a Vize
              </h2>
              <p className="text-xl text-gray-600 font-raleway mb-8">
                Budujeme digitální budoucnost zdravotnictví
              </p>
              <div className="h-px bg-blumine/10 my-8" />
              <p className="text-gray-700 font-raleway">
                V DigiMedic věříme, že technologie mají potenciál revolucionizovat zdravotnictví. Naším posláním je vytvářet inovativní digitální řešení, která zlepšují kvalitu péče, usnadňují práci zdravotníkům a přinášejí pozitivní změny do života pacientů.
              </p>
            </div>
            
            <div className="bg-blumine/5 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-space font-bold text-blumine mb-4">
                Připraveni na digitální transformaci?
              </h3>
              <p className="text-gray-700 font-raleway mb-4">
                Nabízíme osobní přístup a nezávislé poradenství. Kontaktujte nás pro bezplatnou konzultaci a objevte, jak můžeme společně zlepšit vaši praxi.
              </p>
              <p className="text-gray-700 font-raleway mb-4">
                DigiMedic stojí v čele digitální revoluce ve zdravotnictví. Naším cílem je efektivně využít nejnovější technologie pro zlepšení kvality a dostupnosti zdravotní péče v České republice.
              </p>
              <p className="text-gray-700 font-raleway mb-4">
                Nabízíme:
              </p>
              <ul className="list-disc list-inside text-gray-700 font-raleway mb-6 space-y-2">
                <li>Osobní přístup a nezávislé poradenství</li>
                <li>Podporu při navigaci v rychle se měnícím digitálním světě</li>
                <li>Řadu projektů a iniciativ zaměřených na modernizaci zdravotnictví</li>
              </ul>
              <p className="text-gray-700 font-raleway mb-4">
                S DigiMedic získáte partnera, který rozumí jedinečným výzvám zdravotnictví a má zkušenosti s jejich řešením pomocí moderních technologií. Naší nejvyšší prioritou je zlepšení zdravotní péče - pro vás i vaše pacienty.
              </p>
              <p className="text-gray-700 font-raleway mb-6">
                Připojte se k nám a buďte součástí budoucnosti zdravotnictví. Společně můžeme vytvořit zdravotní péči, která je efektivnější, dostupnější a zaměřená na pacienta.
              </p>
              <button className="inline-block bg-blumine text-white font-bold py-3 px-6 rounded-lg hover:bg-blumine/90 transition-colors duration-300">
                Získejte bezplatnou konzultaci
              </button>
            </div>
          </div>
          
          <div className="space-y-10">
            {missionVisionList.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:bg-blumine/5">
                <div className="flex items-center mb-6">
                  <span className="flex-shrink-0 inline-flex justify-center items-center w-16 h-16 rounded-full bg-white shadow-md mr-6">
                    {item.icon}
                  </span>
                  <h3 className="text-2xl font-space font-bold text-blumine">
                    {item.title}
                  </h3>
                </div>
                <div className="text-gray-600 font-raleway text-lg space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  {item.projects && (
                    <ul className="list-none space-y-4">
                      {item.projects.map((project, projectIdx) => (
                        <li key={projectIdx} className="border-t pt-4">
                          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleProjectDetails(project.name)}>
                            <h4 className="text-xl font-semibold text-blumine">{project.name}</h4>
                            <ExpandMoreIcon className={`transform transition-transform ${expandedProjects[project.name] ? 'rotate-180' : ''}`} />
                          </div>
                          <p className="mt-2">{project.description}</p>
                          {expandedProjects[project.name] && (
                            <p className="mt-4 text-gray-700">{project.details}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}