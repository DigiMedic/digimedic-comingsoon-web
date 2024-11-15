'use client';
import { useEffect, useRef } from 'react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Stethoscope, Laptop, Brain } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  Icon: any;
  color: string;
  textColor?: string;  // Přidaný volitelný textový kontrast
}

const projects: Project[] = [
  {
    title: 'Digitální transformace',
    description: 'Pomáháme zdravotnickým zařízením rychle a efektivně zavádět digitální technologie, které zjednodušují správu a zlepšují kvalitu péče. Společně modernizujeme systémy, které zajišťují lepší péči pro pacienty a efektivitu pro zdravotníky.',
    Icon: Laptop,
    color: '#1B4D6A',  // Tmavě modrá (hlavní barva)
    textColor: '#FFFFFF',
  },
  {
    title: 'Efektivní řešení',
    description: 'Vytváříme přizpůsobená digitální řešení, která usnadňují každodenní práci zdravotnickým profesionálům. Naším cílem je zjednodušit procesy a zvýšit produktivitu, abyste se mohli soustředit na to nejdůležitější: péči o pacienty.',
    Icon: Stethoscope,
    color: '#5B8A9A',  // Středně modrá (sekundární prvky)
    textColor: '#FFFFFF',
  },
  {
    title: 'Inovace ve zdravotnictví',
    description: 'Přinášíme inovace, které mění způsob, jakým pracujeme a pečujeme o pacienty. Ať už jde o nové technologie, nástroje nebo procesy, náš tým je tu, aby pomohl českému zdravotnictví být efektivnější a lépe připravené na výzvy budoucnosti.',
    Icon: Brain,
    color: '#5BA2C2',  // Světle modrá (doplňkové prvky)
    textColor: '#FFFFFF',  // Změněno na bílou pro konzistenci
  },
  {
    title: 'Připojte se k Digitální Revoluci ve Zdravotnictví',
    description: 'Chcete být součástí revoluce, která změní budoucnost zdravotní péče? Ať už jste zdravotnické zařízení, technologický startup nebo investor, připojte se k nám a staňte se partnerem v našem projektu, který usnadňuje život pacientům a zdravotníkům.',
    Icon: Laptop,
    color: '#1B4D6A',  // Změna na tmavší barvu pro lepší kontrast
    textColor: '#FFFFFF',
  }
];

export default function MissionVisionSection(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-transparent" ref={container}>
      {/* Úvodní sekce */}
      <section className="text-blumine h-[70vh] w-full bg-transparent grid place-content-center relative">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]"></div>
        <h1 className="2xl:text-7xl text-5xl px-8 font-space-bold text-center tracking-tight leading-[120%]">
          Posunujeme zdravotní péči do nové éry 🚀
        </h1>
        <p className="text-xl text-center text-white mt-4">
          Společně vytváříme moderní zdravotnické technologie, které zlepšují péči o pacienty a efektivitu pro zdravotníky. Inovace, které mění způsob, jak pracujeme, léčíme a pečujeme.
        </p>
      </section>

      {/* Sekce s kartami */}
      <section className="text-blumine w-full bg-transparent">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`project_${i}`}
              i={i}
              title={project.title}
              description={project.description}
              Icon={project.Icon}
              color={project.color}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </main>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  Icon,
  color,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          background: color,
          color: '#FFFFFF',
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-xl p-10 origin-top
          backdrop-blur-md shadow-2xl
          border border-white/10
          hover:shadow-fountain-blue/20 hover:scale-[1.02]
          transition-all duration-500
          bg-grid-pattern bg-[54px_54px]`}
      >
        <h2 className='text-3xl text-center font-bold mb-6 font-space-bold text-white'>{title}</h2>
        <div className='flex h-full gap-10'>
          <div className='w-[40%] relative top-[10%]'>
            <p className='text-lg font-raleway leading-relaxed text-white/90'>{description}</p>
            <motion.div
              className="mt-6 h-1 bg-white/30 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className='relative w-[60%] h-full flex items-center justify-center'>
            <Icon className="w-full h-full max-w-[200px] text-white opacity-80" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
