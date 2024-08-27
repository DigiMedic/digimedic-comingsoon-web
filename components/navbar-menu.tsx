import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  setActive?: React.Dispatch<React.SetStateAction<string | null>>;
  active?: string | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, children, setActive, active }) => {
  return (
    <Link href={href} passHref>
      <div
        onMouseEnter={() => setActive && setActive(children as string)}
        onMouseLeave={() => setActive && setActive(null)}
        className="relative cursor-pointer px-4 py-2"
      >
        <motion.p
          transition={{ duration: 0.3 }}
          className={`text-base font-medium ${
            active === children ? 'text-fountain-blue' : 'text-blumine'
          } hover:text-fountain-blue transition-colors`}
        >
          {children}
        </motion.p>
        {active === children && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-fountain-blue rounded-full"
            initial={{ opacity: 0, width: '0%' }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: '0%' }}
            transition={transition}
          />
        )}
      </div>
    </Link>
  );
};

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string | null>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const updateNavigation = () => {
      const scrollY = window.pageYOffset;

      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(true);
      } else if (scrollY < lastScrollY || scrollY <= 100) {
        // Scrolling up or at the top
        setIsVisible(false);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: -100, opacity: 0 });
    }
  }, [isVisible, controls]);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-2"
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.8,
        duration: 0.5
      }}
    >
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative bg-white shadow-md flex justify-center space-x-2 px-6 py-2 rounded-full border border-fountain-blue/10"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<MenuItemProps>(child)) {
            return React.cloneElement(child, {
              setActive,
              active,
              href: child.props.href || '/'
            });
          }
          return child;
        })}
      </nav>
    </motion.div>
  );
};

export const DigiMedicNavigation = () => {
  return (
    <Menu>
      <MenuItem href="/">Domů</MenuItem>
      <MenuItem href="/blog">Blog</MenuItem>
    </Menu>
  );
};

export { MenuItem };