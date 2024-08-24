import { Dock, DockIcon } from "@/components/magicui/dock";
import React from "react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export type SocialLink = {
  name: string;
  url: string;
  icon: (props: IconProps) => JSX.Element;
};

const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8.339 18.338H5.667V9h2.672v9.338zM7.004 7.667a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zM18.338 18.338h-2.672v-4.667c0-1.112-.021-2.542-1.548-2.542-1.549 0-1.785 1.211-1.785 2.463v4.746h-2.672V9h2.568v1.271h.036c.358-.678 1.232-1.548 2.534-1.548 2.71 0 3.213 1.785 3.213 4.106v5.509z"
      />
    </svg>
  ),
  facebook: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.995 4.388 10.982 10.125 11.85v-8.385H7.078V12.07h3.047V9.412c0-3.017 1.794-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.873v2.235h3.328l-.532 3.463h-2.796v8.385C19.612 23.055 24 18.068 24 12.073z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  ),
  rss: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z"
      />
    </svg>
  ),
};

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/digimedi-cz/?viewAsMember=true",
    icon: Icons.linkedin
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61556880800899",
    icon: Icons.facebook
  },
  {
    name: "GitHub",
    url: "https://github.com/DigiMedic",
    icon: Icons.github
  },
  {
    name: "RSS",
    url: "#", // Prozatímní odkaz, který později aktualizujeme
    icon: Icons.rss
  }
];

export default function DockLive() {
  return (
    <div className="w-full max-w-[40rem] mx-auto py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blumine mb-2 text-center font-space">Zůstaňte v obraze</h2>
      <p className="text-astral text-center mb-4 font-raleway">Sledujte naše aktivity a čtěte nejnovější články</p>
      <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blumine focus:ring-offset-2 focus:ring-offset-white">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E7F5F8_0%,#1B4D6A_50%,#E7F5F8_100%)]" />
        <Dock className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-blumine">
          {socialLinks.map((link) => (
            <DockIcon key={link.name} className="text-blumine hover:text-fountain-blue transition-colors mx-2">
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-6 w-6" />
              </a>
            </DockIcon>
          ))}
        </Dock>
      </div>
    </div>
  );
}