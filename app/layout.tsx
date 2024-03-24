
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '../components/navbar';
import { manrope } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Inquire',
  description: 'A platform to create and share forms, quizzes and polls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
