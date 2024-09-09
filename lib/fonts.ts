import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Raleway,
  Space_Mono,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontSpaceBoldRegular = Space_Mono({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-space-bold-regular",
})

export const fontSpaceBoldSemibold = Space_Mono({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-space-bold-semibold",
})

export const fontRalewayRegular = Raleway({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-raleway-regular",
})
