"use client"
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { GlobeIcon, CalendarIcon, UserIcon, FileTextIcon, MessageSquareIcon, VideoIcon, BarChartIcon, ClipboardListIcon, ActivityIcon, SmartphoneIcon, BrainIcon, UserPlusIcon, PhoneCallIcon, ZapIcon, TrendingUpIcon, ShieldIcon, LineChartIcon, BellIcon, ClipboardCheckIcon, CodeIcon, PuzzleIcon, DatabaseIcon, BookOpenIcon, ServerIcon, NetworkIcon } from "lucide-react"

const labels = [
  { icon: GlobeIcon, text: "Webové stránky pro lékaře" },
  { icon: CalendarIcon, text: "Online rezervace" },
  { icon: UserIcon, text: "Portál pacienta" },
  { icon: FileTextIcon, text: "Elektronická dokumentace" },
  { icon: ActivityIcon, text: "Sledování zdravotního stavu" },
  { icon: MessageSquareIcon, text: "Bezpečná komunikace" },
  { icon: VideoIcon, text: "Telemedicína" },
  { icon: BarChartIcon, text: "Efektivní správa ordinace" },
  { icon: ClipboardListIcon, text: "Automatizace administrativy" },
  { icon: SmartphoneIcon, text: "Mobilní aplikace" },
  { icon: BrainIcon, text: "Umělá inteligence v diagnostice" },
  { icon: UserPlusIcon, text: "Personalizovaná péče" },
  { icon: PhoneCallIcon, text: "Vzdálená konzultace" },
  { icon: ZapIcon, text: "Rychlý přístup k výsledkům" },
  { icon: TrendingUpIcon, text: "Interaktivní zdravotní plány" },
  { icon: ShieldIcon, text: "Bezpečné sdílení dat" },
  { icon: LineChartIcon, text: "Analýza zdravotních trendů" },
  { icon: BellIcon, text: "Automatické připomínky" },
  { icon: ClipboardCheckIcon, text: "Compliance management" },
  { icon: CodeIcon, text: "Vývoj na zakázku" },
  { icon: PuzzleIcon, text: "Integrace systémů" },
  { icon: DatabaseIcon, text: "Vývoj IS pro zdravotnictví" },
  { icon: BookOpenIcon, text: "Odborné konzultace" },
  { icon: ServerIcon, text: "Implementace FHIR" },
  { icon: NetworkIcon, text: "Podpora HL7 standardů" },
  { icon: GlobeIcon, text: "Připravenost na EHDS" },
  { icon: ShieldIcon, text: "Soulad s GDPR" },
  { icon: FileTextIcon, text: "Podpora eReceptů" },
  { icon: UserIcon, text: "Napojení na ISIN" },
  { icon: DatabaseIcon, text: "Integrace s NZIS" }
];

const firstRow = labels.slice(0, labels.length / 2);
const secondRow = labels.slice(labels.length / 2);

const LabelCard = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-md mx-2 shadow-sm hover:shadow-md transition-shadow duration-200">
      <Icon className="w-4 h-4 text-blumine" />
      <p className="text-xs font-medium text-gray-700 whitespace-nowrap">{text}</p>
    </div>
  );
};

export function AnimatedLabels() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:90s] mb-2">
        {firstRow.map((label, index) => (
          <LabelCard key={index} {...label} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:90s]">
        {secondRow.map((label, index) => (
          <LabelCard key={index} {...label} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white"></div>
    </div>
  );
}

export default AnimatedLabels;