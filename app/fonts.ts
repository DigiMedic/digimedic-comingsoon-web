import { Space_Mono, Raleway, Open_Sans } from 'next/font/google'

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})