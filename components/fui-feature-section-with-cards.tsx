"use client"

import React, { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface FaqItem {
  q: string;
  a: string;
}

interface FaqsCardProps {
  faqsList: FaqItem;
  idx: number;
  isOpen: boolean;
  toggleAnswer: (idx: number) => void;
}

const FaqsCard: React.FC<FaqsCardProps> = React.memo(({ faqsList, idx, isOpen, toggleAnswer }) => {
    const answerElRef = useRef<HTMLDivElement>(null)

    const handleToggle = useCallback(() => {
        toggleAnswer(idx)
    }, [idx, toggleAnswer])

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-lg border border-fountain-blue/30 bg-white transition-all hover:bg-polar/50",
                "hover:shadow-lg duration-300 ease-in-out",
                isOpen && "bg-polar/50"
            )}
        >
            <button
                className="w-full text-left p-6"
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
            >
                <h4 className="flex items-center justify-between text-lg text-blumine font-medium font-space">
                    {faqsList.q}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                            "h-5 w-5 text-fountain-blue ml-2 transition-transform duration-300",
                            isOpen ? "transform rotate-180" : ""
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </h4>
            </button>
            <div
                ref={answerElRef}
                id={`faq-answer-${idx}`}
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <p className="px-6 pb-6 text-astral font-raleway">{faqsList.a}</p>
            </div>
        </div>
    )
})

FaqsCard.displayName = 'FaqsCard'

export default function FAQComponent() {
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

    const toggleAnswer = useCallback((idx: number) => {
        setOpenIndices(prev => {
            const newSet = new Set(prev)
            if (newSet.has(idx)) {
                newSet.delete(idx)
            } else {
                newSet.add(idx)
            }
            return newSet
        })
    }, [])

    const faqsList = [
        {
            q: "Jaká je vize a mise DigiMedic?",
            a: "V DigiMedic chápeme každodenní výzvy, kterým čelí lékaři a pacienti. Naší vizí je vytvořit zdravotnictví, kde technologie skutečně ulehčují práci zdravotníkům a zlepšují péči o pacienty. Nasloucháme potřebám lékařů a pacientů a společně s nimi vytváříme digitální řešení, která mají reálný pozitivní dopad. Chceme propojit všechny účastníky zdravotní péče, zefektivnit procesy a významně zlepšit kvalitu a dostupnost péče pro každého občana."
        },
        {
            q: "Jak DigiMedic přispívá k zlidštění zdravotnictví pomocí technologií?",
            a: "Víme, že práce ve zdravotnictví je především o lidech a mezilidských vztazích. Proto navrhujeme naše řešení tak, aby lékařům uvolnila ruce od zbytečné administrativy a umožnila jim věnovat více času tomu nejdůležitějšímu - pacientům. Zároveň dáváme pacientům do rukou srozumitelné nástroje, které jim pomohou lépe porozumět jejich zdraví a aktivně se podílet na léčbě. Naším cílem je vytvářet prostředí, kde se každý pacient cítí vyslyšen a respektován, a kde lékaři mohou pracovat s radostí a naplněním."
        },
        {
            q: "Co je projekt DoktorNaDohled a jak pomáhá pacientům?",
            a: "DoktorNaDohled vznikl z našich rozhovorů s pacienty, kteří se často cítili ztraceni v systému zdravotní péče. Je to náš způsob, jak pacientům nabídnout spolehlivého průvodce světem zdravotnictví. Tato platforma analyzuje individuální potřeby každého uživatele a poskytuje mu srozumitelná, na míru šitá doporučení. Nejde jen o vyhledávač - DoktorNaDohled je jako dobrý přítel, který vám pomůže porozumět vašim zdravotním potřebám a najít tu nejlepší možnou péči. Chceme, aby se každý pacient cítil podporován a informován, ať už je denní či noční hodina."
        },
        {
            q: "Jak DigiMedic podporuje lékaře a zdravotnická zařízení v jejich práci?",
            a: "Jako tým DigiMedic jsme strávili nespočet hodin rozhovory s lékaři, abychom skutečně pochopili jejich každodenní výzvy. Na základě jejich zpětné vazby jsme vyvinuli řešení, která: 1) Výrazně snižují administrativní zátěž pomocí chytré automatizace. 2) Poskytují rychlý přístup k důležitým zdravotním datům pacientů pro informovanější rozhodování. 3) Nabízejí pokročilé diagnostické nástroje pro přesnější a rychlejší diagnózy. 4) Umožňují bezpečnou a efektivní telemedicínu. 5) Poskytují analytické nástroje pro lepší péči o jednotlivce i celé populace. Naším cílem je, aby se lékaři mohli opět plně soustředit na to, co je jejich posláním - péči o pacienty."
        },
        {
            q: "Jaký je přístup DigiMedic k ochraně soukromí a bezpečnosti dat pacientů?",
            a: "V DigiMedic si plně uvědomujeme, jak citlivá a důležitá jsou zdravotní data. Ochrana soukromí a bezpečnost dat jsou pro nás absolutní prioritou. Jdeme nad rámec běžných regulací a do každého aspektu našich řešení implementujeme princip 'Privacy by Design'. Využíváme nejmodernější šifrovací technologie a přísné protokoly pro přístup k datům. Pravidelně provádíme etické audity našich systémů a úzce spolupracujeme s odborníky na kybernetickou bezpečnost. Věříme, že důvěra je základem kvalitní zdravotní péče, a děláme vše pro to, abychom si důvěru pacientů i zdravotníků zasloužili a udrželi."
        },
        {
            q: "Jaká je vize DigiMedic pro budoucnost zdravotnictví?",
            a: "Naše vize budoucnosti zdravotnictví vychází z našich rozhovorů s lékaři, pacienty a zdravotnickými odborníky. Představujeme si zdravotnictví, kde: 1) Každý má přístup k personalizované a preventivní péči. 2) Péče je plynule integrována napříč všemi poskytovateli a zařízeními. 3) Pacienti jsou aktivně zapojeni do péče o své zdraví pomocí intuitivních nástrojů. 4) Data pomáhají včas předcházet nemocem a zpřesňují diagnostiku. 5) Špičková zdravotní péče je dostupná všem bez ohledu na to, kde žijí. 6) Zdravotní systém je udržitelný a efektivní, připravený čelit výzvám budoucnosti. Věříme, že spolu s lékaři, pacienty a celou zdravotnickou komunitou můžeme vytvořit zdravotnictví, které bude skutečně sloužit potřebám všech."
        },
        {
            q: "Jak DigiMedic přispívá k řešení aktuálních výzev ve zdravotnictví?",
            a: "V DigiMedic jsme v neustálém kontaktu s zdravotnickou komunitou a společně hledáme řešení aktuálních problémů: 1) Pomáháme efektivněji využívat čas zdravotnického personálu automatizací rutinních úkolů. 2) Snižujeme čekací doby optimalizací procesů a efektivním plánováním. 3) Zlepšujeme dostupnost specializované péče v odlehlých oblastech pomocí telemedicíny. 4) Podporujeme prevenci a včasnou diagnostiku personalizovanými zdravotními doporučeními. 5) Přispíváme k finanční udržitelnosti zdravotnictví zvyšováním efektivity. 6) Usilujeme o snížení zdravotních nerovností zajištěním rovného přístupu k digitálním zdravotním službám. Naším cílem je být skutečným partnerem pro zdravotnickou komunitu v řešení těchto výzev."
        },
        {
            q: "Jak se mohou organizace a jednotlivci zapojit do mise DigiMedic?",
            a: "V DigiMedic věříme, že jen společným úsilím můžeme dosáhnout skutečné změny. Proto vítáme zapojení všech, kteří sdílejí naši vizi: 1) Zdravotnická zařízení se mohou stát našimi partnery v digitální transformaci a společně s námi vytvářet řešení šitá na míru jejich potřebám. 2) Výzkumné instituce mohou s námi spolupracovat na vývoji nových technologií, které posunou zdravotnictví kupředu. 3) Pacienti jsou pro nás neocenitelným zdrojem zpětné vazby a mohou se zapojit do testování našich řešení. 4) Zdravotničtí profesionálové mohou sdílet své zkušenosti a nápady, které jsou klíčové pro vylepšování našich produktů. 5) Technologičtí nadšenci se mohou připojit k našemu týmu a podílet se na vývoji inovativních řešení. 6) Každý může přispět šířením povědomí o důležitosti digitalizace ve zdravotnictví. Společně můžeme vytvořit zdravotnictví budoucnosti, které bude sloužit nám všem."
        }
    ]

    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8 py-16 bg-polar">
            <div className="space-y-3 text-center mb-10">
                <h1 className="text-3xl text-blumine font-bold font-space animate-fadeIn">
                    Cíle a očekávání DigiMedic
                </h1>
                <p className="text-astral max-w-lg mx-auto text-lg font-raleway animate-fadeIn">
                    Objevte, jak DigiMedic transformuje zdravotnictví a co můžete od našich řešení očekávat.
                </p>
            </div>
            <div className="grid gap-4 max-w-2xl mx-auto">
                {faqsList.map((item, idx) => (
                    <FaqsCard
                        key={idx}
                        idx={idx}
                        faqsList={item}
                        isOpen={openIndices.has(idx)}
                        toggleAnswer={toggleAnswer}
                    />
                ))}
            </div>
        </section>
    )
}