"use client"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { GlobeIcon, CalendarIcon, UserIcon, FileTextIcon, MessageSquareIcon, VideoIcon, BarChartIcon, ClipboardListIcon, ActivityIcon, SmartphoneIcon } from "lucide-react"
import Marquee from "react-fast-marquee";

const Hero = () => {
  const buttons = [
    { icon: GlobeIcon, text: "Webové stránky pro lékaře" },
    { icon: CalendarIcon, text: "Online rezervace" },
    { icon: UserIcon, text: "Portál pacienta" },
    { icon: FileTextIcon, text: "Elektronická dokumentace" },
    { icon: ActivityIcon, text: "Sledování zdravotního stavu" },
    { icon: MessageSquareIcon, text: "Bezpečná komunikace" },
    { icon: VideoIcon, text: "Telemedicína" },
    { icon: BarChartIcon, text: "Efektivní správa ordinace" },
    { icon: ClipboardListIcon, text: "Automatizace administrativy" },
    { icon: SmartphoneIcon, text: "Mobilní aplikace" }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blumine mb-4">
            Digitální páteř pro české zdravotnictví
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-astral font-raleway mb-6">
            Transformujeme zdravotnictví pomocí inovativních digitálních řešení. Připojte se k nám na cestě k efektivnější a dostupnější zdravotní péči.
          </p>
        </div>
        <div className="mt-7 sm:mt-12 w-full max-w-lg">
          <form className="relative z-10">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 p-3 border bg-background rounded-lg shadow-lg">
              <div className="flex-grow">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full"
                  placeholder="Váš email pro novinky"
                  required
                  aria-label="Vš email pro novinky"
                />
              </div>
              <div className="flex-shrink-0">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-blumine text-white border border-blumine hover:bg-white hover:text-blumine transition-colors duration-300"
                >
                  Zůstaňte informováni
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full overflow-x-auto py-2 mb-4">
        <Marquee className="flex items-center space-x-4" speed={30}>
          {buttons.map((button, index) => (
            <Button key={index} variant="outline" className="bg-white">
              <button.icon className="flex-shrink-0 w-3 h-auto mr-2" />{button.text}
            </Button>
          ))}
        </Marquee>
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}  
        cy={1}
        cr={1}
        className={cn(
          "absolute inset-0 h-full w-full [mask-image:radial-gradient(white,transparent_85%)]",
          "text-blumine/10"
        )}
      />
    </div>
  )
}

export default Hero